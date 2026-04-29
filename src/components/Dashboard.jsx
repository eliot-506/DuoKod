import { useState, useEffect } from 'react';
import './Dashboard.css';
import './LearningTab.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';
import AnimatedRobot from './AnimatedRobot';
import { COURSES } from '../data/lessons';
function Dashboard({ onNavigate }) {
    const { stats, currentLevel, currentLevelXp, nextLevelXp, switchCourse } = useUser();
    const tier = getStreakTier(stats?.streak || 0);
    const isAdmin = stats?.isAdmin || stats?.isSuperAdmin;

    const [dailyQuests, setDailyQuests] = useState([
        { id: 1, title: "Bugungi adabiyotdan 1 bo'lim o'qing", completed: true },
        { id: 2, title: "1 ta darsni yakunlang", completed: false },
        { id: 3, title: "Natijangizni do'stlaringiz bilan ulashing", completed: true }
    ]);

    const toggleQuest = (id) => {
        setDailyQuests(quests => quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
    };

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

    // Barcha kurslar bo'yicha umumiy bitirgan nodelar soni (Yangi foydalanuvchini aniqlash)
    const totalCompletedAcrossAll = Object.values(stats?.courses || {}).reduce((acc, course) => acc + (course.completedNodes?.length || 0), 0);
    const isNewUser = totalCompletedAcrossAll === 0;
    const COURSE_KEYS = ['html', 'css', 'js', 'python'];

    // Agar o'quvchi yangi bo'lsa (yoki birinchi marta kirdi), unga avval kurs tanlatamiz
    if (isNewUser) {
        return (
            <div className="dash-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '60px 24px' }}>
                <div className="header-title text-center" style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', fontWeight: '800' }}>Siz nima o'rganmoqchisiz?</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>O'zingiz qiziqqan yo'nalishni tanlang</p>
                </div>
                <div className="courses-grid" style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                    {COURSE_KEYS.map(key => {
                        const c = COURSES[key];
                        if (!c) return null;
                        const isLocked = !isAdmin && key !== 'python'; // Admins have all, others only Python
                        return (
                            <div
                                key={key}
                                className={`course-card ${isLocked ? 'course-card-locked' : ''}`}
                                style={{ '--card-color': isLocked ? '#444' : (c.color || '#fff') }}
                                onClick={() => {
                                    if (!isLocked) {
                                        switchCourse(key);
                                        onNavigate('map'); // Avtomatik map sahifasiga o'tkazish
                                    }
                                }}
                            >
                                <div className="course-icon" style={{ opacity: isLocked ? 0.4 : 1 }}>{c.title ? c.title.charAt(0) : 'C'}</div>
                                <h3 style={{ opacity: isLocked ? 0.5 : 1 }}>{c.title || 'Kurs'}</h3>
                                {isLocked ? (
                                    <div className="course-locked-badge">🔒 Tez kunda</div>
                                ) : (
                                    <button className="start-btn" style={{ backgroundColor: c.color || '#fff', color: '#000' }}>Tanlash</button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

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
                  <span className="goal-circle-num">20</span>
                  <span className="goal-circle-sub">/ 50 XP</span>
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

            {/* ROW 2: Compact Streak Card (unchanged) */}
            <div className="col-3 card-kpi dashboard-card" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)', border: '1px solid #BFDBFE', overflow: 'hidden', padding: '22px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="kpi-icon kpi-icon-blue" style={{ marginBottom: '8px' }}>🔥</div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '0.78rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Uchqundan eslatma</h4>
                  <span style={{ fontSize: '0.68rem', padding: '3px 10px', background: '#DCFCE7', color: '#16A34A', borderRadius: '50px', fontWeight: 700 }}>Faol holat</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.5', margin: '14px 0', fontWeight: 500 }}>
                Bugun kamida bitta topshiriqni bajaring va streak'ni davom ettiring.
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1D4ED8' }}>{stats.streak}/7 kun</span>
                  <div className="progress-track" style={{ width: '44px', height: '6px', margin: 0 }}>
                    <div className="progress-fill fill-blue" style={{ width: `${Math.min((stats.streak / 7) * 100, 100)}%` }}></div>
                  </div>
                </div>
                <a href="#" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}>Batafsil</a>
              </div>
            </div>

            {/* XP — Green */}
            <div className="col-3 card-kpi kpi-xp dashboard-card">
              <div className="kpi-row">
                <p className="kpi-label">Jami tajriba</p>
                <div className="kpi-icon kpi-icon-green">⚡</div>
              </div>
              <div>
                <div className="kpi-val" style={{ color: '#15803D' }}>{stats.xp}</div>
                <span className="kpi-trend">+35 bu hafta</span>
              </div>
            </div>

            {/* Hearts — Yellow */}
            <div className="col-3 card-kpi kpi-hearts dashboard-card">
              <div className="kpi-row">
                <p className="kpi-label">Sog'liq (Imkon)</p>
                <div className="kpi-icon kpi-icon-yellow">❤️</div>
              </div>
              <div>
                <div className="kpi-val" style={{ color: '#B45309' }}>{stats.hearts}</div>
                <span className="kpi-trend kpi-trend-yellow">Imkonlar</span>
              </div>
            </div>

            {/* Lessons — Neutral white */}
            <div className="col-3 card-kpi kpi-lessons dashboard-card">
              <div className="kpi-row">
                <p className="kpi-label">Tugallangan darslar</p>
                <div className="kpi-icon kpi-icon-blue">📚</div>
              </div>
              <div>
                <div className="kpi-val" style={{ color: '#1E3A5F' }}>{completedNodes} <span style={{ fontSize: '1.1rem', color: '#94A3B8' }}>/ {totalModules}</span></div>
                <div className="progress-track kpi-mini-bar" style={{ height: '6px' }}>
                  <div className="progress-fill fill-blue" style={{ width: `${Math.round((completedNodes / (totalModules || 1)) * 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* ROW 3: Tasks & Current Course */}
            <section className="col-8 premium-tasks-section dashboard-card">
              <div className="tasks-header">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>Kunlik vazifalar</h2>
              </div>

              <div className="tasks-list">
                {dailyQuests.map((quest) => (
                  <div 
                    key={quest.id} 
                    className={`premium-task-card ${quest.completed ? 'completed' : 'uncompleted'}`}
                    onClick={() => toggleQuest(quest.id)}
                  >
                    <div className="task-checkbox-wrap">
                      <input 
                        type="checkbox" 
                        checked={quest.completed} 
                        readOnly 
                        className="premium-checkbox" 
                      />
                    </div>
                    <div className="task-content">
                      <p className="task-title">{quest.title}</p>
                    </div>
                    <div className="task-badge-wrap">
                      <span className={`status-badge ${quest.completed ? 'badge-done' : 'badge-pending'}`}>
                        {quest.completed ? 'Bajarildi' : 'Bajarilmadi'}
                      </span>
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
