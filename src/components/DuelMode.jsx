import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './DuelMode.css';
import Mascot from './Mascot';

const MOCK_OPPONENTS = [
    { name: 'Alex_CodeMaster', level: 8, avatar: '👤' },
    { name: 'Shadow_Dev', level: 12, avatar: '🤖' },
    { name: 'JS_Ninja', level: 5, avatar: '🥷' },
    { name: 'Cyber_Girl', level: 9, avatar: '👩‍💻' }
];

const CHALLENGE = {
    title: "Array Yig'indisi",
    prompt: "Berilgan sonlar massividagi (array) barcha elementlar yig'indisini qaytaruvchi `sumArray(arr)` funksiyasini yozing.",
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
                <div className="radar-animation">
                    <div className="radar-circle circle-1"></div>
                    <div className="radar-circle circle-2"></div>
                    <div className="radar-circle circle-3"></div>
                    <div className="radar-scanner"></div>
                    <div className="user-radar-avatar" style={{width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(10,10,20,0.8)', overflow: 'hidden', padding: '5px', boxSizing: 'border-box' }}>
                        <img src={userAvatarSrc} alt="Sizning avataringiz" style={{width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.3)'}} />
                    </div>
                </div>
                <h2 className="matchmaking-text">Munosib raqib qidirilmoqda...</h2>
                <p className="matchmaking-subtext">Tayyor turing, jang tez orada boshlanadi!</p>
            </div>
        );
    }

    if (phase === 'result') {
        return (
            <div className="duel-container result-wrapper">
                <h1 className={`result-title ${matchResult}`}>
                    {matchResult === 'win' ? "G'ALABA! 🎉" : "MAG'LUBIYAT 💀"}
                </h1>
                <Mascot
                    state={matchResult === 'win' ? 'happy' : 'sad'}
                    message={matchResult === 'win' ? "+50 XP Olingiz! Siz ajoyib dasturchisiz!" : "Raqib tezroq edi, taslim bo'lmang!"}
                />
                <div className="result-stats">
                    <div className="stat-box">
                        <span>Sizning holatingiz</span>
                        <div className="final-avatar">
                            <img src={userAvatarSrc} alt="Siz" style={{width: '70%', height: '70%', objectFit: 'contain', transform: 'scale(1.3)'}} />
                        </div>
                        <h3>{matchResult === 'win' ? '100%' : 'Chala'}</h3>
                    </div>
                    <div className="vs-badge-small">VS</div>
                    <div className="stat-box enemy-stat">
                        <span>{opponent?.name}</span>
                        <div className="final-avatar">{opponent?.avatar}</div>
                        <h3>{matchResult === 'lose' ? '100%' : enemyProgress + '%'}</h3>
                    </div>
                </div>
                <button className="btn btn-primary mt-20" onClick={() => {
                    setPhase('matchmaking');
                    setEnemyProgress(0);
                    setTimeLeft(60);
                    setCode(CHALLENGE.initialCode);
                }}>Yangi Jang ⚔️</button>
            </div>
        );
    }

    // Fighting Phase
    return (
        <div className="duel-container">
            <div className="duel-header">
                <div className="duel-player me">
                    <span className="player-name">Siz</span>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill me-fill" style={{ width: '0%' }}></div> {/* Since we just win immediately, we don't have dynamic sub-progress yet except 0 to 100 */}
                    </div>
                </div>
                <div className="timer-box">
                    <span>⏳ {timeLeft}</span>
                </div>
                <div className="duel-player enemy">
                    <span className="player-name">{opponent?.name} Lvl {opponent?.level}</span>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill enemy-fill" style={{ width: `${enemyProgress}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="duel-challenge-card">
                <h3>{CHALLENGE.title}</h3>
                <p>{CHALLENGE.prompt}</p>
            </div>

            <div className="duel-editor">
                <textarea
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="code-input JS"
                    spellCheck="false"
                />
                <button className="btn btn-primary submit-code-btn" onClick={handleSubmit}>Javobni Yuborish 🚀</button>
            </div>
        </div>
    );
}

export default DuelMode;
