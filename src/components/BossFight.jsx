import { useState, useEffect, useRef, useCallback } from 'react';
import './BossFight.css';

/* ─── helpers ─── */
const WEAPONS = [
  { maxTime: 15, key: 'blade',  icon: '🗡️',  name: 'Neon Quantum Blade', tier: 'blade',  dmgKey: 'blade'  },
  { maxTime: 30, key: 'rifle',  icon: '⚡',   name: 'Plasma Code Rifle',  tier: 'rifle',  dmgKey: 'rifle'  },
  { maxTime: 45, key: 'dagger', icon: '🔪',  name: 'Cyber Dagger',        tier: 'dagger', dmgKey: 'dagger' },
];

function getWeapon(elapsed) {
  return WEAPONS.find(w => elapsed <= w.maxTime) || null;
}

function normalize(str) {
  return str.trim().replace(/\s+/g, ' ');
}

function BossFight({ bossData, courseColor, onWin, onLose, onExit }) {
  const MAX_TIME = (round) => round.type === 'shield' ? 15 : 45;

  const [roundIdx, setRoundIdx]     = useState(0);
  const [bossHp, setBossHp]         = useState(bossData.hp);
  const [playerHearts, setPlayerHearts] = useState(3);
  const [answer, setAnswer]         = useState('');
  const [timeLeft, setTimeLeft]     = useState(MAX_TIME(bossData.rounds[0]));
  const [timeMax, setTimeMax]       = useState(MAX_TIME(bossData.rounds[0]));
  const [phase, setPhase]           = useState('playing'); // playing | stunned | weapon | result
  const [result, setResult]         = useState(null);      // 'win' | 'lose'
  const [inputState, setInputState] = useState(''); // 'correct' | 'wrong' | ''
  const [weaponUsed, setWeaponUsed] = useState(null);
  const [showStun, setShowStun]     = useState(false);
  const [showShield, setShowShield] = useState(false);
  const [bossAnim, setBossAnim]     = useState('');
  const [bossHpShadow, setBossHpShadow] = useState(bossData.hp);
  const [screenShake, setScreenShake]     = useState(false);
  const [xpEarned, setXpEarned]           = useState(0);
  const [showCritical, setShowCritical]   = useState(false);

  const timerRef   = useRef(null);
  const elapsed    = useRef(0);    // seconds spent on current round

  const currentRound = bossData.rounds[roundIdx];
  const weapon        = getWeapon(elapsed.current);

  /* ── particles (background) ── */
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 10,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    dur: 15 + Math.random() * 20,
    color: ['#dbeafe', '#ede9fe', '#fae8ff', '#ffffff'][i % 4]
  }));

  /* ── timer ── */
  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startRound = useCallback((idx) => {
    stopTimer();
    const round = bossData.rounds[idx];
    const max   = MAX_TIME(round);
    setAnswer('');
    setInputState('');
    setTimeMax(max);
    setTimeLeft(max);
    elapsed.current = 0;
    setPhase('playing');

    timerRef.current = setInterval(() => {
      elapsed.current += 1;
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossData, roundIdx, stopTimer]);

  useEffect(() => {
    startRound(0);
    return () => stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── timeout (no answer) ── */
  const handleTimeout = useCallback(() => {
    stopTimer();
    triggerStun();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopTimer]);

  /* ── stun player ── */
  const triggerStun = () => {
    setPhase('stunned');
    setShowStun(true);
    setBossAnim('boss-laugh');
    setScreenShake(true);
    const newHearts = playerHearts - 1;
    setPlayerHearts(newHearts);
    setTimeout(() => {
      setShowStun(false);
      setBossAnim('');
      setScreenShake(false);
      if (newHearts <= 0) { setResult('lose'); setPhase('result'); }
      else { setRoundIdx(prev => {
        const next = prev < bossData.rounds.length - 1 ? prev + 1 : prev;
        startRound(next);
        return next;
      }); }
    }, 2000);
  };

  /* ── submit answer ── */
  const handleSubmit = () => {
    if (phase !== 'playing') return;
    stopTimer();

    const round   = currentRound;
    const correct = normalize(round.type === 'shield' ? round.shieldCode : round.correctAnswer);
    const given   = normalize(answer);

    if (given === correct) {
      handleCorrect();
    } else {
      setInputState('wrong');
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 400);
      triggerStun();
    }
  };

  /* ── correct answer ── */
  const handleCorrect = () => {
    if (currentRound.type === 'shield') {
      // Shield mode — defend
      setShowShield(true);
      setInputState('correct');
      setTimeout(() => {
        setShowShield(false);
        advanceRound();
      }, 1200);
    } else {
      // Attack mode — choose weapon
      const w = getWeapon(elapsed.current);
      setWeaponUsed(w);
      setInputState('correct');
      setPhase('weapon');

      const dmg = w ? currentRound.damage[w.dmgKey] : currentRound.damage.dagger;
      
      // Critical hit effect
      if (dmg > 20) {
        setShowCritical(true);
        setTimeout(() => setShowCritical(false), 800);
      }

      setTimeout(() => {
        setBossHp(prev => {
          const next = Math.max(0, prev - dmg);
          if (next <= 0) {
            setBossAnim('boss-hit');
            const totalXp = 50 + playerHearts * 10 + (roundIdx * 5);
            setTimeout(() => { 
              setXpEarned(totalXp);
              setResult('win'); 
              setPhase('result'); 
            }, 800);
          } else {
            setBossAnim('boss-hit');
            setTimeout(() => { setBossAnim(''); advanceRound(); }, 700);
          }
          return next;
        });
        setTimeout(() => setBossHpShadow(prev => Math.max(0, prev - dmg)), 400);
        setWeaponUsed(null);
      }, 900);
    }
  };

  const advanceRound = () => {
    const next = roundIdx + 1;
    if (next >= bossData.rounds.length) {
      setResult('win');
      setPhase('result');
      setXpEarned(50 + playerHearts * 5);
    } else {
      setRoundIdx(next);
      startRound(next);
    }
  };

  /* ── derived UI values ── */
  const timerPercent  = ((timeLeft / timeMax) * 100).toFixed(1);
  const circumference = 2 * Math.PI * 16;
  const dashOffset    = circumference * (1 - timeLeft / timeMax);
  const isUrgent      = timeLeft <= 5;

  const currentWeapon = getWeapon(elapsed.current);
  const timerColor = currentWeapon
    ? { blade: '#00ffff', rifle: '#a78bfa', dagger: '#fb923c' }[currentWeapon.tier]
    : '#ff4444';

  const bossHpPercent       = (bossHp / bossData.hp) * 100;
  const bossHpShadowPercent = (bossHpShadow / bossData.hp) * 100;
  const playerHpPercent     = (playerHearts / 3) * 100;

  /* ─── RENDER ─── */
  return (
    <div className={`boss-page ${screenShake ? 'screen-shake' : ''}`}>
      {/* BG Blobs (Behind everything) */}
      <div className="boss-bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* HEADER */}
      <div className="boss-header">
        <div className="boss-title-wrap">
          <div className="boss-subtitle">✨ MODUL BOSSI</div>
          <div className="boss-title-main">{bossData.subtitle || 'Modul Sinovi'}</div>
        </div>
        <button className="boss-exit-link" onClick={onExit}>✕ Chiqish</button>
      </div>

      {/* MAIN CONTENT (Grid Middle) */}
      <div className="boss-main">
        
        {/* LEFT: WEAPON ARMORY */}
        <div className="side-panel armory-panel">
          <div className="panel-header">⚔️ QUROLLAR</div>
          <div className="weapon-deck">
            {[
              { id: 'blade', icon: '⚡', name: 'PLAZMA TIG\'', desc: '< 15 soniya', active: timeLeft > 30 },
              { id: 'rifle', icon: '🔫', name: 'KOD RIFLE', desc: '< 30 soniya', active: timeLeft <= 30 && timeLeft > 15 },
              { id: 'dagger', icon: '🔪', name: 'ODDIY PICHOQ', desc: '> 30 soniya', active: timeLeft <= 15 }
            ].map(w => (
              <div key={w.id} className={`weapon-card ${w.active && phase === 'playing' ? 'active' : ''}`}>
                <div className="w-icon">{w.icon}</div>
                <div className="w-info">
                  <div className="w-name">{w.name}</div>
                  <div className="w-desc">{w.desc}</div>
                </div>
                {w.active && phase === 'playing' && <div className="active-glow" />}
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: BATTLE ARENA (Focus on Code) */}
        <div className="arena-center">
          
          <div className="arena-boss-row">
            <div className="boss-status-wrap">
              <div className="boss-hp-ring">
                <svg width="120" height="120">
                  <circle className="hp-ring-bg" cx="60" cy="60" r="54" />
                  <circle className="hp-ring-fill" cx="60" cy="60" r="54" 
                    style={{ strokeDashoffset: 340 - (340 * bossHpPercent / 100) }}
                  />
                </svg>
                <div className="hp-text">{bossHp} HP</div>
              </div>
            </div>
            <div className="boss-speech-bubble">
              {currentRound.bossMessage}
            </div>
          </div>

          <div className="challenge-card">
            <div className="challenge-header">
              <span className="badge">🐛 XATONI TOPING</span>
              <div className="timer-pill">⏱️ {timeLeft}s</div>
            </div>
            <div className="code-display-area">
              <pre><code>{currentRound.code}</code></pre>
            </div>
            <div className="hint-pill">💡 {currentRound.hint}</div>
          </div>

          {showCritical && <div className="critical-hit">CRITICAL!</div>}
          {phase === 'weapon' && weaponUsed && (
            <div className="attack-effect">
              <div className="eff-icon">{weaponUsed.icon}</div>
              <div className="eff-name">{weaponUsed.name}</div>
            </div>
          )}
          {showShield && <div className="shield-ring" />}
        </div>

        {/* RIGHT: STATUS PANEL */}
        <div className="side-panel status-panel">
          <div className="panel-header">🛡️ HOLATINGIZ</div>
          <div className="status-grid">
            <div className="stat-item">
              <div className="stat-label">IMKONIYAT</div>
              <div className="hearts-row">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={`heart ${i < playerHearts ? 'full' : 'empty'}`}>
                    {i < playerHearts ? '❤️' : '🤍'}
                  </span>
                ))}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">JARAЁN</div>
              <div className="rounds-track">
                {bossData.rounds.map((_, i) => (
                  <div key={i} className={`round-node ${i < roundIdx ? 'done' : i === roundIdx ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM: INPUT HUB */}
      <div className="battle-input-hub">
        <div className="input-container">
          <div className="input-label">TO'G'RI KODNI KIRITING:</div>
          <textarea
            className={`battle-textarea ${inputState}`}
            placeholder="Bu yerga yozing..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => { if (e.ctrlKey && e.key === 'Enter') handleSubmit(); }}
          />
        </div>
        <button className="battle-btn" onClick={handleSubmit} disabled={!answer.trim() || phase !== 'playing'}>
          {currentRound.type === 'bug' ? '🚀 ATTACK' : '🛡️ DEFEND'}
        </button>
      </div>

      {/* RESULT OVERLAYS */}
      {phase === 'result' && (
        <div className={`boss-result-overlay ${result}`}>
          <div className="result-card">
            <div className="result-icon">{result === 'win' ? '🏆' : '💀'}</div>
            <div className="result-title">{result === 'win' ? 'MUVAFFAQIYAT!' : 'HAMMASI JOYIDA!'}</div>
            <div className="result-text">
              {result === 'win' 
                ? 'Siz topshiriqlarni a\'lo darajada bajardingiz! Keyingi modulga yo\'l ochildi.'
                : 'Xatolardan o\'rganish — eng yaxshi yo\'l. Yana bir bor urinib ko\'ring!'}
            </div>
            {result === 'win' && xpEarned > 0 && (
              <div className="result-xp">⚡ +{xpEarned} XP</div>
            )}
            <div className="result-actions">
              {result === 'win' ? (
                <button className="res-btn primary" onClick={() => onWin(xpEarned)}>Davom Etish →</button>
              ) : (
                <>
                  <button className="res-btn primary" onClick={() => {
                    setBossHp(bossData.hp); setPlayerHearts(3);
                    setRoundIdx(0); setResult(null); setXpEarned(0);
                    startRound(0);
                  }}>🔄 Qayta Urinish</button>
                  <button className="res-btn secondary" onClick={onExit}>Chiqish</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STUN OVERLAY */}
      {showStun && (
        <div className="stun-screen-overlay">
          <div className="stun-content">
            <div className="stun-emoji">😵</div>
            <div className="stun-msg">OOOPS! BOSSDAN REAKSIYA!</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BossFight;
