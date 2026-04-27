import { useState, useEffect } from 'react';
import './Dashboard.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';

function Dashboard({ onNavigate }) {
    const { stats, currentLevel, currentLevelXp, nextLevelXp } = useUser();
    const tier = getStreakTier(stats?.streak || 0);

    // Mock daily quests data depending on real day
    const dailyQuests = [
        { id: 1, title: 'Bitta HTML darsini tugating', amount: 1, progress: 0, reward: 15, completed: false },
        { id: 2, title: 'Xatosiz 3ta savolga javob bering', amount: 3, progress: 1, reward: 20, completed: false },
        { id: 3, title: 'Yangi maqolani o\'qing', amount: 1, progress: 1, reward: 40, completed: true },
    ];

    const currentCourseData = {
        'html': { title: 'HTML5 Asoslari', icon: '🧱', color: '#e34f26' },
        'css': { title: 'Toza CSS3', icon: '🎨', color: '#264de4' },
        'js': { title: 'JavaScript Dasturlash', icon: '⚡', color: '#f7df1e' },
        'python': { title: 'Python Asoslari', icon: '🐍', color: '#3776AB' }
    };

    const isAdmin = stats?.isAdmin || stats?.isSuperAdmin;
    const safeCourseId = stats?.currentCourse && currentCourseData[stats.currentCourse] ? stats.currentCourse : 'html';
    const courseInfo = currentCourseData[safeCourseId] || currentCourseData['html'];
    const courseProgress = stats?.courses?.[safeCourseId] || { completedNodes: [] };
    const completedNodes = courseProgress.completedNodes?.length || 0;
    
    // Hardcode modules count based on actual app data (Python has 11, others 5)
    const totalModules = safeCourseId === 'python' ? 11 : 5;
    const progressPercent = Math.min((completedNodes / totalModules) * 100, 100).toFixed(0);
    const completedLevelPercent = Math.min((currentLevelXp / nextLevelXp) * 100, 100);

    return (
      <div className="dash-wrapper">
        <div className="dash-container">
          
          {/* Topbar */}
          <header className="dash-header">
            <div className="dash-logo">
              <h1>DUOKOD</h1>
              <p>Gamified learning dashboard</p>
            </div>

            <div className="dash-badges">
              <span className="badge badge-streak">🔥 {stats.streak}</span>
              <span className="badge badge-xp">⚡ {stats.xp} XP</span>
              <span className="badge badge-hearts">💗 {stats.hearts}</span>
              {isAdmin && (
                <button className="dash-admin-btn" onClick={() => onNavigate('admin')}>
                  Admin Panel
                </button>
              )}
            </div>
          </header>

          {/* Hero */}
          <section className="dash-hero-section">
            <div className="dash-hero-card">
              <div className="hero-top">
                <div>
                  <p>Xush kelibsiz 👋</p>
                  <h2>{stats.username || 'Dasturchi'}, bugun yangi marralarni zabt etamizmi?</h2>
                </div>
                <div className="hero-avatar">🤖</div>
              </div>

              <div className="hero-level-info">
                <div className="hero-level-text">
                  <span className="title">Level {currentLevel} Dasturchi</span>
                  <span className="progress">{currentLevelXp} / {nextLevelXp} XP</span>
                </div>
                <div className="hero-bar-bg">
                  <div className="hero-bar-fill" style={{ width: `${completedLevelPercent}%` }}></div>
                </div>
              </div>

              <div className="hero-actions">
                <button className="hero-btn hero-btn-primary" onClick={() => onNavigate('map')}>
                  Darsni davom ettirish
                </button>
                <button className="hero-btn hero-btn-secondary" onClick={() => alert('Vazifalar menyusi alohida yaratiladi')}>
                  Bugungi mag'sadlarni ko'rish
                </button>
              </div>
            </div>

            <aside className="dash-goal-card">
              <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0 0 8px 0', fontWeight: 500 }}>Bugungi maqsad</p>
              <h3>{dailyQuests.length} ta vazifani yakunlang</h3>

              <div className="goal-box">
                <p>Progress</p>
                <p>{dailyQuests.filter(q => q.completed).length} / {dailyQuests.length}</p>
              </div>

              <div className="goal-meta">
                <span className="label">Umumiy Mukofot</span>
                <span className="val-warning">+{dailyQuests.reduce((acc, q) => acc + q.reward, 0)} XP</span>
              </div>
              <div className="goal-meta">
                <span className="label">Olov (Streak) Bonus</span>
                <span className="val-success">{stats.streak > 0 ? 'Faol' : 'Qulf'}</span>
              </div>
            </aside>
          </section>

          {/* KPIs */}
          <section className="dash-kpi-section">
            <div className="kpi-card">
              <p className="label">Uchqun darajasi</p>
              <p className="val">{tier.name}</p>
            </div>
            <div className="kpi-card">
              <p className="label">Jami tajriba</p>
              <p className="val">{stats.xp} XP</p>
            </div>
            <div className="kpi-card">
              <p className="label">Sog'liq (Hearts)</p>
              <p className="val">{stats.hearts}</p>
            </div>
            <div className="kpi-card">
              <p className="label">Tugallangan darslar</p>
              <p className="val">{completedNodes} / {totalModules}</p>
            </div>
          </section>

          {/* Main Content */}
          <section className="dash-main-section">
            <div className="dash-tasks-card">
              <div className="tasks-header">
                <h3>Kunlik vazifalar</h3>
                <button>Barchasini ko'rish</button>
              </div>

              <div className="task-list">
                {dailyQuests.map(quest => (
                  <div key={quest.id} className={`task-item ${quest.completed ? 'completed' : ''}`}>
                    <div className="task-check">
                      {quest.completed ? '✓' : ''}
                    </div>
                    
                    <div className="task-content">
                      <p className="task-title">{quest.title}</p>
                      <div className="task-progress-bg">
                        <div className="task-progress-fill" style={{ width: `${(quest.progress / quest.amount) * 100}%` }}></div>
                      </div>
                      <p className="task-meta">{quest.progress} / {quest.amount} bajarildi</p>
                    </div>

                    <span className="task-reward">+{quest.reward} XP</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="dash-sidebar">
              <div className="course-small-card">
                <div className="course-card-top">
                  <div>
                    <p>Hozirgi kurs</p>
                    <h3>{courseInfo.title}</h3>
                  </div>
                  <div className="course-card-icon">{courseInfo.icon}</div>
                </div>

                <div className="task-progress-bg" style={{ height: '10px' }}>
                  <div className="task-progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>

                <div className="course-progress-meta">
                  <span>{completedNodes} / {totalModules} dars tugatildi</span>
                  <span>{progressPercent}%</span>
                </div>

                <button className="hero-btn hero-btn-primary continue-btn" onClick={() => onNavigate('map')}>
                  Davom etish
                </button>
              </div>

              <div className="library-card">
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0 }}>Kutubxona</p>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '4px 0 0' }}>PDF Maqolalar</h3>
                <p className="lib-desc">Qo'shimcha materiallar orqali bilimingizni yanada mustahkamlang.</p>
                <button className="hero-btn hero-btn-secondary continue-btn" onClick={() => onNavigate('library')}>
                  Kutubxonaga o'tish
                </button>
              </div>
            </aside>
          </section>

        </div>
      </div>
    );
}

export default Dashboard;
