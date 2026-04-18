import './TopBar.css'
import { useUser } from '../context/UserContext'
import { getStreakTier } from '../utils/streakUtils'

function TopBar({ onLogoClick, onNavigate }) {
    const { stats } = useUser()
    const tier = getStreakTier(stats?.streak || 0);

    return (
        <header className="top-bar">
            <div className="top-bar-logo" onClick={onLogoClick} style={{ cursor: 'pointer' }} title="Kurslarga qaytish">
                <span className="logo-text">DuoKod</span>
            </div>

            <div className="top-bar-stats">
                {stats?.isAdmin && (
                    <button 
                        onClick={() => onNavigate && onNavigate('admin')}
                        className="admin-badge-btn"
                        style={{ background: 'linear-gradient(45deg, #FFD700, #FF8C00)', border: 'none', padding: '6px 12px', borderRadius: '12px', color: '#000', fontWeight: '800', cursor: 'pointer', marginRight: '15px', boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        👑 Admin
                    </button>
                )}
                <div className="stat-item streak-stat" title={`Pog'ona: ${tier.name}`}>
                    <span className="stat-icon" style={{ 
                        filter: `drop-shadow(0 0 ${tier.glow}px ${tier.color})`,
                        transition: 'all 0.5s ease'
                    }}>
                        {tier.icon}
                    </span>
                    <span className="stat-value" style={{ 
                        color: tier.tier > 1 ? tier.color : '', 
                        textShadow: tier.tier > 1 ? `0 0 5px ${tier.color}` : '',
                        transition: 'all 0.5s ease'
                    }}>
                        {stats?.streak || 0}
                    </span>
                </div>

                <div className="stat-item xp-stat" title="XP (Tajriba)">
                    <span className="stat-icon">⚡</span>
                    <span className="stat-value">{stats?.xp || 0}</span>
                </div>

                <div className="stat-item heart-stat" title="Yurakchalar">
                    <span className="stat-icon">❤️</span>
                    <span className="stat-value">{stats?.hearts || 0}</span>
                </div>
            </div>
        </header>
    )
}

export default TopBar
