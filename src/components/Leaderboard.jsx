import { useState, useEffect } from 'react';
import './Leaderboard.css';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

function Leaderboard() {
    const { stats } = useUser();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('monthly');

    const filters = [
        { id: 'weekly', label: 'Haftalik' },
        { id: 'monthly', label: 'Oylik' },
        { id: 'all', label: 'Umumiy' },
    ];

    useEffect(() => {
        const fetchLeaders = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('username, xp, avatar, streak')
                    .order('xp', { ascending: false })
                    .limit(100);

                if (error || !data || data.length === 0) {
                    throw new Error('Supabase data yo\'q');
                }
                setLeaders(data);
            } catch {
                // Fallback: hozirgi foydalanuvchi bilan mock ma'lumot
                setLeaders([
                    { username: 'Sardor_Dev', xp: 2540, avatar: 'default', streak: 12, lessonsCompleted: 247 },
                    { username: 'Malika_Code', xp: 2100, avatar: 'default', streak: 8, lessonsCompleted: 198 },
                    { username: 'JavahirUZ', xp: 1850, avatar: 'default', streak: 5, lessonsCompleted: 172 },
                    { username: stats.username || 'Siz', xp: stats.xp, avatar: stats.currentAvatar, isCurrentUser: true, streak: stats.streak || 0, lessonsCompleted: 45 },
                    { username: 'CoderUz', xp: 1200, avatar: 'default', streak: 3, lessonsCompleted: 110 },
                    { username: 'DevMaster', xp: 980, avatar: 'default', streak: 2, lessonsCompleted: 89 },
                    { username: 'PythonFan', xp: 750, avatar: 'default', streak: 1, lessonsCompleted: 65 },
                ].sort((a, b) => b.xp - a.xp));
            }
            setLoading(false);
        };
        fetchLeaders();
    }, [activeFilter]);

    const getMedalIcon = (index) => {
        if (index === 0) return <span className="lb-medal lb-medal--gold">🥇</span>;
        if (index === 1) return <span className="lb-medal lb-medal--silver">🥈</span>;
        if (index === 2) return <span className="lb-medal lb-medal--bronze">🥉</span>;
        return null;
    };

    const getMetaText = (user) => {
        if (user.lessonsCompleted) return `${user.lessonsCompleted} dars yakunlangan`;
        if (user.streak) return `Ketma-ket ${user.streak} kun`;
        return 'Yangi o\'quvchi';
    };

    const top3 = leaders.slice(0, 3);
    const rest = leaders.slice(3);

    // Reorder for podium: [2nd, 1st, 3rd]
    const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : top3;

    const filterSubtitle = activeFilter === 'monthly'
        ? "Bu oy eng ko'p tajriba to'plagan o'quvchilar"
        : activeFilter === 'weekly'
            ? "Bu hafta eng faol o'quvchilar"
            : "Barcha vaqtlardagi eng yaxshi natijalar";

    return (
        <div className="lb-page">
            {/* 1) Header block */}
            <div className="lb-header">
                <div className="lb-header__left">
                    <h1 className="lb-header__title">
                        {activeFilter === 'monthly' ? 'Oylik' : activeFilter === 'weekly' ? 'Haftalik' : 'Umumiy'} reyting
                    </h1>
                    <p className="lb-header__subtitle">{filterSubtitle}</p>
                </div>
                <div className="lb-header__filters">
                    {filters.map(f => (
                        <button
                            key={f.id}
                            id={`filter-${f.id}`}
                            className={`lb-filter-chip ${activeFilter === f.id ? 'lb-filter-chip--active' : ''}`}
                            onClick={() => setActiveFilter(f.id)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2) Stats row */}
            <div className="lb-stats-row">
                <div className="lb-stat-card">
                    <div className="lb-stat-card__icon lb-stat-card__icon--streak">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                    <span className="lb-stat-card__label">Davomiylik</span>
                    <span className="lb-stat-card__value">{stats?.streak || 0} <small>kun</small></span>
                </div>
                <div className="lb-stat-card">
                    <div className="lb-stat-card__icon lb-stat-card__icon--xp">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                    </div>
                    <span className="lb-stat-card__label">Tajriba</span>
                    <span className="lb-stat-card__value">{stats?.xp || 0} <small>XP</small></span>
                </div>
                <div className="lb-stat-card">
                    <div className="lb-stat-card__icon lb-stat-card__icon--hearts">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <span className="lb-stat-card__label">Imkon</span>
                    <span className="lb-stat-card__value">{stats?.hearts || 0}</span>
                </div>
            </div>

            {loading ? (
                <div className="lb-loading">
                    <div className="lb-loading__spinner"></div>
                    <span>Yuklanmoqda...</span>
                </div>
            ) : (
                <div className="lb-leaderboard-card">
                    {/* 3) Top 3 Podium */}
                    {top3.length >= 3 && (
                        <div className="lb-podium">
                            {podiumOrder.map((user, i) => {
                                const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
                                const isMe = user.username === stats.username || user.isCurrentUser;
                                const podiumClass = actualRank === 1 ? 'lb-podium__card--first'
                                    : actualRank === 2 ? 'lb-podium__card--second'
                                        : 'lb-podium__card--third';
                                return (
                                    <div key={user.username} className={`lb-podium__card ${podiumClass} ${isMe ? 'lb-podium__card--me' : ''}`}>
                                        <div className="lb-podium__rank">{getMedalIcon(actualRank - 1)}</div>
                                        <div className="lb-podium__avatar">
                                            <img
                                                src={`/assets/mascots/mascot_${user.avatar || 'default'}.png`}
                                                alt={user.username}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.classList.add('lb-podium__avatar--fallback');
                                                }}
                                            />
                                            <span className="lb-podium__avatar-fallback">{(user.username || '?')[0].toUpperCase()}</span>
                                        </div>
                                        <span className="lb-podium__name">{user.username}{isMe ? ' (Siz)' : ''}</span>
                                        <span className="lb-podium__meta">{getMetaText(user)}</span>
                                        <div className="lb-xp-badge lb-xp-badge--podium">{user.xp} XP</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* 4) Leaderboard list header */}
                    <div className="lb-list-header">
                        <span className="lb-list-header__rank">#</span>
                        <span className="lb-list-header__user">O'quvchi</span>
                        <span className="lb-list-header__xp">Tajriba</span>
                    </div>

                    {/* 5) Full ranking list */}
                    <div className="lb-list">
                        {rest.map((user, index) => {
                            const rank = index + 4;
                            const isMe = user.username === stats.username || user.isCurrentUser;
                            return (
                                <div key={user.username || index} className={`lb-row ${isMe ? 'lb-row--me' : ''}`}>
                                    <div className="lb-row__rank">
                                        <span className="lb-row__rank-num">{rank}</span>
                                    </div>
                                    <div className="lb-row__avatar">
                                        <img
                                            src={`/assets/mascots/mascot_${user.avatar || 'default'}.png`}
                                            alt={user.username}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.classList.add('lb-row__avatar--fallback');
                                            }}
                                        />
                                        <span className="lb-row__avatar-letter">{(user.username || '?')[0].toUpperCase()}</span>
                                    </div>
                                    <div className="lb-row__info">
                                        <span className="lb-row__name">{user.username || "Noma'lum"}{isMe ? ' (Siz)' : ''}</span>
                                        <span className="lb-row__meta">{getMetaText(user)}</span>
                                    </div>
                                    <div className="lb-xp-badge">{user.xp} XP</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
