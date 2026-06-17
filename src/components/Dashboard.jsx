import './Dashboard.css';
import { useUser } from '../context/UserContext';
import { COURSES } from '../data/lessons';
import AnimatedRobot from './AnimatedRobot';

function Dashboard({ onNavigate }) {
    const { stats, currentLevel, currentLevelXp, nextLevelXp } = useUser();
    const currentCourse = stats.currentCourse || 'python';
    const courseProgress = stats.courses?.[currentCourse] || { completedNodes: [] };
    const totalLessons = COURSES[currentCourse]?.data?.length || 0;
    const completedLessons = courseProgress.completedNodes?.filter(nodeId => nodeId < 100).length || 0;
    const lessonProgressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const dailyGoalXp = 50;
    const todayXp = Math.min(stats.xp || 0, dailyGoalXp);
    const remainingDailyXp = Math.max(0, dailyGoalXp - todayXp);
    const levelProgressPercent = Math.round(((currentLevelXp || 0) / (nextLevelXp || 100)) * 100);
    const streakDays = stats.streak || 0;
    const activeCourse = COURSES[currentCourse];
    const nextLessonId = courseProgress.unlockedNodes?.find(nodeId => !courseProgress.completedNodes?.includes(nodeId)) || 1;
    const nextLesson = activeCourse?.data?.find(lesson => lesson.id === nextLessonId) || activeCourse?.data?.[0];
    const completedPercentLabel = `${lessonProgressPercent}%`;

    return (
      <div className="dash-wrapper">
        <div className="dash-container">
          
          <div className="dash-top-section">
            {/* HERO CARD */}
            <div className="hero-card-premium">
              <div className="hero-text-content">
                <span className="hero-welcome">XUSH KELIBSIZ</span>
                <h1 className="hero-main-title">
                  {stats.username || 'Muhammad Matchonov'}, bugun yangi marralarni zabt etamizmi?
                </h1>
                <div className="hero-bg-blobs">
                    <div className="hero-blob b1"></div>
                    <div className="hero-blob b2"></div>
                </div>
                <div className="hero-stats-row">
                  <span>{currentLevel}-daraja Dasturchi</span>
                  <span>{currentLevelXp} / {nextLevelXp} Tajriba</span>
                </div>
                <div className="hero-pb-container">
                  <div className="hero-pb-fill" style={{ width: `${levelProgressPercent}%` }}></div>
                </div>
                <div className="hero-actions">
                  <button className="btn-hero-primary" onClick={() => onNavigate('map')}>Darsni davom ettirish</button>
                  <button className="btn-hero-glass" onClick={() => onNavigate('map')}>Bugungi maqsadlarni ko'rish</button>
                </div>
              </div>

              <div className="hero-mascot-container">
                <div className="hero-mascot-card">
                  <AnimatedRobot state="happy" />
                </div>
              </div>
            </div>

            {/* GOAL CARD */}
            <div className="goal-card-glass">
              <h3 className="goal-card-title">BUGUNGI MAQSAD</h3>
              <div className="goal-circle-container">
                <div className="goal-circle-progress">
                  <div className="goal-circle-inner">
                    <span className="goal-num">{todayXp}</span>
                    <span className="goal-sub">/ {dailyGoalXp} XP</span>
                  </div>
                </div>
              </div>
              <div className="goal-text-footer">
                <p><strong>{remainingDailyXp > 0 ? `Yana ${remainingDailyXp} Tajriba kerak` : 'Bugungi maqsad bajarildi'}</strong></p>
                <p className="goal-hint">Bugungi normani bajarish uchun darslarni davom ettiring.</p>
              </div>
              <button className="btn-goal-start" onClick={() => onNavigate('map')}>Mashqni boshlash</button>
            </div>
          </div>

          <section className="learning-command-panel" aria-label="Davom ettirish paneli">
            <div className="command-main">
              <div className="command-eyebrow">Joriy kurs</div>
              <h2>{activeCourse?.title || 'Python Asoslari'}</h2>
              <p>{nextLesson?.title || 'Keyingi dars'} darsidan davom eting va bugungi maqsadga yaqinlashing.</p>
              <div className="command-progress">
                <div className="command-progress-top">
                  <span>Kurs progressi</span>
                  <strong>{completedPercentLabel}</strong>
                </div>
                <div className="command-progress-track">
                  <div className="command-progress-fill" style={{ width: completedPercentLabel }}></div>
                </div>
              </div>
            </div>

            <div className="next-lesson-tile">
              <span className="tile-label">Keyingi dars</span>
              <h3>{nextLesson?.title || 'Darsni boshlash'}</h3>
              <p>{nextLesson?.desc || 'Nazariya va amaliy savollar orqali XP yigʻing.'}</p>
              <button className="tile-primary-btn" onClick={() => onNavigate('map')}>Darsga o'tish</button>
            </div>

            <div className="quick-actions-rail">
              <button className="quick-action-btn arena-action" onClick={() => onNavigate('arena')}>
                <i className="fa-solid fa-terminal"></i>
                <span>Kod yozish</span>
              </button>
              <button className="quick-action-btn library-action" onClick={() => onNavigate('library')}>
                <i className="fa-solid fa-book-open-reader"></i>
                <span>Kutubxona</span>
              </button>
            </div>
          </section>

          <div className="dash-bottom-grid">
            <div className="kpi-card-glass streak-card">
              <div className="kpi-icon-box orange"><i className="fa-solid fa-fire"></i></div>
              <span className="kpi-label">KUNLIK DAVOMIYLIK</span>
              <p className="kpi-desc">Faol holat. Bugun kamida bitta topshiriqni bajaring va chiroqni o'chirmang.</p>
              <div className="kpi-footer">
                <span className="kpi-status">{streakDays}/7 kun <div className={`dot-streak ${streakDays > 0 ? 'active' : ''}`}></div></span>
                <span className="kpi-link">Batafsil</span>
              </div>
            </div>

            <div className="kpi-card-glass xp-card">
              <div className="kpi-icon-box gold"><i className="fa-solid fa-sun"></i></div>
              <span className="kpi-label">JAMI TAJRIBA</span>
              <div className="kpi-main-val">
                <span className="val-num">{stats?.xp || 0}</span>
                <span className="val-sub">{currentLevel}-daraja</span>
              </div>
            </div>

            <div className="kpi-card-glass hearts-card">
              <div className="kpi-icon-box blue"><i className="fa-solid fa-shield"></i></div>
              <span className="kpi-label">IMKON (QALQON)</span>
              <div className="kpi-main-val">
                <span className="val-num">{stats?.hearts || 50}</span>
                <span className="val-sub">Himoya</span>
              </div>
            </div>

            <div className="kpi-card-glass lessons-card">
              <div className="kpi-icon-box green"><i className="fa-solid fa-book"></i></div>
              <span className="kpi-label">TUGALLANGAN DARSLAR</span>
              <div className="kpi-progress-row">
                 <div className="kpi-pb-mini">
                    <div className="kpi-pb-fill" style={{ width: `${lessonProgressPercent}%` }}></div>
                 </div>
                 <span className="kpi-pb-text">{completedLessons} / {totalLessons}</span>
              </div>
            </div>
          </div>



        </div>
      </div>
    );
}

export default Dashboard;
