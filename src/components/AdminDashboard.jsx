import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageXp: 0,
    topStreakUser: null,
    leaderboard: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const { data: profiles, error: queryError } = await supabase
          .from('profiles')
          .select('id, username, xp, streak, role, created_at')
          .order('xp', { ascending: false });

        if (queryError) throw queryError;

        if (profiles) {
          const totalUsers = profiles.length;
          const totalXp = profiles.reduce((sum, u) => sum + (u.xp || 0), 0);
          const averageXp = totalUsers > 0 ? Math.round(totalXp / totalUsers) : 0;

          const topStreakUser = [...profiles].sort((a, b) => (b.streak || 0) - (a.streak || 0))[0] || null;
          
          const leaderboard = [...profiles]
            .sort((a, b) => (b.xp || 0) - (a.xp || 0))
            .slice(0, 50);

          setStats({
            totalUsers,
            averageXp,
            topStreakUser,
            leaderboard,
            recentUsers: []
          });
        }
      } catch (err) {
        console.error("Admin dashboard load error:", err.message);
        setError("Foydalanuvchilarni yuklashda xatolik yuzaga keldi. RLS Policy ruxsat bermagan bo'lishi mumkin.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="spinner"></div>
        <p>Baza bilan ulanilmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error-container">
        <h2>❌ Xatolik</h2>
        <p>{error}</p>
        <p className="hint">Supabase da berilgan "RLS (Row Level Security)" qoidalari yurgazilganiga ishonch hosil qiling.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1><i className="fa-solid fa-crown" style={{ color: '#FFD700', marginRight: '15px' }}></i>Admin Dashboard</h1>
        <p>Tizimning umumiy nazorat va tahliliy markazi</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon users"><i className="fa-solid fa-users"></i></div>
          <div className="stat-info">
            <p className="stat-label">Jami Tizim Foydalanuvchilari</p>
            <h2 className="stat-number">{stats.totalUsers}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon average"><i className="fa-solid fa-star"></i></div>
          <div className="stat-info">
            <p className="stat-label">O'rtacha XP (Sifat)</p>
            <h2 className="stat-number">{stats.averageXp}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon fire"><i className="fa-solid fa-fire"></i></div>
          <div className="stat-info">
            <p className="stat-label">Eng Oliy Streak Egasi</p>
            <h2 className="stat-number">
              {stats.topStreakUser ? `${stats.topStreakUser.username}` : "Noma'lum"}
            </h2>
            <span className="sub-stat">{stats.topStreakUser?.streak} kun uzluksiz</span>
          </div>
        </div>
      </div>

      <div className="admin-leaderboard-section">
        <div className="section-header">
          <h3>🏆 Tizim Reyting Jadvali (Barcha o'quvchilar)</h3>
        </div>
        
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Rol</th>
                <th>Tizimga qo'shilgan</th>
                <th>XP Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {stats.leaderboard.map((user, index) => (
                <tr key={user.id} className={user.role === 'super_admin' ? 'super-admin-row' : ''}>
                  <td className="rank-col">{index + 1}</td>
                  <td className="username-col">
                    <div className="user-identity">
                        {user.role === 'admin' || user.role === 'super_admin' ? '👑 ' : '👤 '}
                        {user.username || "Noma'lum"}
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge role-${user.role || 'user'}`}>
                      {(user.role || 'user').toUpperCase()}
                    </span>
                  </td>
                  <td className="date-col">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="xp-col">{user.xp || 0} XP</td>
                  <td className="streak-col">🔥 {user.streak || 0}</td>
                </tr>
              ))}
              {stats.leaderboard.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-table">Hech qanday ma'lumot topilmadi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
