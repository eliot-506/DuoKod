import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { COURSES } from '../data/lessons';
import { BOSS_DATA } from '../data/bossData';
import { supabase } from '../lib/supabase';
import { getCalendarDayDifference, getLocalDateKey } from '../utils/streakUtils';
import { addDailyXp, createDailyXpState, normalizeDailyXp } from '../utils/progressUtils';
import { addUniqueBadges, getLessonCompletionBadges, getStreakBadges } from '../utils/badgeUtils';

const UserContext = createContext();

const defaultUserStats = {
    isLoggedIn: false,
    supabaseId: null,
    username: '',
    email: '',
    streak: 0,
    xp: 0,
    hearts: 50,
    dailyXp: createDailyXpState(),
    role: 'user',
    isAdmin: false,
    isSuperAdmin: false,
    adminModeEnabled: false,
    isPremium: false,
    premiumUntil: null,
    isActive: true,
    lastPlayed: null,
    currentCourse: 'python',
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
        html: { completedNodes: [], unlockedNodes: [1], lessonScores: {} },
        css: { completedNodes: [], unlockedNodes: [1], lessonScores: {} },
        js: { completedNodes: [], unlockedNodes: [1], lessonScores: {} },
        python: { completedNodes: [], unlockedNodes: [1], lessonScores: {} }
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

        const { error: premiumError } = await supabase
            .from('profiles')
            .update({
                is_premium: data.isPremium,
                premium_until: data.premiumUntil
            })
            .eq('id', userId);

        if (premiumError && !['42703', 'PGRST204'].includes(premiumError.code)) {
            console.warn('Premium sync xatoligi:', premiumError.message);
        }

        // Har bir kurs progressini saqlash
        for (const courseId of Object.keys(data.courses)) {
            await supabase.from('course_progress').upsert({
                user_id: userId,
                course_id: courseId,
                completed_nodes: data.courses[courseId].completedNodes,
                unlocked_nodes: data.courses[courseId].unlockedNodes,
                lesson_scores: data.courses[courseId].lessonScores || {},
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
                    unlockedNodes: cp.unlocked_nodes || [1],
                    lessonScores: cp.lesson_scores || {}
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
            dailyXp: createDailyXpState(),
            role: role,
            isAdmin: role === 'admin',
            isSuperAdmin: role === 'super_admin',
            adminModeEnabled: false,
            isPremium: Boolean(profile.is_premium) || role === 'admin' || role === 'super_admin',
            premiumUntil: profile.premium_until || null,
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
                Object.keys(defaultUserStats.courses).forEach(courseId => {
                    parsed.courses[courseId] = {
                        ...defaultUserStats.courses[courseId],
                        ...(parsed.courses[courseId] || {}),
                        lessonScores: parsed.courses[courseId]?.lessonScores || {}
                    };
                });
                // Faqat oddiy foydalanuvchilar uchun Pythonga majburan o'tkazamiz
                // Admin va super_admin uchun hamma kurslar ochiq
                const adminModeEnabled = parsed.role === 'super_admin' && Boolean(parsed.adminModeEnabled);
                parsed.adminModeEnabled = adminModeEnabled;
                parsed.isSuperAdmin = parsed.role === 'super_admin';
                parsed.isAdmin = parsed.role === 'admin' || adminModeEnabled;
                const isAdmin = parsed.isAdmin;
                if (!isAdmin) {
                    parsed.currentCourse = 'python';
                }
                if (!parsed.unlockedAvatars) parsed.unlockedAvatars = ['default'];
                if (!parsed.currentAvatar) parsed.currentAvatar = 'default';
                if (!parsed.unlockedBadges) parsed.unlockedBadges = [];
                if (typeof parsed.isPremium !== 'boolean') parsed.isPremium = false;
                if (!parsed.premiumUntil) parsed.premiumUntil = null;
                parsed.dailyXp = normalizeDailyXp(parsed.dailyXp);
                return parsed;
            } catch { return defaultUserStats; }
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
                setStats(prev => {
                    const adminModeEnabled = cloudData.isSuperAdmin && Boolean(prev.adminModeEnabled);
                    return {
                        ...prev,
                        ...cloudData,
                        email: session.user.email,
                        adminModeEnabled,
                        isAdmin: cloudData.role === 'admin' || adminModeEnabled
                    };
                });
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
    }, [stats]);

    const loginUser = useCallback(async (username, email, supabaseId = null) => {
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
    }, []);

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

    const addXp = useCallback((amount) => {
        const safeAmount = Math.max(0, Number(amount) || 0);
        if (safeAmount <= 0) return;
        setStats(prev => ({
            ...prev,
            xp: prev.xp + safeAmount,
            dailyXp: addDailyXp(prev.dailyXp, safeAmount)
        }));
    }, []);
    const spendHeart = (amount = 1) => setStats(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - amount) }));
    const addHeart = (amount) => setStats(prev => ({ ...prev, hearts: prev.hearts + amount }));
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

    const completeNode = (nodeId, nextNodeId, score = null) => {
        setStats(prev => {
            const newStats = { ...prev };
            const courseId = newStats.currentCourse;
            const courseData = {
                ...newStats.courses[courseId],
                lessonScores: { ...(newStats.courses[courseId]?.lessonScores || {}) }
            };

            if (!courseData.completedNodes.includes(nodeId)) courseData.completedNodes.push(nodeId);
            if (nextNodeId && !courseData.unlockedNodes.includes(nextNodeId)) courseData.unlockedNodes.push(nextNodeId);
            if (score !== null && Number.isFinite(score)) {
                const roundedScore = Math.max(0, Math.min(100, Math.round(score)));
                const previousBest = courseData.lessonScores[nodeId] || 0;
                courseData.lessonScores[nodeId] = Math.max(previousBest, roundedScore);
            }

            const totalCourseNodes = COURSES[courseId].data.length;
            const completedLessonCount = courseData.completedNodes.filter(id => Number(id) < 100).length;
            const requiredBosses = BOSS_DATA[courseId]?.bosses || [];
            const completedBossCount = requiredBosses.filter(boss => courseData.completedNodes.includes(boss.moduleId * 100)).length;
            const courseIsComplete = completedLessonCount >= totalCourseNodes && completedBossCount >= requiredBosses.length;
            if (courseIsComplete) {
                if (!newStats.unlockedAvatars.includes(courseId)) newStats.unlockedAvatars.push(courseId);
                if (courseId === 'css') newStats.unlockedBadges = addUniqueBadges(newStats.unlockedBadges, ['css_master']);
            }
            newStats.courses[courseId] = courseData;
            const completedAnyWebLesson = ['html', 'css', 'js'].some(id => (
                newStats.courses[id].completedNodes.some(nodeId => Number(nodeId) < 100)
            ));
            if (completedAnyWebLesson) {
                newStats.unlockedBadges = addUniqueBadges(newStats.unlockedBadges, ['first_code']);
            }
            newStats.unlockedBadges = addUniqueBadges(
                newStats.unlockedBadges,
                getLessonCompletionBadges({ courseId, completedLessonCount, score })
            );
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

    const completeSection = (moduleId, sectionId, score = 0) => {
        setStats(prev => {
            const courseId = prev.currentCourse;
            const module = COURSES[courseId]?.data?.find(item => item.id === moduleId);
            if (!module?.sections?.length) return prev;

            const courseData = {
                ...prev.courses[courseId],
                completedNodes: [...prev.courses[courseId].completedNodes],
                unlockedNodes: [...prev.courses[courseId].unlockedNodes],
                lessonScores: { ...(prev.courses[courseId].lessonScores || {}) }
            };
            const sectionKey = `${moduleId}:${sectionId}`;
            const safeScore = Math.max(0, Math.min(100, Math.round(score)));
            courseData.lessonScores[sectionKey] = Math.max(courseData.lessonScores[sectionKey] || 0, safeScore);

            const allSectionsComplete = module.sections.every(section => (
                Number.isFinite(courseData.lessonScores[`${moduleId}:${section.id}`])
            ));

            if (allSectionsComplete) {
                if (!courseData.completedNodes.includes(moduleId)) courseData.completedNodes.push(moduleId);
                const sectionScores = module.sections.map(section => courseData.lessonScores[`${moduleId}:${section.id}`]);
                courseData.lessonScores[moduleId] = Math.round(
                    sectionScores.reduce((total, value) => total + value, 0) / sectionScores.length
                );
                const hasBoss = BOSS_DATA[courseId]?.bosses?.some(boss => boss.moduleId === moduleId);
                if (!hasBoss && !courseData.unlockedNodes.includes(moduleId + 1)) {
                    courseData.unlockedNodes.push(moduleId + 1);
                }
            }

            const completedLessonCount = courseData.completedNodes.filter(id => Number(id) < 100).length;
            const completedAnyWebLesson = ['html', 'css', 'js'].some(id => {
                const progress = id === courseId ? courseData : prev.courses[id];
                return progress.completedNodes.some(nodeId => Number(nodeId) < 100);
            });
            const newBadges = addUniqueBadges(
                prev.unlockedBadges,
                [
                    ...(completedAnyWebLesson ? ['first_code'] : []),
                    ...getLessonCompletionBadges({ courseId, completedLessonCount, score: safeScore })
                ]
            );

            return {
                ...prev,
                unlockedBadges: newBadges,
                courses: { ...prev.courses, [courseId]: courseData }
            };
        });
    };

    const activatePremiumDemo = () => {
        const until = new Date();
        until.setDate(until.getDate() + 30);
        setStats(prev => ({
            ...prev,
            isPremium: true,
            premiumUntil: until.toISOString(),
            hearts: Math.max(prev.hearts, 150),
            unlockedAvatars: prev.unlockedAvatars.includes('premium')
                ? prev.unlockedAvatars
                : [...prev.unlockedAvatars, 'premium']
        }));
    };

    const toggleAdminMode = () => {
        setStats(prev => {
            if (!prev.isSuperAdmin) return prev;
            const adminModeEnabled = !prev.adminModeEnabled;
            return {
                ...prev,
                adminModeEnabled,
                isAdmin: adminModeEnabled,
                currentCourse: adminModeEnabled ? prev.currentCourse : 'python'
            };
        });
    };

    const currentLevel = Math.floor(stats.xp / 100) + 1;
    const currentLevelXp = stats.xp % 100;
    const nextLevelXp = 100;

    const updateStreak = () => {
        setStats(prev => {
            const now = new Date();
            // Vaqt zonasini hisobga olgan holda faqat "kun" ni solishtirish
            const todayStr = getLocalDateKey(now);
            const lastStr = prev.lastPlayed ? prev.lastPlayed.slice(0, 10) : null;

            // Bugun allaqachon o'ynagan — streak va lastPlayed o'zgarmaydi
            if (lastStr === todayStr) return prev;

            let newStreak;
            if (lastStr) {
                // Kecha o'ynagan bo'lsa → streak davom etadi
                const diff = getCalendarDayDifference(lastStr, todayStr);
                if (diff === 1) {
                    newStreak = prev.streak + 1; // Kecha o'ynagan → davom etadi
                } else {
                    newStreak = 1; // 2+ kun o'tkazilgan → noldan boshlaydi
                }
            } else {
                newStreak = 1; // Birinchi marta o'ynayapti
            }

            let newBadges = [...prev.unlockedBadges];
            let bonusXp = 0;

            // Yirik etaplarda bonus XP
            if ([3, 7, 14, 30].includes(newStreak)) {
                bonusXp = 50;
            }

            newBadges = addUniqueBadges(newBadges, getStreakBadges(newStreak));

            return {
                ...prev,
                streak: newStreak,
                lastPlayed: todayStr, // Bugunni saqlaymiz
                unlockedBadges: newBadges,
                xp: prev.xp + bonusXp
            };
        });
    };

    return (
        <UserContext.Provider value={{
            stats, setStats, addXp, spendHeart, addHeart, completeNode, completeSection, switchCourse,
            changeAvatar, unlockAvatar, buyPremiumAvatar, loginUser, logoutUser,
            deleteAccount, currentLevel, currentLevelXp, nextLevelXp, unlockBadge, updateStreak, updateSkill,
            activatePremiumDemo, toggleAdminMode
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
