import { useEffect } from 'react';
import './XpAnimation.css';
import Mascot from './Mascot';
import { useUser } from '../context/UserContext';

function XpAnimation({ xpAmount, onComplete }) {
    const { stats } = useUser();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2500); // 2.5 seconds raketalar uchishi uchun yetarli

        // Sound effect (opsional/agar bo'lsa)
        try {
            const audio = new Audio('/assets/sounds/success.mp3');
            audio.play().catch(e => console.log('Audio autoplay ignored', e));
        } catch (e) { }

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="xp-animation-overlay">
            <div className="xp-animation-content">
                <div className="mascot-launching">
                    <Mascot state="happy" message={`Ajoyib! You earned +${xpAmount} XP`} />
                </div>
                <div className="xp-particles">
                    <i className="fa-solid fa-star star-1"></i>
                    <i className="fa-solid fa-star star-2"></i>
                    <i className="fa-solid fa-bolt bolt-1"></i>
                    <i className="fa-solid fa-fire fire-1"></i>
                    <i className="fa-solid fa-star star-3"></i>
                </div>
                <h1 className="xp-earned-text">+{xpAmount} XP</h1>
                <p className="level-status-text">
                    Total XP: {stats.xp + xpAmount} - Level Up so'ng!
                </p>
                <div className="rocket-effect">
                    <img src="/assets/rocket_transparent.png" alt="XP Rocket" style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))' }} />
                </div>
            </div>
        </div>
    );
}

export default XpAnimation;
