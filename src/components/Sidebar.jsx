import React from 'react';
import './Sidebar.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';

function Sidebar({ currentTab, onNavigate }) {
    const { stats } = useUser();
    const tier = getStreakTier(stats?.streak || 0);

    const tabs = [
        { id: 'dashboard', icon: '🏠', label: 'Asosiy' },
        { id: 'map', icon: '📖', label: "O'rganish" },
        { id: 'leaderboard', icon: '🛡️', label: 'Reyting' },
        { id: 'arena', icon: '💻', label: 'Arena' },
        { id: 'duel', icon: '⚔️', label: 'Duel' },
        { id: 'profile', icon: '👤', label: 'Profil' }
    ];

    return (
        <aside className="global-sidebar">
            <div className="sidebar-logo">
                <div className="logo-box">
                    <span className="logo-text">DUOKOD</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {tabs.map((tab) => {
                    const isActive = currentTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => onNavigate(tab.id)}
                        >
                            <span className="nav-icon">{tab.icon}</span>
                            <span className="nav-label">{tab.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="sidebar-footer">
                <p className="footer-title">{tier.name} Dasturchi</p>
                <p className="footer-desc">Bugungi streak’ni davom ettiring.</p>
            </div>
        </aside>
    );
}

export default Sidebar;
