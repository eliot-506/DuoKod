import './TopBar.css'
import { useUser } from '../context/UserContext'
import { getDailyGoalProgress } from '../utils/progressUtils'

function TopBar({ onNavigate }) {
    const { stats, toggleAdminMode } = useUser()
    const dailyGoalXp = 50
    const dailyProgress = getDailyGoalProgress(stats?.dailyXp, dailyGoalXp)
    const remainingXp = dailyProgress.remainingXp
    const missionPercent = dailyProgress.percent

    return (
        <header className="top-card-container">
            <div className="top-unified-card-glass">
                <div className="top-left-placeholder"></div>

                <div className="top-mission-section">
                    <span className="mission-label-mini pulse-text">BUGUNGI MAQSAD: <strong style={{ color: '#6366f1' }}>{remainingXp} XP QOLDI</strong></span>
                    <div className="mission-pb-mini-container">
                        <div className="mission-pb-mini-fill" style={{ width: `${missionPercent}%` }}></div>
                    </div>
                </div>

                <div className="top-stats-row">
                    {stats?.isSuperAdmin && (
                        <button
                            type="button"
                            className={`admin-mode-toggle ${stats.adminModeEnabled ? 'is-active' : ''}`}
                            onClick={() => {
                                if (stats.adminModeEnabled) onNavigate?.('dashboard');
                                toggleAdminMode();
                            }}
                            aria-pressed={stats.adminModeEnabled}
                            title={stats.adminModeEnabled ? 'Oddiy foydalanuvchi rejimiga o‘tish' : 'SuperAdmin rejimini yoqish'}
                        >
                            <i className={`fa-solid ${stats.adminModeEnabled ? 'fa-crown' : 'fa-user'}`}></i>
                            <span>{stats.adminModeEnabled ? 'Admin' : 'User'}</span>
                        </button>
                    )}
                    <div className="top-stat-item">
                        <span className="stat-icon orange"><i className="fa-solid fa-fire"></i></span>
                        <span className="stat-val">{stats?.streak || 0}</span>
                    </div>
                    <div className="top-stat-item">
                        <span className="stat-icon gold"><i className="fa-solid fa-sun"></i></span>
                        <span className="stat-val">{stats?.xp || 0}</span>
                    </div>
                    <div className="top-stat-item">
                        <span className="stat-icon blue"><i className="fa-solid fa-shield-halved"></i></span>
                        <span className="stat-val">{stats?.hearts || 50}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopBar
