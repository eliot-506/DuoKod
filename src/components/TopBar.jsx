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
                    >
                        👑 <span className="admin-btn-text">Admin</span>
                    </button>
                )}
                <div className="stat-item streak-stat" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title={`Pog'ona: ${tier.name}`}>
                    <span className="stat-icon" style={{ 
                        filter: `drop-shadow(0 0 ${tier.glow}px ${tier.color})`,
                        transition: 'all 0.5s ease',
                        display: 'flex', alignItems: 'center'
                    }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke={tier.color || "currentColor"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Davomiylik</span>
                    <span className="stat-value" style={{ 
                        color: tier.tier > 1 ? tier.color : '', 
                        textShadow: tier.tier > 1 ? `0 0 5px ${tier.color}` : '',
                        transition: 'all 0.5s ease'
                    }}>
                        {stats?.streak || 0}
                    </span>
                </div>

                <div className="stat-item xp-stat" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="XP (Tajriba)">
                    <span className="stat-icon" style={{ display: 'flex', alignItems: 'center', color: '#EAB308' }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Tajriba</span>
                    <span className="stat-value">{stats?.xp || 0}</span>
                </div>

                <div className="stat-item heart-stat" style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Imkon (Hearts)">
                    <span className="stat-icon" style={{ display: 'flex', alignItems: 'center', color: '#10B981' }}>
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Imkon</span>
                    <span className="stat-value">{stats?.hearts || 0}</span>
                </div>
            </div>
        </header>
    )
}

export default TopBar
