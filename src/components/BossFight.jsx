import { useState, useEffect, useRef, useCallback } from 'react';
import './BossFight.css';

/* ─── helpers ─── */
const WEAPONS = [
  { maxTime: 5,  key: 'blade',  icon: '🗡️',  name: 'Neon Quantum Blade', tier: 'blade',  dmgKey: 'blade'  },
  { maxTime: 10, key: 'rifle',  icon: '⚡',   name: 'Plasma Code Rifle',  tier: 'rifle',  dmgKey: 'rifle'  },
  { maxTime: 15, key: 'dagger', icon: '🔪',  name: 'Cyber Dagger',        tier: 'dagger', dmgKey: 'dagger' },
];

function getWeapon(elapsed) {
  return WEAPONS.find(w => elapsed <= w.maxTime) || null;
}

function normalize(str) {
  return str.trim().replace(/\s+/g, ' ');
}

function BossFight({ bossData, courseColor, onWin, onLose, onExit }) {
  const MAX_TIME = (round) => round.type === 'shield' ? 5 : 15;

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
  const [xpEarned, setXpEarned]     = useState(0);

  const timerRef   = useRef(null);
  const elapsed    = useRef(0);    // seconds spent on current round

  const currentRound = bossData.rounds[roundIdx];
  const weapon        = getWeapon(elapsed.current);

  /* ── particles (background) ── */
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 8,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    dur: 6 + Math.random() * 10,
    color: ['#3776AB','#ff4444','#00ffcc','#a78bfa'][i % 4]
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
    setBossAnim('boss-slap');
    const newHearts = playerHearts - 1;
    setPlayerHearts(newHearts);
    setTimeout(() => {
      setShowStun(false);
      setBossAnim('');
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
      setTimeout(() => {
        setBossHp(prev => {
          const next = Math.max(0, prev - dmg);
          if (next <= 0) {
            setBossAnim('boss-hit');
            setTimeout(() => { setResult('win'); setPhase('result'); setXpEarned(50 + (3 - playerHearts) * -5 + 30); }, 800);
          } else {
            setBossAnim('boss-hit');
            setTimeout(() => { setBossAnim(''); advanceRound(); }, 700);
          }
          return next;
        });
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

  const bossHpPercent    = (bossHp / bossData.hp) * 100;
  const playerHpPercent  = (playerHearts / 3) * 100;

  /* ─── RENDER ─── */
  return (
    <div className="boss-fight-overlay">
      {/* BG */}
      <div className="boss-bg">
        {particles.map(p => (
          <div key={p.id} className="boss-bg-particle" style={{
            width: p.size, height: p.size,
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`
          }} />
        ))}
      </div>

      {/* HEADER */}
      <div className="boss-header">
        <div className="boss-title-text">⚔️ {bossData.subtitle || 'Boss Fight'}</div>
        <button className="boss-exit-btn" onClick={onExit}>✕ Chiqish</button>
      </div>

      {/* HP BARS */}
      <div className="boss-hp-section">
        <div className="hp-row">
          <span className="hp-label">👹 Boss</span>
          <div className="hp-bar-track">
            <div className="boss-hp-fill" style={{ width: `${bossHpPercent}%` }} />
          </div>
          <span className="hp-value">{bossHp}</span>
        </div>
        <div className="hp-row">
          <span className="hp-label">❤️ Siz</span>
          <div className="hp-bar-track">
            <div className="player-hp-fill" style={{ width: `${playerHpPercent}%` }} />
          </div>
          <div className="hearts-display">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`heart-icon ${i >= playerHearts ? 'lost' : ''}`}>❤️</span>
            ))}
          </div>
        </div>
      </div>

      {/* ROUND DOTS */}
      <div className="boss-rounds-indicator">
        {bossData.rounds.map((_, i) => (
          <div key={i} className={`round-dot ${i < roundIdx ? 'done' : i === roundIdx ? 'active' : ''}`} />
        ))}
      </div>

      {/* ARENA */}
      <div className="boss-arena">
        {/* Boss character */}
        <div className="boss-character-wrap">
          <div className={`boss-emoji-wrap ${bossAnim}`}>
            {bossData.bossIcon || '🐍'}
          </div>
          <div className="boss-name-tag">{bossData.bossName}</div>
          <div className="boss-speech">
            {currentRound.bossMessage}
          </div>
        </div>

        {/* Timer */}
        {phase === 'playing' && (
          <div className={`boss-timer ${isUrgent ? 'urgent' : ''}`}>
            <div className="timer-circle">
              <svg width="42" height="42" viewBox="0 0 42 42">
                <circle className="timer-ring"    cx="21" cy="21" r="16" />
                <circle className="timer-progress" cx="21" cy="21" r="16"
                  stroke={timerColor}
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="timer-number" style={{ color: timerColor }}>{timeLeft}</div>
            </div>
            {currentRound.type !== 'shield' && currentWeapon && (
              <div className="timer-weapon-label">
                <div className={`weapon-name weapon-tier-${currentWeapon.tier}`}>
                  {currentWeapon.icon} {currentWeapon.name}
                </div>
                <div>tezroq yozsang kuchliroq!</div>
              </div>
            )}
            {currentRound.type === 'shield' && (
              <div className="timer-weapon-label">
                <div className="weapon-name" style={{ color: '#00ccff' }}>🛡️ Shield Mode</div>
                <div>Kodni yozib himoyalan!</div>
              </div>
            )}
          </div>
        )}

        {/* Code Display */}
        <div className="boss-challenge-box">
          <div className={`challenge-type-badge ${currentRound.type}`}>
            {currentRound.type === 'bug' ? '🐛 Xatoni Tuzat' : '🛡️ Himoyalan'}
          </div>

          <div className={`boss-code-display ${currentRound.type === 'shield' ? 'shield-mode' : ''}`}>
            {currentRound.code}
          </div>

          <div className="boss-hint">
            <span>💡</span>
            <span>{currentRound.hint}</span>
          </div>
        </div>

        {/* Answer */}
        {phase === 'playing' && (
          <>
            <textarea
              className={`boss-answer-input ${inputState === 'correct' ? 'correct-input' : inputState === 'wrong' ? 'wrong-input' : ''}`}
              placeholder={currentRound.type === 'bug' ? 'To\'g\'ri kodni yozing...' : 'Shield kodini yozing...'}
              value={answer}
              rows={3}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => { if (e.ctrlKey && e.key === 'Enter') handleSubmit(); }}
            />
            <button
              className={`boss-submit-btn ${currentRound.type === 'shield' ? 'defend' : 'attack'}`}
              onClick={handleSubmit}
              disabled={!answer.trim()}
            >
              {currentRound.type === 'bug' ? '⚔️ Hujum!' : '🛡️ Himoyalan!'}
            </button>
          </>
        )}

        {/* Weapon confirmation */}
        {phase === 'weapon' && weaponUsed && (
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <div style={{ fontSize: '3rem' }}>{weaponUsed.icon}</div>
            <div className={`weapon-name weapon-tier-${weaponUsed.tier}`} style={{ fontSize: '1.1rem' }}>
              {weaponUsed.name}
            </div>
            <div style={{ color: '#888', fontSize: '0.85rem', marginTop: 4 }}>
              -{currentRound.damage?.[weaponUsed.dmgKey]} boss HP
            </div>
          </div>
        )}
      </div>

      {/* WEAPON FLASH */}
      {phase === 'weapon' && weaponUsed && (
        <div className="weapon-flash">{weaponUsed.icon}</div>
      )}

      {/* STUN OVERLAY */}
      {showStun && (
        <div className="stun-overlay">
          <div className="stun-icon">😵</div>
          <div className="stun-text">STUN! Boss shapaloq urdi!</div>
          <div style={{ color: '#888', fontSize: '0.85rem' }}>2 soniya kutmoqdasiz...</div>
        </div>
      )}

      {/* SHIELD FLASH */}
      {showShield && <div className="shield-flash" />}

      {/* WIN / LOSE */}
      {phase === 'result' && result === 'win' && (
        <div className="boss-result-overlay win-overlay">
          <div className="result-big-icon">🏆</div>
          <div className="result-title win">G'ALIBА!</div>
          <div className="result-desc">
            {bossData.bossName} yiqildi!<br />
            Keyingi modulga yo'l ochildi.
          </div>
          {xpEarned > 0 && <div className="result-xp-badge">⚡ +{xpEarned} XP</div>}
          <button className="result-btn continue-btn" onClick={() => onWin(xpEarned)}>
            Davom Etish →
          </button>
        </div>
      )}

      {phase === 'result' && result === 'lose' && (
        <div className="boss-result-overlay lose-overlay">
          <div className="result-big-icon">💀</div>
          <div className="result-title lose">MAG'LUBIYAT</div>
          <div className="result-desc">
            {bossData.bossName} yendi!<br />
            Qayta urinib ko'ring.
          </div>
          <button className="result-btn retry-btn" onClick={() => {
            setBossHp(bossData.hp); setPlayerHearts(3);
            setRoundIdx(0); setResult(null); setXpEarned(0);
            startRound(0);
          }}>
            🔄 Qayta Urinish
          </button>
          <button className="boss-exit-btn" style={{ marginTop: 8 }} onClick={onExit}>
            Chiqish
          </button>
        </div>
      )}
    </div>
  );
}

export default BossFight;
