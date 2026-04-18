import { useState, useEffect } from 'react'
import './Profile.css'
import { useUser } from '../context/UserContext'
import AnimatedRobot from './AnimatedRobot'
import SkillRadarChart from './SkillRadarChart'

const AVATAR_LIST = [
    { id: 'default', name: 'Boshlang\'ich Robot', desc: 'Bepul kiber robot' },
    { id: 'html', name: 'HTML G\'olibi', desc: 'Web me\'mori' },
    { id: 'css', name: 'CSS Dizayner', desc: 'Slayd va uslub ustasi' },
    { id: 'js', name: 'JS Sehrgari', desc: 'Mantiq mutaxassisi' },
    { id: 'premium', name: 'Premium (PRO)', desc: 'Tilla toj egasi' }
];
const BADGE_LIST = [
    { id: 'first_code', icon: 'fa-code', title: 'First Code', desc: 'Birinchi kodni muvaffaqiyatli yozganingiz uchun' },
    { id: 'streak_7', icon: 'fa-fire', title: '7 Day Streak', desc: 'Ketma-ket 7 kun dars qilganingiz uchun' },
    { id: 'css_master', icon: 'fa-css3-alt', title: 'CSS Master', desc: 'Barcha CSS modullarini tugatganingiz uchun' }
];

function Profile() {
    const { stats, changeAvatar, buyPremiumAvatar, logoutUser, deleteAccount, currentLevel, currentLevelXp, nextLevelXp } = useUser()
    const [isLightMode, setIsLightMode] = useState(() => document.body.classList.contains('light-mode'))
    const [selectedSkillTab, setSelectedSkillTab] = useState(stats.currentCourse || 'python');

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode')
            localStorage.setItem('duokod_theme', 'light')
        } else {
            document.body.classList.remove('light-mode')
            localStorage.setItem('duokod_theme', 'neon')
        }
    }, [isLightMode])

    useEffect(() => {
        const savedTheme = localStorage.getItem('duokod_theme')
        if (savedTheme === 'light') setIsLightMode(true)
    }, [])

    const handleBuyPremium = () => {
        if (buyPremiumAvatar(500)) {
            alert("Muvaffaqiyatli sotib olindi! Premium avatar faollashdi.");
        } else {
            alert("Sotib olish uchun yetarli ❤️ yurakchalar mavjud emas (Kamida 500 ta kerak).");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar-large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', background: (stats.currentAvatar || 'default') === 'default' ? 'transparent' : '' }}>
                    {(stats.currentAvatar || 'default') === 'default' ? (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatedRobot state="idle" />
                        </div>
                    ) : (
                        <img src={`/assets/mascots/mascot_${stats.currentAvatar || 'default'}.png`} alt="current avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    )}
                </div>
                <h2 className="profile-name">{stats.username || 'Foydalanuvchi'}</h2>
                <div className="profile-level-badge">🏆 Level {currentLevel} Dasturchi</div>
                <div className="profile-xp-progress">
                    <div className="xp-progress-fill" style={{ width: `${(currentLevelXp / nextLevelXp) * 100}%` }}></div>
                </div>
                <p className="profile-joined">DuoKod da 2026-yildan beri | {currentLevelXp} / {nextLevelXp} XP</p>
            </div>

            <div className="profile-stats-grid">
                <div className="profile-stat-box">
                    <span className="stat-icon">🔥</span>
                    <div className="stat-info">
                        <span className="stat-value">{stats.streak}</span>
                        <span className="stat-label">Kunlik Streak</span>
                    </div>
                </div>

                <div className="profile-stat-box">
                    <span className="stat-icon">⚡</span>
                    <div className="stat-info">
                        <span className="stat-value">{stats.xp}</span>
                        <span className="stat-label">Jami XP</span>
                    </div>
                </div>

                <div className="profile-stat-box">
                    <span className="stat-icon">❤️</span>
                    <div className="stat-info">
                        <span className="stat-value">{stats.hearts}</span>
                        <span className="stat-label">Yurakchalar</span>
                    </div>
                </div>

                <div className="profile-stat-box">
                    <span className="stat-icon">📚</span>
                    <div className="stat-info">
                        <span className="stat-value">
                            {Object.values(stats.courses).reduce((acc, course) => acc + (course.completedNodes?.length || 0), 0)}
                        </span>
                        <span className="stat-label">Tugallangan Darslar</span>
                    </div>
                </div>
            </div>

            <div className="settings-section skills-radar-section">
                <h3 className="settings-title">Sizning Ko'nikmalaringiz (Tech Stack) 🕸️</h3>
                <div className="skill-tabs">
                    {['python', 'js', 'html', 'css'].map(lang => (
                        <button 
                            key={lang} 
                            className={`skill-tab-btn ${selectedSkillTab === lang ? 'active' : ''}`}
                            onClick={() => setSelectedSkillTab(lang)}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="skill-radar-wrapper">
                    <SkillRadarChart 
                        data={stats.skillMap[selectedSkillTab]} 
                        color={selectedSkillTab === 'python' ? '255, 204, 0' : selectedSkillTab === 'js' ? '247, 223, 30' : selectedSkillTab === 'html' ? '228, 77, 38' : '38, 77, 228'}
                    />
                </div>
            </div>

            <div className="settings-section badges-section">
                <h3 className="settings-title">Yutuqlar va Nishonlar (Badges) 🏅</h3>
                <div className="badges-grid">
                    {BADGE_LIST.map(badge => {
                        const isUnlocked = stats.unlockedBadges.includes(badge.id);
                        return (
                            <div key={badge.id} className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                                <div className="badge-icon-wrapper">
                                    <i className={`fa-solid ${badge.icon}`}></i>
                                </div>
                                <div className="badge-info">
                                    <h4>{badge.title}</h4>
                                    <p>{badge.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="settings-section avatar-shop-section">
                <h3 className="settings-title">Mascot Do'koni (Avatarlar)</h3>

                <div className="avatar-grid">
                    {AVATAR_LIST.map(avatar => {
                        const isUnlocked = stats.unlockedAvatars.includes(avatar.id);
                        const isCurrent = stats.currentAvatar === avatar.id;
                        const isPremium = avatar.id === 'premium';

                        return (
                            <div key={avatar.id} className={`avatar-card ${isCurrent ? 'active' : ''} ${!isUnlocked && !isPremium ? 'locked' : ''} ${!isUnlocked && isPremium ? 'premium-locked' : ''}`}>
                                {avatar.id === 'default' ? (
                                    <div className="shop-avatar-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <AnimatedRobot state="greeting" />
                                        </div>
                                    </div>
                                ) : (
                                    <img src={`/assets/mascots/mascot_${avatar.id}.png`} alt={avatar.name} className="shop-avatar-img" />
                                )}
                                <div className="avatar-details">
                                    <h4>{avatar.name}</h4>
                                    <p>{avatar.desc}</p>
                                </div>
                                <div className="avatar-action">
                                    {isCurrent ? (
                                        <button className="btn btn-primary" disabled>Faol 🟢</button>
                                    ) : isUnlocked ? (
                                        <button className="btn btn-secondary" onClick={() => changeAvatar(avatar.id)}>Tanlash</button>
                                    ) : isPremium ? (
                                        <button className="btn btn-premium" onClick={handleBuyPremium}>Sotib olish (500 ❤️)</button>
                                    ) : (
                                        <button className="btn btn-locked" disabled>Qulflangan 🔒</button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="settings-section">
                <h3 className="settings-title">Sozlamalar</h3>
                <div className="setting-item">
                    <div className="setting-info">
                        <span className="setting-name">Kunduzgi (Oq) Mavzu ☀️</span>
                        <span className="setting-desc">Oq fonli, yorqin va jonli dasturlash dizayni</span>
                    </div>
                    <label className="theme-switch">
                        <input
                            type="checkbox"
                            checked={isLightMode}
                            onChange={() => setIsLightMode(!isLightMode)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="setting-item logout-setting" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button className="btn logout-btn" onClick={logoutUser}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Tizimdan Chiqish
                    </button>
                    <button className="btn logout-btn" 
                        style={{ background: 'rgba(255, 75, 75, 0.15)', color: '#ff7675', border: '1px solid rgba(255, 75, 75, 0.4)' }} 
                        onClick={() => {
                            if(window.confirm("Barcha ma'lumotlaringiz (XP, daraja, avatarlar) o'chib ketadi. Rostdan ham akkauntni o'chirmoqchimisiz?")) {
                                deleteAccount();
                            }
                        }}>
                        <i className="fa-solid fa-trash"></i> Akkauntni O'chirish
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
