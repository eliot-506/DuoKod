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

            <aside className="col-4 card-goal dashboard-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 24px' }}>
              <p className="hero-subtitle" style={{ alignSelf: 'flex-start', margin: 0 }}>Bugungi maqsad</p>
              
              <div style={{ marginTop: '24px', position: 'relative', width: '140px', height: '140px' }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    strokeDasharray="40, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1 }}>20</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '4px' }}>/ 50 XP</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '24px 0 8px 0', color: 'var(--text-dark)' }}>Yana 30 Tajriba kerak</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5, padding: '0 10px' }}>
                Bugungi normani bajarish uchun darslarni davom ettiring.
              </p>

              <button className="dash-btn dash-btn-primary" style={{ width: '100%', padding: '12px' }} onClick={() => onNavigate('map')}>
                Mashqni boshlash
              </button>
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
            <section className="col-8 card-tasks dashboard-card" style={{ alignSelf: 'start', paddingBottom: '20px' }}>
              <div className="tasks-header">
                <h2>Kunlik vazifalar</h2>
                <button>Barchasini ko'rish</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dailyQuests.map((quest) => (
                  <label key={quest.id} className={`task-item ${quest.completed ? 'completed' : ''}`} style={{ marginBottom: 0, padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ paddingTop: '2px' }}>
                      <input type="checkbox" checked={quest.completed} readOnly className="goal-checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)', margin: 0, display: 'block', border: '2px solid #CBD5E1' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.95rem', margin: 0, fontWeight: 600, color: 'var(--text-dark)' }}>{quest.title}</p>
                        <span style={{ minWidth: '85px', textAlign: 'center', whiteSpace: 'nowrap', padding: '4px 10px', fontSize: '0.75rem', background: 'var(--warning-light)', color: '#B45309', borderRadius: '50px', fontWeight: 700 }}>+{quest.reward} Tajriba</span>
                      </div>
                      <div className="progress-track" style={{ height: '6px', marginTop: '12px', background: '#E2E8F0' }}>
                        <div className="progress-fill fill-blue" style={{ width: `${(quest.progress / quest.amount) * 100}%` }}></div>
                      </div>
                    </div>
                  </label>
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

              <div className="card-weekly-compact dashboard-card" style={{ background: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-xl)', border: 'var(--border-subtle)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p className="hero-subtitle">Haftalik progress</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>4/7</div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)' }}>Faol kun</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>3 ta</div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)' }}>Dars tugatildi</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--warning-light)', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>2 ta</div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)' }}>Quiz</span>
                  </div>
                </div>

                <button className="dash-btn dash-btn-outline" style={{ width: '100%', padding: '10px', borderColor: '#CBD5E1', fontWeight: 700, marginTop: '24px' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-light)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = 'var(--text-base)'; e.currentTarget.style.background = 'white'; }}>
                  Batafsil ko'rish
                </button>
              </div>
            </aside>

          </main>

        </div>
      </div>
    );
}

export default Dashboard;
