import React from 'react';
import './Mascot.css';
import { useUser } from '../context/UserContext';
import AnimatedRobot from './AnimatedRobot';

function Mascot({ state = 'default', message }) {
    // state: 'default', 'happy', 'sad', 'thinking'
    const { stats } = useUser();
    const avatarId = stats.currentAvatar || 'default';

    // Rasm manzilini yaratish
    const getAvatarSrc = () => {
        return `/assets/mascots/mascot_${avatarId}.png`;
    };

    // Map Mascot states to AnimatedRobot states
    let robotState = 'idle';
    if (state === 'happy') robotState = 'happy';
    else if (state === 'sad') robotState = 'sad';
    else if (state === 'greeting') robotState = 'greeting';
    else if (state === 'invite') robotState = 'invite';
    else if (state === 'thinking') robotState = 'idle'; // for now

    return (
        <div className={`mascot-container ${state}`}>
            <div className="mascot-avatar" style={{ 
                background: avatarId === 'default' ? 'transparent' : 'rgba(10, 10, 20, 0.8)',
                border: avatarId === 'default' ? 'none' : '3px solid var(--primary)',
                boxShadow: avatarId === 'default' ? 'none' : undefined
            }}>
                {avatarId === 'default' ? (
                    <AnimatedRobot state={robotState} />
                ) : (
                    <img src={getAvatarSrc()} alt="Robot Mascot" className="mascot-image" />
                )}
                <div className="mascot-glow" style={{ display: avatarId === 'default' ? 'none' : 'block' }}></div>
            </div>
            {message && (
                <div className="mascot-bubble">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
}

export default Mascot;
