import { useState, useEffect } from 'react';
import './Dashboard.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';
import AnimatedRobot from './AnimatedRobot';

function Dashboard({ onNavigate }) {
    const { stats, currentLevel, currentLevelXp, nextLevelXp } = useUser();
    const tier = getStreakTier(stats?.streak || 0);

    const dailyQuests = [
        { id: 1, title: 'Bitta HTML darsini tugating', amount: 1, progress: 0, reward: 15, completed: false },
        { id: 2, title: 'Xatosiz 3ta savolga javob bering', amount: 3, progress: 1, reward: 20, completed: false },
        { id: 3, title: '1 ta quiz yakunlang', amount: 1, progress: 0, reward: 10, completed: false }
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
            <div className="col-8 card-hero dashboard-card relative-container">
              <div className="hero-mascot-wrapper">
                <AnimatedRobot state="happy" />
              </div>

              <div className="hero-content">
                <div className="hero-reveal hero-reveal-delay-1">
                  <p className="hero-subtitle">Xush kelibsiz</p>
                  <h1>{stats.username || 'Muhammad Matchonov'}, bugun yangi marralarni zabt etamizmi?</h1>
                </div>

                <div className="hero-reveal hero-reveal-delay-2">
                  <div className="hero-level-row">
                    <span className="lvl-name">{currentLevel}-daraja Dasturchi</span>
                    <span className="lvl-xp">{currentLevelXp} / {nextLevelXp} Tajriba</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill fill-emerald" style={{ width: `${completedLevelPercent}%` }}></div>
                  </div>
                  <div className="hero-actions hero-reveal hero-reveal-delay-3">
                    <button className="dash-btn dash-btn-primary" onClick={() => onNavigate('map')}>Darsni davom ettirish</button>
                    <button className="dash-btn dash-btn-outline" onClick={() => alert('Tez kunda!')}>Bugungi maqsadlarni ko'rish</button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="col-4 card-goal dashboard-card">
              <p className="hero-subtitle">Bugungi maqsad</p>
              <h2>{dailyQuests.length} ta vazifani yakunlang</h2>

              <ul className="goal-list">
                {dailyQuests.map(q => (
                  <li key={q.id}>
                    <label className="goal-checkbox-label">
                      <input type="checkbox" className="goal-checkbox" checked={q.completed} readOnly />
                      <span className="goal-title">{q.title}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="goal-info-group">
                <div className="goal-reward">
                  <span>🎯 Umumiy mukofot</span>
                  <strong>+25 Tajriba</strong>
                </div>
                <div className="goal-bonus">
                  <span>Davomiylik bonusi: Faol</span>
                </div>
              </div>
            </aside>

            {/* ROW 2: Compact Stat Cards */}
            <div className="col-3 card-kpi dashboard-card">
              <p>Davomiylik darajasi</p>
              <div className="kpi-content">
                <div className="kpi-val">{tier.name || 'Uchqun'}</div>
              </div>
            </div>
            
            <div className="col-3 card-kpi dashboard-card">
              <p>Jami tajriba</p>
              <div className="kpi-content">
                <div className="kpi-val">{stats.xp} Tajriba</div>
                <div className="kpi-trend">+35 bu hafta</div>
              </div>
            </div>
            
            <div className="col-3 card-kpi dashboard-card">
              <p>Sog'liq (Imkon)</p>
              <div className="kpi-content">
                <div className="kpi-val">{stats.hearts}</div>
              </div>
            </div>
            
            <div className="col-3 card-kpi dashboard-card">
              <p>Tugallangan darslar</p>
              <div className="kpi-content">
                <div className="kpi-val">{completedNodes} / {totalModules}</div>
              </div>
            </div>

            {/* ROW 3: Tasks & Current Course */}
            <section className="col-8 card-tasks dashboard-card" style={{ alignSelf: 'start' }}>
              <div className="tasks-header">
                <h2>Kunlik vazifalar</h2>
                <button>Barchasini ko'rish</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dailyQuests.map((quest) => (
                  <div key={quest.id} className={`task-item ${quest.completed ? 'completed' : ''}`} style={{ marginBottom: 0 }}>
                    <div className="task-item-top" style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                      <input type="checkbox" checked={quest.completed} readOnly className="goal-checkbox" style={{ marginRight: '16px', width: '22px', height: '22px', cursor: 'pointer', accentColor: 'var(--primary)', flexShrink: 0 }} />
                      <p style={{ flex: 1, fontSize: '0.95rem', margin: 0, fontWeight: 600 }}>{quest.title}</p>
                      <span className="task-xp-badge" style={{ minWidth: '95px', textAlign: 'center', whiteSpace: 'nowrap' }}>+{quest.reward} Tajriba</span>
                    </div>
                    <div className="progress-track" style={{ height: '6px', marginTop: '14px', marginBottom: '2px' }}>
                      <div className="progress-fill fill-blue" style={{ width: `${(quest.progress / quest.amount) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card-course dashboard-card">
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

              <div className="card-streak-light dashboard-card" style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xl)', border: 'var(--border-subtle)', flex: 1 }}>
                <p className="hero-subtitle">Davomiylik</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-dark)' }}>{stats.streak} kun</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>Ertaga ham kiring va bonus oling</p>
                
                <button className="dash-btn dash-btn-primary" style={{ width: '100%', padding: '10px' }}>Belgini ko'rish</button>
              </div>
            </aside>

          </main>

        </div>
      </div>
    );
}

export default Dashboard;
