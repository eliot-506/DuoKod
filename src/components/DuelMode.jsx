import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './DuelMode.css';
import Mascot from './Mascot';
import AnimatedRobot from './AnimatedRobot';

const MOCK_OPPONENTS = [
    { name: 'Alex_CodeMaster', level: 8, avatar: '👤' },
    { name: 'Shadow_Dev', level: 12, avatar: '🤖' },
    { name: 'JS_Ninja', level: 5, avatar: '🥷' },
    { name: 'Cyber_Girl', level: 9, avatar: '👩‍💻' }
];

const CHALLENGE = {
    title: "Array Yig'indisi",
    difficulty: "Oson",
    prompt: "Berilgan sonlar massividagi (array) barcha elementlar yig'indisini qaytaruvchi `sumArray(arr)` funksiyasini yozing. Massiv faqat butun sonlardan iborat bo'lishi kafolatlanadi.",
    examples: [
        { input: "[1, 2, 3]", output: "6" },
        { input: "[-1, 5, 10]", output: "14" }
    ],
    constraints: [
        "Massiv uzunligi: 0 ≤ n ≤ 1000",
        "Elementlar qiymati: -10^5 ≤ arr[i] ≤ 10^5"
    ],
    initialCode: "function sumArray(arr) {\n  // kodingizni bu yerga yozing\n  \n}",
};

function DuelMode({ onComplete }) {
    const { stats, addXp } = useUser();
    const [phase, setPhase] = useState('matchmaking'); // matchmaking, fighting, result
    const [opponent, setOpponent] = useState(null);
    const [enemyProgress, setEnemyProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
    const [code, setCode] = useState(CHALLENGE.initialCode);
    const [matchResult, setMatchResult] = useState(''); // 'win', 'lose', 'draw'

    const userAvatarSrc = stats.currentAvatar && stats.currentAvatar !== 'default' ? `/assets/mascots/mascot_${stats.currentAvatar}.png` : `/assets/mascots/idle.png`;

    // Matchmaking effect
    useEffect(() => {
        if (phase === 'matchmaking') {
            const timer = setTimeout(() => {
                const randomOpponent = MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
                setOpponent(randomOpponent);
                setPhase('fighting');
            }, 3000); // 3 soniya qidiradi
            return () => clearTimeout(timer);
        }
    }, [phase]);

    // Timer & Enemy Progress effect
    useEffect(() => {
        if (phase === 'fighting') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endGame('lose'); // timeout means lose if not finished
                        return 0;
                    }
                    return prev - 1;
                });

                // Enemy AI: sporadically increases progress
                if (Math.random() > 0.4) {
                    setEnemyProgress(prev => {
                        const newProg = prev + Math.floor(Math.random() * 8) + 2;
                        if (newProg >= 100 && phase === 'fighting') {
                            endGame('lose');
                            return 100;
                        }
                        return newProg;
                    });
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [phase]);

    const endGame = (result) => {
        if (phase !== 'fighting') return;
        setPhase('result');
        setMatchResult(result);
        if (result === 'win') {
            addXp(50); // Winner gets 50 XP!
        } else {
            addXp(10); // Participation
        }
    };

    const handleSubmit = () => {
        // Simple heuristic validation for MVP
        const cleanCode = code.replace(/\s+/g, '');
        if (cleanCode.includes('return') &&
            (cleanCode.includes('+') || cleanCode.includes('reduce'))) {
            endGame('win');
        } else {
            alert('Kodingizda xato bor yoki noto\'g\'ri yechim! Qayta urinib ko\'ring.');
        }
    };

    if (phase === 'matchmaking') {
        return (
            <div className="duel-container matchmaking-wrapper">
                <div className="mm-status-card">
                    {/* Animated radar avatar */}
                    <div className="mm-avatar-area">
                        <div className="mm-radar-ring mm-radar-ring--1"></div>
                        <div className="mm-radar-ring mm-radar-ring--2"></div>
                        <div className="mm-radar-ring mm-radar-ring--3"></div>
                        <div className="mm-avatar-circle">
                            <AnimatedRobot customState="thinking" className="mm-robot" />
                        </div>
                        <div className="mm-scan-line"></div>
                    </div>

                    {/* Title & subtitle */}
                    <h2 className="mm-title">Munosib raqib qidirilmoqda</h2>
                    <p className="mm-subtitle">Darajangiz va faoliyatingizga mos o'yinchi tanlanmoqda</p>

                    {/* Progress bar */}
                    <div className="mm-progress-track">
                        <div className="mm-progress-fill"></div>
                    </div>

                    {/* Info chips */}
                    <div className="mm-info-row">
                        <div className="mm-info-chip">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <span>Taxminan 5–15 soniya</span>
                        </div>
                        <div className="mm-info-chip">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <span>Faol foydalanuvchilar tekshirilmoqda</span>
                        </div>
                    </div>

                    <p className="mm-auto-text">Topilganida avtomatik boshlanadi</p>

                    {/* Cancel action */}
                    <button className="mm-cancel-btn" onClick={() => window.history.back()}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Bekor qilish
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'result') {
        const synthesizedPlayerProgress = matchResult === 'win' ? '100%' : `${Math.min(85, Math.max(15, Math.floor((60 - timeLeft) / 60 * 100)) + 15)}%`;
        
        return (
            <div className="duel-container result-wrapper">
                <h1 className={`result-title new-style ${matchResult}`}>
                    {matchResult === 'win' ? "Ajoyib G'alaba! 🎉" : "Bu safar biroz yetmay qoldi"}
                </h1>
                
                <div className="result-mascot-wrapper">
                    <div className="result-mascot-container">
                        <AnimatedRobot customState={matchResult === 'win' ? 'celebration' : 'sad'} />
                    </div>
                    <p className="result-mascot-text">
                        {matchResult === 'win' ? "+50 XP Olingiz! Siz ajoyib dasturchisiz!" : "Raqib tezroq bo'ldi, lekin keyingi urinishda natijani yaxshilashingiz mumkin."}
                    </p>
                </div>

                <div className="result-stats new-card">
                    <div className="stat-box">
                        <span className="stat-header">Sizning holatingiz</span>
                        <div className="final-avatar result-avatar">
                            <AnimatedRobot customState={matchResult === 'win' ? 'happy' : 'sad'} />
                        </div>
                        <h3 className="stat-value">{synthesizedPlayerProgress}</h3>
                    </div>
                    <div className="vs-badge-decorative">VS</div>
                    <div className="stat-box enemy-stat">
                        <span className="stat-header">{opponent?.name}</span>
                        <div className="final-avatar" style={{ background: 'var(--surface-variant)' }}>{opponent?.avatar}</div>
                        <h3 className="stat-value">{matchResult === 'lose' ? '100%' : enemyProgress + '%'}</h3>
                    </div>
                </div>
                
                <div className="duel-actions" style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={() => {
                        setPhase('matchmaking');
                        setEnemyProgress(0);
                        setTimeLeft(60);
                        setCode(CHALLENGE.initialCode);
                    }}>Yangi Jang ⚔️</button>
                    {matchResult === 'lose' && (
                        <button className="btn btn-outline" onClick={() => {
                            setPhase('matchmaking');
                            setEnemyProgress(0);
                            setTimeLeft(60);
                            setCode(CHALLENGE.initialCode);
                        }}>Qayta urinish 🔄</button>
                    )}
                </div>
            </div>
        );
    }

    // Fighting Phase (Arena)
    return (
        <div className="duel-container arena-layout">
            {/* Background Decorative Elements */}
            <div className="arena-bg-glow glow-1"></div>
            <div className="arena-bg-glow glow-2"></div>

            {/* Arena Header: Me vs Opponent */}
            <header className="arena-header">
                <div className="player-stats me">
                    <div className="player-avatar-mini">
                        <AnimatedRobot customState="idle" className="mini-bot" />
                    </div>
                    <div className="player-info">
                        <span className="p-name">Siz</span>
                        <div className="p-progress-track">
                            <div className="p-progress-fill me" style={{ width: '15%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="arena-timer-area">
                    <div className="arena-vs-badge">VS</div>
                    <div className="arena-timer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                    </div>
                    <div className="arena-round-label">1-savol • 1/5</div>
                </div>

                <div className="player-stats opponent">
                    <div className="player-info">
                        <span className="p-name">{opponent?.name}</span>
                        <div className="p-progress-track">
                            <div className="p-progress-fill enemy" style={{ width: `${enemyProgress}%` }}></div>
                        </div>
                    </div>
                    <div className="player-avatar-mini enemy-avatar">
                        {opponent?.avatar}
                        <div className="enemy-level-badge">Lv.{opponent?.level}</div>
                    </div>
                </div>
            </header>

            <main className="arena-main">
                {/* Left Panel: Problem Statement */}
                <section className="problem-panel">
                    <div className="problem-header">
                        <h1 className="problem-title">{CHALLENGE.title}</h1>
                        <span className="difficulty-badge easy">{CHALLENGE.difficulty}</span>
                    </div>

                    <div className="problem-content">
                        <p className="problem-desc">{CHALLENGE.prompt}</p>

                        <div className="problem-section">
                            <h3 className="section-label">Misollar:</h3>
                            {CHALLENGE.examples.map((ex, idx) => (
                                <div key={idx} className="example-box">
                                    <div className="ex-line"><strong>Kirish:</strong> <code>{ex.input}</code></div>
                                    <div className="ex-line"><strong>Chiqish:</strong> <code>{ex.output}</code></div>
                                </div>
                            ))}
                        </div>

                        <div className="problem-section">
                            <h3 className="section-label">Cheklovlar:</h3>
                            <ul className="constraints-list">
                                {CHALLENGE.constraints.map((c, idx) => <li key={idx}>{c}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Code Editor */}
                <section className="editor-panel">
                    <div className="editor-top-bar">
                        <div className="lang-tabs">
                            <button className="lang-tab active">JavaScript</button>
                            <button className="lang-tab">Python</button>
                            <button className="lang-tab">C++</button>
                        </div>
                        <div className="editor-actions-mini">
                            <button className="icon-btn" title="Kodni tozalash">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </div>

                    <div className="editor-body">
                        <div className="line-numbers">
                            {Array.from({ length: 10 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                        </div>
                        <textarea
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            className="arena-code-input"
                            spellCheck="false"
                        />
                    </div>

                    <footer className="editor-footer">
                        <div className="footer-left">
                            <button className="btn-arena btn-ghost" onClick={() => window.history.back()}>Chiqish</button>
                        </div>
                        <div className="footer-right">
                            <button className="btn-arena btn-secondary" onClick={() => alert('Kod tekshirilmoqda...')}>Sinab ko'rish</button>
                            <button className="btn-arena btn-primary" onClick={handleSubmit}>Javobni yuborish</button>
                        </div>
                    </footer>
                </section>
            </main>
        </div>
    );
}

export default DuelMode;
