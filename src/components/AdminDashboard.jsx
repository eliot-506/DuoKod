import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' yoki 'articles'
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageXp: 0,
    topStreakUser: null,
    leaderboard: [],
    recentUsers: []
  });
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

        // Maqolalarni ham yuklaymiz
        const { data: articlesData, error: artError } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!artError && articlesData) {
            setArticles(articlesData);
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

  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;
    setIsSubmitting(true);
    try {
        const { data, error } = await supabase.from('articles').insert([
            { title: newArticle.title, content: newArticle.content }
        ]).select();
        
        if (error) throw error;
        if (data) {
            setArticles([data[0], ...articles]);
            setNewArticle({ title: '', content: '' });
        }
    } catch (err) {
        alert("Xatolik: " + err.message);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Rostdan ham bu adabiyotni o'chirmoqchimisiz?")) return;
    try {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (error) throw error;
        setArticles(articles.filter(a => a.id !== id));
    } catch (err) {
        alert("O'chirishda xatolik: " + err.message);
    }
  };

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

      <div className="admin-tabs">
        <button className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <i className="fa-solid fa-chart-pie"></i> Statistika & O'quvchilar
        </button>
        <button className={`admin-tab-btn ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>
          <i className="fa-solid fa-book"></i> Adabiyotlar Boshqaruvi
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
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
        </>
      )}

      {activeTab === 'articles' && (
        <div className="admin-articles-section">
            <div className="article-form-card">
                <h3><i className="fa-solid fa-plus-circle"></i> Yangi Adabiyot Qo'shish</h3>
                <form onSubmit={handleAddArticle} className="article-form">
                    <div className="form-group">
                        <label>Sarlavha</label>
                        <input 
                            type="text" 
                            placeholder="Adabiyot nomi (masalan: Python Dasturlash Asoslari)" 
                            value={newArticle.title}
                            onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Maqola matni</label>
                        <textarea 
                            placeholder="Bu yerga maqola/adabiyot matnini kiriting..." 
                            rows="6"
                            value={newArticle.content}
                            onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                            required 
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary submit-article-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Qo'shilmoqda..." : 'Maqolani Saqlash'}
                    </button>
                </form>
            </div>

            <div className="articles-list-container">
                <h3>Barcha Adabiyotlar Tizimi</h3>
                {articles.length === 0 ? (
                    <div className="empty-state">Hali hech qanday adabiyot qo'shilmagan.</div>
                ) : (
                    <div className="articles-grid">
                        {articles.map((article) => (
                            <div key={article.id} className="admin-article-card">
                                <div className="admin-article-header">
                                    <h4>{article.title}</h4>
                                    <button 
                                        className="btn-delete-article" 
                                        onClick={() => handleDeleteArticle(article.id)}
                                        title="O'chirish"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                                <p className="admin-article-preview">
                                    {article.content.substring(0, 150)}...
                                </p>
                                <div className="admin-article-meta">
                                    <span><i className="fa-solid fa-user-pen"></i> {article.author || 'Admin'}</span>
                                    <span><i className="fa-solid fa-calendar"></i> {new Date(article.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
