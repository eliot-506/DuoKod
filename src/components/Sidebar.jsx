import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useUser } from '../context/UserContext';
import { getStreakTier } from '../utils/streakUtils';

function Sidebar({ currentTab, onNavigate }) {
    const { stats } = useUser();

    const tabs = [
        { id: 'dashboard', icon: <i className="fa-solid fa-house"></i>, label: 'Asosiy', color: '#6366f1' },
        { id: 'map', icon: <i className="fa-solid fa-book-open"></i>, label: "O'rganish", color: '#10B981' },
        { id: 'leaderboard', icon: <i className="fa-solid fa-shield-halved"></i>, label: 'Reyting', color: '#EAB308' },
        { id: 'arena', icon: <i className="fa-solid fa-laptop-code"></i>, label: 'Arena', color: '#8B5CF6' },
        { id: 'duel', icon: <i className="fa-solid fa-bolt"></i>, label: 'Bellashuv', color: '#F97316' },
        { id: 'profile', icon: <i className="fa-solid fa-user"></i>, label: 'Profil', color: '#64748B' },
        ...(stats?.isAdmin ? [{ id: 'admin', icon: <i className="fa-solid fa-crown"></i>, label: 'Admin', color: '#D97706' }] : [])
    ];

    return (
        <aside className="global-sidebar">
            <div className="logo-container">
              <div className="logo-card-glass" onClick={() => onNavigate('dashboard')}>
                  <h1 className="logo-text">DUOKOD</h1>
              </div>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {tabs.map((tab) => {
                        const isActive = currentTab === tab.id;
                        return (
                            <li key={tab.id} className="nav-item-wrapper">
                                <button
                                    className={`sidebar-nav-item ${tab.id} ${isActive ? 'active' : ''}`}
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
                <div className="progress-widget-glass">
                    <div className="progress-header">
                        <span className="progress-title">Bugungi progress</span>
                        <span className="progress-value">1 kun</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: '20%' }}></div>
                    </div>
                    <div className="progress-info">
                        <span className="streak-info">🔥 Streak</span>
                        <span className="xp-info">1 kun</span>
                    </div>
                    <p className="progress-next">Yana 100 XP keyingi darajaga!</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
