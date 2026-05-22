import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';
import './Auth.css';

function Auth({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser } = useUser();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.includes('error=')) {
            const urlParams = new URLSearchParams(hash.substring(1));
            const errorDesc = urlParams.get('error_description');
            setError(`Google dan xatolik keldi: ${errorDesc}`);
        }

        supabase.auth.getSession().then(({ data: { session }, error: sessionErr }) => {
            if (sessionErr) {
                setError(`Sessiya xatosi: ${sessionErr.message}`);
                return;
            }
            if (session?.user) {
                const user = session.user;
                const uname = user.user_metadata?.full_name || user.email?.split('@')[0];
                loginUser(uname, user.email, user.id);
                if (onLoginSuccess) onLoginSuccess();
            }
        });
    }, []);

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password || (!isLogin && !username)) {
            setError("Barcha maydonlarni to'ldiring!");
            return;
        }
        setLoading(true);
        try {
            if (isLogin) {
                const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
                if (err) throw err;
                const user = data.user;
                const uname = user.user_metadata?.username || user.email.split('@')[0];
                loginUser(uname, user.email, user.id);
                if (onLoginSuccess) onLoginSuccess();
            } else {
                const { data, error: err } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { username, full_name: username } }
                });
                if (err) throw err;
                if (data.user) {
                    await supabase.from('profiles').upsert({
                        id: data.user.id,
                        username,
                    });
                    loginUser(username, email, data.user.id);
                    if (onLoginSuccess) onLoginSuccess();
                } else {
                    setError("Email pochtangizni tasdiqlang va qayta kiring!");
                }
            }
        } catch (err) {
            setError(err.message || "Xatolik yuz berdi!");
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error: err } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin }
        });
        if (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo-badge">
                        <i className="fa-solid fa-code" style={{ fontSize: '28px', color: '#4F46E5' }}></i>
                    </div>
                    <h2>{isLogin ? 'Xush kelibsiz' : 'Yangi akkaunt'}</h2>
                    <p>{isLogin ? "Platformaga kirish uchun emailingiz va parolingizni kiriting" : "Dasturlash sirlarini biz bilan o'rganing"}</p>
                </div>

                {error && <div className="auth-error">⚠️ {error}</div>}

                <form className="auth-form" onSubmit={handleEmailAuth}>
                    {!isLogin && (
                        <div className="auth-input-group">
                            <label>Foydalanuvchi nomi</label>
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="coder_uzb"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="auth-input-group">
                        <label>Email manzil</label>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="auth-input-group">
                        <label>Parol</label>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="auth-input"
                                placeholder="Parolingizni kiriting"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                                style={{ top: '50%', transform: 'translateY(-50%)', right: '16px' }}
                            >
                                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="auth-actions-group">
                        <button type="submit" className="primary-btn" disabled={loading}>
                            {loading ? '⏳ Kutilmoqda...' : (isLogin ? 'Tizimga kirish' : "Ro'yxatdan o'tish")}
                        </button>
                    </div>

                    <div className="auth-divider">yoki</div>

                    <button type="button" className="secondary-btn" onClick={handleGoogleLogin} disabled={loading}>
                        <i className="fa-brands fa-google"></i> Google orqali {isLogin ? 'kirish' : "ro'yxatdan o'tish"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>{isLogin ? "Akkauntingiz yo'qmi?" : "Akkauntingiz bormi?"}</span>
                    <span className="auth-switch" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Auth;
