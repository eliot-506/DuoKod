import './TopBar.css'
import { useUser } from '../context/UserContext'
import { getStreakTier } from '../utils/streakUtils'

function TopBar({ onLogoClick, onNavigate }) {
    const { stats } = useUser()

    return (
        <header className="top-card-container">
            <div className="top-unified-card-glass">
                <div className="top-left-placeholder"></div>

                <div className="top-mission-section">
                    <span className="mission-label-mini pulse-text">BUGUNGI MAQSAD: <strong style={{ color: '#6366f1' }}>50 XP QOLDI</strong></span>
                    <div className="mission-pb-mini-container">
                        <div className="mission-pb-mini-fill" style={{ width: '40%' }}></div>
                    </div>
                </div>

                <div className="top-stats-row">
                    <div className="top-stat-item">
                        <span className="stat-icon orange"><i className="fa-solid fa-fire"></i></span>
                        <span className="stat-val">{stats?.streak || 1}</span>
                    </div>
                    <div className="top-stat-item">
                        <span className="stat-icon gold"><i className="fa-solid fa-sun"></i></span>
                        <span className="stat-val">{stats?.xp || 700}</span>
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
