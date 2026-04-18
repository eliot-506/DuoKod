import './BottomNav.css'

function BottomNav({ currentTab, onTabSwitch }) {
    return (
        <nav className="bottom-nav">
            <div className="nav-items-container">
                <button
                    className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => onTabSwitch('dashboard')}
                >
                    <span className="nav-icon">🏠</span>
                    <span className="nav-label">Asosiy</span>
                </button>

                <button
                    className={`nav-item ${currentTab === 'map' ? 'active' : ''}`}
                    onClick={() => onTabSwitch('map')}
                >
                    <span className="nav-icon">🗺️</span>
                    <span className="nav-label">O'rganish</span>
                </button>

                <button
                    className={`nav-item ${currentTab === 'leaderboard' ? 'active' : ''}`}
                    onClick={() => onTabSwitch('leaderboard')}
                >
                    <span className="nav-icon">🛡️</span>
                    <span className="nav-label">Reyting</span>
                </button>

                <button
                    className={`nav-item ${currentTab === 'arena' ? 'active' : ''}`}
                    onClick={() => onTabSwitch('arena')}
                >
                    <span className="nav-icon">💻</span>
                    <span className="nav-label">Arena</span>
                </button>

                <button
                    className={`nav-item ${currentTab === 'duel' ? 'active' : ''}`}
                    onClick={() => onTabSwitch('duel')}
                >
                    <span className="nav-icon">⚔️</span>
                    <span className="nav-label">Duel</span>
                </button>

                <button
                    className={`nav-item ${currentTab === 'profile' ? 'active' : ''}`}
                    onClick={() => onTabSwitch('profile')}
                >
                    <span className="nav-icon">👤</span>
                    <span className="nav-label">Profil</span>
                </button>
            </div>
        </nav>
    )
}

export default BottomNav
