import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';

function Sidebar({ currentTab, onNavigate }) {
    const { stats } = useUser();
    const tier = getStreakTier(stats?.streak || 0);

    const [isLight, setIsLight] = useState(() => document.body.classList.contains('light-mode'));

    useEffect(() => {
        if (isLight) {
            document.body.classList.add('light-mode');
            localStorage.setItem('duokod_theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('duokod_theme', 'neon');
        }
    }, [isLight]);

    // Apply saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem('duokod_theme');
        if (saved === 'light') {
            setIsLight(true);
            document.body.classList.add('light-mode');
        }
    }, []);

    const toggleTheme = () => setIsLight(prev => !prev);

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

            <div className="sidebar-theme-toggle" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--surface, #f8fafc)', borderRadius: '16px', border: '1px solid var(--border-color, #e2e8f0)' }}>
                <span style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark, #172554)' }}>{isLight ? 'Kunduzgi ☀️' : 'Tungi rejim 🌙'}</span>
                <label className="sidebar-theme-switch">
                    <input
                        type="checkbox"
                        checked={isLight}
                        onChange={toggleTheme}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </aside>
    );
}

export default Sidebar;
