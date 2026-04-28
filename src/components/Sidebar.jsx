import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';

function Sidebar({ currentTab, onNavigate }) {
    const { stats } = useUser();
    const tier = getStreakTier(stats?.streak || 0);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const tabs = [
        { id: 'dashboard', icon: '🏠', label: 'Asosiy' },
        { id: 'map', icon: '📖', label: "O'rganish" },
        { id: 'leaderboard', icon: '🛡️', label: 'Reyting' },
        { id: 'arena', icon: '💻', label: 'Arena' },
        { id: 'duel', icon: '⚔️', label: 'Bellashuv' },
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

            <div className="sidebar-theme-toggle" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <span style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>{theme === 'dark' ? 'Tungi rejim' : 'Kunduzgi rejim'}</span>
                <button 
                  onClick={toggleTheme}
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme === 'dark' ? '#F7DF1E' : '#3B82F6', fontSize: '1.2rem', padding: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
