import { useState, useEffect } from 'react';
import './Dashboard.css';
import { useUser } from '../context/UserContext';
import Mascot from './Mascot';
import { getStreakTier } from '../utils/streakUtils';

function Dashboard({ onNavigate }) {
    const { stats, currentLevel, currentLevelXp, nextLevelXp } = useUser();
    const tier = getStreakTier(stats?.streak || 0);
    const [mascotState, setMascotState] = useState('greeting');
    const [mascotMessage, setMascotMessage] = useState('Assalomu alaykum!');

    useEffect(() => {
        const timer = setTimeout(() => {
            if ([3, 7, 14, 30].includes(stats.streak)) {
                setMascotState('happy');
                setMascotMessage(`🎉 Olovingiz "${tier.name}" darajasiga chiqdi! G'alaba!`);
            } else {
                setMascotState('invite');
                setMascotMessage('Bugun qayerdan boshlaymiz?');
            }
        }, 3500); // 3.5 sekund salom beradi
        return () => clearTimeout(timer);
    }, []);

    // Mock daily quests data depending on real day
    const dailyQuests = [
        { id: 1, title: 'Bitta HTML darsini tugating', amount: 1, progress: 0, reward: 15, completed: false },
        { id: 2, title: 'Xatosiz 3ta savolga javob bering', amount: 3, progress: 1, reward: 20, completed: false },
        { id: 3, title: 'Yangi maqolani o\'qing', amount: 1, progress: 1, reward: 10, completed: true },
    ];

    const currentCourseData = {
        'html': { title: 'HTML5 Asoslari', icon: 'fa-html5', color: '#e34f26' },
        'css': { title: 'Zamonaviy CSS3', icon: 'fa-css3-alt', color: '#264de4' },
        'js': { title: 'JavaScript Dasturlash', icon: 'fa-js', color: '#f7df1e' },
        'python': { title: 'Python Asoslari', icon: 'fa-python', color: '#3776AB' }
    };

    // Safe fallbacks to prevent screen crashes!
    const safeCourseId = stats?.currentCourse && currentCourseData[stats.currentCourse] ? stats.currentCourse : 'html';
    const courseInfo = currentCourseData[safeCourseId] || currentCourseData['html'];
    const courseProgress = stats?.courses?.[safeCourseId] || { completedNodes: [] };
    const completedNodes = courseProgress.completedNodes?.length || 0;
    // Assuming 5 modules per course (as per Phase 12 restructuring)
    const progressPercent = Math.min((completedNodes / 5) * 100, 100);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-welcome-info">
                    <h2>Xush Kelibsiz, <span className="highlight-text">{stats.username || 'Dasturchi'}</span>! 🚀</h2>
                    <p>Bugungi yangi marralarni zabt etishga tayyormisiz?</p>

                    <div className="user-level-info">
                        <div className="level-texts">
                            <span className="level-badge">🏆 Level {currentLevel} Dasturchi</span>
                            <span className="level-xp">{currentLevelXp} / {nextLevelXp} XP</span>
                        </div>
                        <div className="xp-progress-bar">
                            <div className="xp-progress-fill" style={{ width: `${(currentLevelXp / nextLevelXp) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="mascot-greeting">
                    <Mascot state={mascotState} message={mascotMessage} />
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Asosiy statistika */}
                <div className="dash-card stats-overview">
                    <h3>Sizning Natijangiz</h3>
                    <div className="stats-row">
                        <div className="stat-box" style={{ 
                            borderColor: tier.tier > 1 ? tier.color : '',
                            boxShadow: tier.tier > 1 ? `inset 0 0 15px ${tier.color}30` : ''
                        }}>
                            <span className="dashboard-streak-emoji" style={{ 
                                filter: `drop-shadow(0 0 ${tier.glow}px ${tier.color})`,
                                fontSize: '2.5rem',
                                transition: 'all 0.5s ease',
                                transform: tier.tier >= 4 ? 'scale(1.1)' : 'scale(1)'
                            }}>
                                {tier.icon}
                            </span>
                            <div className="stat-info">
                                <span style={{ 
                                    color: tier.tier > 1 ? tier.color : '', 
                                    textShadow: tier.tier > 1 ? `0 0 10px ${tier.color}` : '' 
                                }}>
                                    {stats.streak} Kun
                                </span>
                                <small style={{ color: tier.tier > 1 ? tier.color : 'var(--text-muted)', fontWeight: 'bold', textShadow: tier.tier > 1 ? `0 0 5px ${tier.color}` : '' }}>{tier.name}</small>
                            </div>
                        </div>
                        <div className="stat-box">
                            <span className="xp-emoji" style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px #ffd700)' }}>⚡</span>
                            <div className="stat-info">
                                <span>{stats.xp} XP</span>
                                <small>Jami Tajriba</small>
                            </div>
                        </div>
                        <div className="stat-box">
                            <span className="heart-emoji" style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px #ff1744)' }}>❤️</span>
                            <div className="stat-info">
                                <span>{stats.hearts}</span>
                                <small>Sog'lik</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Joriy Kurs */}
                <div className="dash-card current-course-resume">
                    <h3>Hozirgi Kursingiz</h3>
                    <div className="resume-box" style={{ borderLeftColor: courseInfo?.color || '#fff' }}>
                        <i className={`fa-brands ${courseInfo?.icon || 'fa-html5'} course-big-icon`} style={{ color: courseInfo?.color || '#fff' }}></i>
                        <div className="resume-info">
                            <h4>{courseInfo?.title || 'Kurs'}</h4>
                            <div className="course-progress-bar">
                                <div className="course-progress-fill" style={{ width: `${progressPercent}%`, backgroundColor: courseInfo?.color || '#fff' }}></div>
                            </div>
                            <span>{completedNodes} / 5 tugun tugatildi</span>
                        </div>
                        <button className="btn btn-primary play-btn" onClick={() => onNavigate('map')}>
                            Davom Etish <i className="fa-solid fa-play"></i>
                        </button>
                    </div>

                    <div className="resume-box library-promo-box" style={{ borderLeftColor: '#00e5ff', marginTop: '15px' }}>
                        <i className="fa-solid fa-book-open course-big-icon" style={{ color: '#00e5ff' }}></i>
                        <div className="resume-info">
                            <h4>Kutubxona</h4>
                            <span>PDF Maqolalar & Kitoblar oynasi</span>
                        </div>
                        <button className="btn btn-primary play-btn" style={{ background: 'rgba(0,229,255,0.1)', color: '#00e5ff', borderColor: '#00e5ff' }} onClick={() => onNavigate('library')}>
                            Kitoblarni O'qish <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* Kunlik Vazifalar (Daily Quests) */}
                <div className="dash-card daily-quests">
                    <h3>Kunlik Vazifalar <i className="fa-solid fa-calendar-check"></i></h3>
                    <div className="quests-list">
                        {dailyQuests.map(quest => (
                            <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
                                <div className="quest-icon">
                                    {quest.completed ? <i className="fa-solid fa-check-circle correct-icon"></i> : <i className="fa-solid fa-circle-dot"></i>}
                                </div>
                                <div className="quest-details">
                                    <h4>{quest.title}</h4>
                                    <div className="quest-progress-bar">
                                        <div className="quest-progress-fill" style={{ width: `${(quest.progress / quest.amount) * 100}%` }}></div>
                                    </div>
                                    <span>{quest.progress} / {quest.amount}</span>
                                </div>
                                <div className="quest-reward" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1rem', fontWeight: 'bold', color: '#ffd700', textShadow: '0 0 10px rgba(255,215,0,0.5)' }}>
                                    <span>⚡</span> +{quest.reward}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
