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
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('duokod_theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('duokod_theme', 'neon');
        }
    }, [isLight]);

    // Apply saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem('duokod_theme');
        if (saved === 'light') {
            setIsLight(true);
            document.body.classList.add('light-mode');
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    const toggleTheme = () => setIsLight(prev => !prev);

    const tabs = [
        { id: 'dashboard', icon: <i className="fa-solid fa-house"></i>, label: 'Asosiy' },
        { id: 'map', icon: <i className="fa-solid fa-book-open"></i>, label: "O'rganish" },
        { id: 'leaderboard', icon: <i className="fa-solid fa-shield-halved"></i>, label: 'Reyting' },
        { id: 'arena', icon: <i className="fa-solid fa-laptop-code"></i>, label: 'Arena' },
        { id: 'duel', icon: <i className="fa-solid fa-bolt"></i>, label: 'Bellashuv' },
        { id: 'profile', icon: <i className="fa-solid fa-user"></i>, label: 'Profil' },
        ...(stats?.isAdmin ? [{ id: 'admin', icon: <i className="fa-solid fa-crown" style={{ color: '#F59E0B' }}></i>, label: 'Admin' }] : [])
    ];

    return (
        <aside className="global-sidebar">
            <div className="sidebar-logo">
                <a href="#" className="logo-box" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
                    <span className="logo-text">DUOKOD</span>
                </a>
            </div>

            <nav aria-label="Asosiy navigatsiya" className="sidebar-nav">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        return (
                            <li key={tab.id}>
                                <button
                                    className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                    aria-current={isActive ? "page" : undefined}
                                    onClick={() => onNavigate(tab.id)}
                                >
                                    <span className="nav-icon">{tab.icon}</span>
                                    <span className="nav-label">{tab.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-theme-toggle">
                    <div className="theme-toggle-text">
                        <p className="theme-toggle-title">{isLight ? 'Kunduzgi' : 'Tungi'}</p>
                        <p className="theme-toggle-subtitle">{isLight ? 'Yorug‘ ko‘rinish' : 'Qorong‘i ko‘rinish'}</p>
                    </div>
                    <button 
                        id="themeToggle"
                        type="button"
                        aria-label="Ko‘rinishni almashtirish"
                        className={`sidebar-theme-switch ${isLight ? 'is-light' : 'is-dark'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleTheme();
                        }}
                    >
                        <span className="slider-knob"></span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
