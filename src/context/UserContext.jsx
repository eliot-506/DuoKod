import { createContext, useContext, useState, useEffect } from 'react';
import { COURSES } from '../data/lessons';
import { supabase } from '../lib/supabase';

const UserContext = createContext();

const defaultUserStats = {
    isLoggedIn: false,
    supabaseId: null,
    username: '',
    email: '',
    streak: 0,
    xp: 0,
    hearts: 50,
    role: 'user',
    isAdmin: false,
    isSuperAdmin: false,
    isActive: true,
    lastPlayed: null,
    currentCourse: 'html',
    unlockedAvatars: ['default'],
    currentAvatar: 'default',
    unlockedBadges: [],
    skillMap: {
        python: { syntax: 0, variables: 0, logic: 0, loops: 0, functions: 0 },
        js: { syntax: 0, variables: 0, logic: 0, loops: 0, functions: 0 },
        html: { syntax: 0, tags: 0 },
        css: { syntax: 0, styling: 0 }
    },
    courses: {
        html: { completedNodes: [], unlockedNodes: [1] },
        css: { completedNodes: [], unlockedNodes: [1] },
        js: { completedNodes: [], unlockedNodes: [1] },
        python: { completedNodes: [], unlockedNodes: [1] }
    }
};

// Supabase ga profil ma'lumotlarini saqlash
const syncProfileToSupabase = async (userId, data) => {
    if (!userId) return;
    try {
        await supabase.from('profiles').upsert({
            id: userId,
            username: data.username,
            avatar: data.currentAvatar,
            xp: data.xp,
            level: Math.floor(data.xp / 100) + 1,
            streak: data.streak,
            hearts: data.hearts,
            badges: data.unlockedBadges,
            skill_map: data.skillMap
        }, { onConflict: 'id' });

        // Har bir kurs progressini saqlash
        for (const courseId of Object.keys(data.courses)) {
            await supabase.from('course_progress').upsert({
                user_id: userId,
                course_id: courseId,
                completed_nodes: data.courses[courseId].completedNodes,
                unlocked_nodes: data.courses[courseId].unlockedNodes,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,course_id' });
        }
    } catch (err) {
        console.warn('Supabase sync xatoligi:', err.message);
    }
};

// Supabase dan profil ma'lumotlarini o'qish
const loadProfileFromSupabase = async (userId) => {
    try {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
        const { data: courseData } = await supabase.from('course_progress').select('*').eq('user_id', userId);

        if (!profile) return null;

        const courses = { ...defaultUserStats.courses };
        if (courseData) {
            courseData.forEach(cp => {
                courses[cp.course_id] = {
                    completedNodes: cp.completed_nodes || [],
                    unlockedNodes: cp.unlocked_nodes || [1]
                };
            });
        }

        const role = profile.role || 'user';

        return {
            ...defaultUserStats,
            isLoggedIn: true,
            supabaseId: userId,
            username: profile.username || '',
            xp: profile.xp || 0,
            level: profile.level || 1,
            streak: profile.streak || 0,
            hearts: profile.hearts || 50,
            role: role,
            isAdmin: role === 'admin' || role === 'super_admin',
            isSuperAdmin: role === 'super_admin',
            isActive: profile.is_active !== false,
            currentAvatar: profile.avatar || 'default',
            unlockedBadges: profile.badges || [],
            skillMap: profile.skill_map || defaultUserStats.skillMap,
            courses
        };
    } catch (err) {
        console.warn('Supabase o\'qish xatoligi:', err.message);
        return null;
    }
};

export const UserProvider = ({ children }) => {
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('duokod_stats_v3');
        if (saved) {
            try {
                let parsed = JSON.parse(saved);
                if (parsed.hearts < 10) parsed.hearts = 50;
                if (!parsed.courses) parsed.courses = defaultUserStats.courses;
                if (!parsed.courses.python) parsed.courses.python = defaultUserStats.courses.python;
                if (!parsed.unlockedAvatars) parsed.unlockedAvatars = ['default'];
                if (!parsed.currentAvatar) parsed.currentAvatar = 'default';
                if (!parsed.unlockedBadges) parsed.unlockedBadges = [];
                return parsed;
            } catch (e) { return defaultUserStats; }
        }
        return defaultUserStats;
    });

    // LocalStorage ga saqlash
    useEffect(() => {
        localStorage.setItem('duokod_stats_v3', JSON.stringify(stats));
    }, [stats]);

    // Supabase Auth listener (Google OAuth yoki avtomatik login uchun)
    useEffect(() => {
        const handleSession = async (session) => {
            if (!session?.user) return;
            const cloudData = await loadProfileFromSupabase(session.user.id);
            if (cloudData) {
                setStats(prev => ({ ...prev, ...cloudData, email: session.user.email }));
            } else {
                const username = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
                setStats(prev => ({
                    ...prev,
                    isLoggedIn: true,
                    supabaseId: session.user.id,
                    username: username,
                    email: session.user.email || '',
                    lastPlayed: new Date().toISOString()
                }));
            }
        };

        // Dastlab qattiq tekshiramiz (OAuth redirect qaytganda onAuthStateChange kechikib ishlasa ham bu ushlab oladi)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) handleSession(session);
        });

        // Va qo'shimcha o'zgarishlarni eshitib turamiz
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                if (session) handleSession(session);
            } else if (event === 'SIGNED_OUT') {
                setStats({ ...defaultUserStats });
                localStorage.removeItem('duokod_stats_v3');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // XP yoki progress o'zgarganda Supabase ga sync qilish (debounced)
    useEffect(() => {
        if (!stats.supabaseId || !stats.isLoggedIn) return;
        const timer = setTimeout(() => {
            syncProfileToSupabase(stats.supabaseId, stats);
        }, 2000); // 2 soniya debounce
        return () => clearTimeout(timer);
    }, [stats.xp, stats.streak, stats.hearts, stats.unlockedBadges, stats.courses]);

    const loginUser = async (username, email, supabaseId = null) => {
        // Agar Supabase ID bo'lsa cloud dan o'qib olamiz
        if (supabaseId) {
            const cloudData = await loadProfileFromSupabase(supabaseId);
            if (cloudData) {
                setStats({ ...cloudData, email });
                return;
            }
        }
        // 0 dan boshlanadigan profil (yangi foydalanuvchi)
        setStats(prev => ({
            ...prev,
            isLoggedIn: true,
            supabaseId,
            username,
            email,
            lastPlayed: new Date().toISOString()
        }));
    };

    const logoutUser = async () => {
        await supabase.auth.signOut();
        setStats({ ...defaultUserStats });
        localStorage.removeItem('duokod_stats_v3');
    };

    const deleteAccount = async () => {
        if (stats.supabaseId) {
            try {
                // Delete user data from tables
                await supabase.from('course_progress').delete().eq('user_id', stats.supabaseId);
                await supabase.from('profiles').delete().eq('id', stats.supabaseId);
            } catch (err) {
                console.warn('Account deletion error:', err);
            }
        }
        await logoutUser();
    };

    const updateSkill = (courseId, skillName, points) => {
        if (!skillName) return;
        setStats(prev => {
            const currentMap = prev.skillMap || defaultUserStats.skillMap;
            const courseSkills = currentMap[courseId] || {};
            const currentVal = courseSkills[skillName] || 0;
            const newVal = Math.max(0, currentVal + points);
            return {
                ...prev,
                skillMap: {
                    ...currentMap,
                    [courseId]: {
                        ...courseSkills,
                        [skillName]: newVal
                    }
                }
            };
        });
    };

    const addXp = (amount) => setStats(prev => ({ ...prev, xp: prev.xp + amount }));
    const useHeart = () => setStats(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) }));
    const switchCourse = (courseId) => setStats(prev => ({ ...prev, currentCourse: courseId }));

    const changeAvatar = (avatarId) => {
        setStats(prev => {
            if (prev.unlockedAvatars.includes(avatarId)) return { ...prev, currentAvatar: avatarId };
            return prev;
        });
    };

    const unlockAvatar = (avatarId) => {
        setStats(prev => {
            if (!prev.unlockedAvatars.includes(avatarId)) return { ...prev, unlockedAvatars: [...prev.unlockedAvatars, avatarId] };
            return prev;
        });
    };

    const completeNode = (nodeId, nextNodeId) => {
        setStats(prev => {
            const newStats = { ...prev };
            const courseId = newStats.currentCourse;
            const courseData = { ...newStats.courses[courseId] };

            if (!courseData.completedNodes.includes(nodeId)) courseData.completedNodes.push(nodeId);
            if (nextNodeId && !courseData.unlockedNodes.includes(nextNodeId)) courseData.unlockedNodes.push(nextNodeId);

            const totalCourseNodes = COURSES[courseId].data.length;
            if (courseData.completedNodes.length >= totalCourseNodes) {
                if (!newStats.unlockedAvatars.includes(courseId)) newStats.unlockedAvatars.push(courseId);
                if (courseId === 'css' && !newStats.unlockedBadges.includes('css_master')) newStats.unlockedBadges.push('css_master');
            }
            if (!newStats.unlockedBadges.includes('first_code') &&
                (newStats.courses.html.completedNodes.length > 0 ||
                    newStats.courses.css.completedNodes.length > 0 ||
                    newStats.courses.js.completedNodes.length > 0)) {
                newStats.unlockedBadges.push('first_code');
            }
            newStats.courses[courseId] = courseData;
            return newStats;
        });
    };

    const buyPremiumAvatar = (cost = 500) => {
        let success = false;
        setStats(prev => {
            if (prev.hearts >= cost && !prev.unlockedAvatars.includes('premium')) {
                success = true;
                return { ...prev, hearts: prev.hearts - cost, unlockedAvatars: [...prev.unlockedAvatars, 'premium'], currentAvatar: 'premium' };
            }
            return prev;
        });
        return success;
    };

    const unlockBadge = (badgeId) => {
        setStats(prev => {
            if (!prev.unlockedBadges.includes(badgeId)) return { ...prev, unlockedBadges: [...prev.unlockedBadges, badgeId] };
            return prev;
        });
    };

    const currentLevel = Math.floor(stats.xp / 100) + 1;
    const currentLevelXp = stats.xp % 100;
    const nextLevelXp = 100;

    const updateStreak = () => {
        setStats(prev => {
            const newStreak = prev.streak + 1;
            let newBadges = [...prev.unlockedBadges];
            let bonusXp = 0;

            // Nomi o'zgaradigan yirik etaplarda foydalanuvchiga Bonus beramiz!
            if ([3, 7, 14, 30].includes(newStreak)) {
                bonusXp = 50; 
            }

            if (newStreak >= 7 && !newBadges.includes('streak_7')) newBadges.push('streak_7');
            
            return { 
                ...prev, 
                streak: newStreak, 
                unlockedBadges: newBadges,
                xp: prev.xp + bonusXp
            };
        });
    };

    return (
        <UserContext.Provider value={{
            stats, setStats, addXp, useHeart, completeNode, switchCourse,
            changeAvatar, unlockAvatar, buyPremiumAvatar, loginUser, logoutUser,
            deleteAccount, currentLevel, currentLevelXp, nextLevelXp, unlockBadge, updateStreak, updateSkill
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
