import { useState, useEffect } from 'react';
import './Leaderboard.css';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

function Leaderboard() {
    const { stats } = useUser();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('username, xp, avatar, streak')
                    .order('xp', { ascending: false })
                    .limit(10);

                if (error || !data || data.length === 0) {
                    throw new Error('Supabase data yo\'q');
                }
                setLeaders(data);
            } catch {
                // Fallback: hozirgi foydalanuvchi bilan mock ma'lumot
                setLeaders([
                    { username: stats.username || 'Siz', xp: stats.xp, avatar: stats.currentAvatar, isCurrentUser: true },
                    { username: 'Sardor_Dev', xp: 2540, avatar: 'default' },
                    { username: 'Malika_Code', xp: 2100, avatar: 'default' },
                    { username: 'JavahirUZ', xp: 1850, avatar: 'default' },
                ].sort((a, b) => b.xp - a.xp));
            }
            setLoading(false);
        };
        fetchLeaders();
    }, []);

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h2>🏆 Reyting (Oylik peshqadamlar)</h2>
                <p>Ko'proq dars yakunlang va yuqoriga ko'tariling!</p>
            </div>
            {loading ? (
                <div style={{textAlign: 'center', padding: '40px', color: 'var(--accent)'}}>⏳ Yuklanmoqda...</div>
            ) : (
                <div className="leaderboard-list">
                    {leaders.map((user, index) => {
                        const isMe = user.username === stats.username || user.isCurrentUser;
                        return (
                            <div key={index} className={`leaderboard-item ${isMe ? 'is-current-user' : ''}`}>
                                <div className="rank">
                                    {index + 1}
                                    {index < 3 && <span className="rank-medal">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>}
                                </div>
                                <div className="user-info">
                                    <span className="user-avatar">
                                        <img
                                            src={`/assets/mascots/mascot_${user.avatar || 'default'}.png`}
                                            alt={user.username}
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </span>
                                    <span className="user-name">{user.username || 'Noma\'lum'} {isMe ? '(Siz)' : ''}</span>
                                </div>
                                <div className="user-xp">{user.xp} XP</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
