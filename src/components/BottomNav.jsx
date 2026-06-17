import './BottomNav.css'

function BottomNav({ currentTab, onTabSwitch }) {
    const items = [
        { id: 'dashboard', icon: 'AS', label: 'Asosiy' },
        { id: 'map', icon: 'OR', label: "O'rganish" },
        { id: 'leaderboard', icon: 'RT', label: 'Reyting' },
        { id: 'arena', icon: 'AR', label: 'Arena' },
        { id: 'duel', icon: 'DL', label: 'Duel' },
        { id: 'premium', icon: 'PRO', label: 'Premium' },
    ];

    return (
        <nav className="bottom-nav">
            <div className="nav-items-container">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabSwitch(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default BottomNav
