import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useUser } from '../context/UserContext';
import AnimatedRobot from './AnimatedRobot';

function Dashboard({ onNavigate }) {
    const { stats, dailyQuests, toggleQuest, completedNodes, totalModules, currentLevel, currentLevelXp, nextLevelXp, completedLevelPercent } = useUser();
    
    // Course information
    const courseInfo = {
        title: "Frontend Dasturlash (React.js)",
        desc: "Zamonaviy veb-ilovalarni yaratishni o'rganing"
    };

    return (
      <div className="dash-wrapper">
        <div className="dash-container">
          
          <div className="dash-top-section">
            {/* HERO CARD */}
            <div className="hero-card-premium">
              <div className="hero-text-content">
                <span className="hero-welcome">XUSH KELIBSIZ</span>
                <h1 className="hero-main-title">
                  {stats.username || 'Muhammad Matchonov'}, bugun yangi marralarni zabt etamizmi?
                </h1>
                <div className="hero-bg-blobs">
                    <div className="hero-blob b1"></div>
                    <div className="hero-blob b2"></div>
                </div>
                <div className="hero-stats-row">
                  <span>{currentLevel || '8'}-daraja Dasturchi</span>
                  <span>{currentLevelXp || '0'} / {nextLevelXp || '100'} Tajriba</span>
                </div>
                <div className="hero-pb-container">
                  <div className="hero-pb-fill" style={{ width: '20%' }}></div>
                </div>
                <div className="hero-actions">
                  <button className="btn-hero-primary" onClick={() => onNavigate('map')}>Darsni davom ettirish</button>
                  <button className="btn-hero-glass" onClick={() => onNavigate('map')}>Bugungi maqsadlarni ko'rish</button>
                </div>
              </div>

              <div className="hero-mascot-container">
                <div className="hero-mascot-card">
                  <AnimatedRobot state="happy" />
                </div>
              </div>
            </div>

            {/* GOAL CARD */}
            <div className="goal-card-glass">
              <h3 className="goal-card-title">BUGUNGI MAQSAD</h3>
              <div className="goal-circle-container">
                <div className="goal-circle-progress">
                  <div className="goal-circle-inner">
                    <span className="goal-num">20</span>
                    <span className="goal-sub">/ 50 XP</span>
                  </div>
                </div>
              </div>
              <div className="goal-text-footer">
                <p><strong>Yana 30 Tajriba kerak</strong></p>
                <p className="goal-hint">Bugungi normani bajarish uchun darslarni davom ettiring.</p>
              </div>
              <button className="btn-goal-start" onClick={() => onNavigate('map')}>Mashqni boshlash</button>
            </div>
          </div>

          <div className="dash-bottom-grid">
            <div className="kpi-card-glass streak-card">
              <div className="kpi-icon-box orange"><i className="fa-solid fa-fire"></i></div>
              <span className="kpi-label">KUNLIK DAVOMIYLIK</span>
              <p className="kpi-desc">Faol holat. Bugun kamida bitta topshiriqni bajaring va chiroqni o'chirmang.</p>
              <div className="kpi-footer">
                <span className="kpi-status">1/7 kun <div className="dot-streak active"></div></span>
                <span className="kpi-link">Batafsil</span>
              </div>
            </div>

            <div className="kpi-card-glass xp-card">
              <div className="kpi-icon-box gold"><i className="fa-solid fa-sun"></i></div>
              <span className="kpi-label">JAMI TAJRIBA</span>
              <div className="kpi-main-val">
                <span className="val-num">{stats?.xp || 700}</span>
                <span className="val-sub">+35 bu hafta</span>
              </div>
            </div>

            <div className="kpi-card-glass hearts-card">
              <div className="kpi-icon-box blue"><i className="fa-solid fa-shield"></i></div>
              <span className="kpi-label">IMKON (QALQON)</span>
              <div className="kpi-main-val">
                <span className="val-num">{stats?.hearts || 50}</span>
                <span className="val-sub">Himoya</span>
              </div>
            </div>

            <div className="kpi-card-glass lessons-card">
              <div className="kpi-icon-box green"><i className="fa-solid fa-book"></i></div>
              <span className="kpi-label">TUGALLANGAN DARSLAR</span>
              <div className="kpi-progress-row">
                 <div className="kpi-pb-mini">
                    <div className="kpi-pb-fill" style={{ width: '0%' }}></div>
                 </div>
                 <span className="kpi-pb-text">0 / 11</span>
              </div>
            </div>
          </div>



        </div>
      </div>
    );
}

export default Dashboard;
