import { useState, useEffect } from 'react';
import './Dashboard.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';

function Dashboard({ onNavigate }) {
    const { stats, currentLevel, currentLevelXp, nextLevelXp } = useUser();
    const tier = getStreakTier(stats?.streak || 0);

    // Mock daily quests data
    const dailyQuests = [
        { id: 1, title: 'Bitta HTML darsini tugating', amount: 1, progress: 0, reward: 15, completed: false },
        { id: 2, title: 'Xatosiz 3ta savolga javob bering', amount: 3, progress: 1, reward: 20, completed: false }
    ];

    const currentCourseData = {
        'html': { title: 'HTML5 Asoslari', icon: '🧱', color: '#e34f26' },
        'css': { title: 'Toza CSS3', icon: '🎨', color: '#264de4' },
        'js': { title: 'JavaScript Dasturlash', icon: '⚡', color: '#f7df1e' },
        'python': { title: 'Python Asoslari', icon: '🐍', color: '#3776AB' }
    };

    const safeCourseId = stats?.currentCourse && currentCourseData[stats.currentCourse] ? stats.currentCourse : 'html';
    const courseInfo = currentCourseData[safeCourseId] || currentCourseData['html'];
    const courseProgress = stats?.courses?.[safeCourseId] || { completedNodes: [] };
    const completedNodes = courseProgress.completedNodes?.length || 0;
    
    // As per actual logic (Python uses 11)
    const totalModules = safeCourseId === 'python' ? 11 : 5;
    const progressPercent = Math.min((completedNodes / totalModules) * 100, 100).toFixed(0);
    const completedLevelPercent = Math.min((currentLevelXp / nextLevelXp) * 100, 100);

    return (
      <div className="dash-wrapper">
        <div className="dash-container">
          
          <main className="dash-grid-12">
            
            {/* ROW 1: Hero & Goal */}
            <div className="col-8 card-hero">
              <div>
                <p className="hero-subtitle">Xush kelibsiz 👋</p>
                <h1>{stats.username || 'Muhammad Matchonov'}, bugun yangi marralarni zabt etamizmi?</h1>
              </div>

              <div>
                <div className="hero-level-row">
                  <span className="lvl-name">Level {currentLevel} Dasturchi</span>
                  <span className="lvl-xp">{currentLevelXp} / {nextLevelXp} XP</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill fill-emerald" style={{ width: `${completedLevelPercent}%` }}></div>
                </div>
                <div className="hero-actions">
                  <button className="dash-btn dash-btn-primary" onClick={() => onNavigate('map')}>Darsni davom ettirish</button>
                  <button className="dash-btn dash-btn-outline" onClick={() => alert('Tez kunda!')}>Bugungi maqsadlarni ko'rish</button>
                </div>
              </div>
            </div>

            <aside className="col-4 card-goal">
              <p className="hero-subtitle">Bugungi maqsad</p>
              <h2>{dailyQuests.length} ta vazifani yakunlang</h2>

              <div className="goal-box-inner">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Progress</p>
                <div className="goal-val">{dailyQuests.filter(q => q.completed).length} / {dailyQuests.length}</div>
              </div>

              <div className="goal-stat-row">
                <span>Umumiy mukofot</span>
                <span style={{ color: 'var(--warning)', fontWeight: 700 }}>+{dailyQuests.reduce((a, q) => a + q.reward, 0)} XP</span>
              </div>
              <div className="goal-stat-row">
                <span>Olov (Streak) bonusi</span>
                <span style={{ color: 'var(--success)', fontWeight: 700 }}>{stats.streak > 0 ? 'Faol' : 'Qulf'}</span>
              </div>
            </aside>

            {/* ROW 2: Compact Stat Cards */}
            <div className="col-3 card-kpi">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Uchqun darajasi</p>
              <div className="kpi-val">{tier.name}</div>
            </div>
            
            <div className="col-3 card-kpi">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Jami tajriba</p>
              <div className="kpi-val">{stats.xp} XP</div>
            </div>
            
            <div className="col-3 card-kpi">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sog'liq (Hearts)</p>
              <div className="kpi-val">{stats.hearts}</div>
            </div>
            
            <div className="col-3 card-kpi">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Tugallangan darslar</p>
              <div className="kpi-val">{completedNodes} / {totalModules}</div>
            </div>

            {/* ROW 3: Tasks & Current Course */}
            <section className="col-8 card-tasks">
              <div className="tasks-header">
                <h2>Kunlik vazifalar</h2>
                <button>Barchasini ko'rish</button>
              </div>

              <div>
                {dailyQuests.map((quest) => (
                  <div key={quest.id} className={`task-item ${quest.completed ? 'completed' : ''}`}>
                    <div className="task-item-top">
                      <p>{quest.title}</p>
                      <span className="task-xp-badge">+{quest.reward} XP</span>
                    </div>
                    <div className="progress-track" style={{ height: '8px' }}>
                      <div className="progress-fill fill-blue" style={{ width: `${(quest.progress / quest.amount) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card-course">
                <p className="hero-subtitle">Hozirgi kurs</p>
                <h3>{courseInfo.title}</h3>
                
                <div className="progress-track">
                  <div className="progress-fill fill-blue" style={{ width: `${progressPercent}%` }}></div>
                </div>
                
                <div className="course-stats-row">
                  <span>{completedNodes} / {totalModules} dars tugatildi</span>
                  <span>{progressPercent}%</span>
                </div>
                
                <button className="dash-btn dash-btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={() => onNavigate('map')}>
                  Davom etish
                </button>
              </div>

              <div className="card-streak-dark">
                <p className="label">Streak holati</p>
                <h3>{stats.streak} kunlik olov</h3>
                <p className="desc">Ketma-ket faollikni saqlab qoling va bonus XP oling.</p>
              </div>
            </aside>

          </main>

        </div>
      </div>
    );
}

export default Dashboard;
