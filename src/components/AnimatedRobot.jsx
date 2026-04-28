import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedRobot.css';

// state turlari: 'idle', 'greeting', 'invite', 'happy', 'sad'
function AnimatedRobot({ state = 'idle', className = '' }) {
    
    // Yangi milliy mascot (Uchqunbot) rasmi
    const stateImageMap = {
        idle: '/images/uchqunbot.png',
        greeting: '/images/uchqunbot.png',
        invite: '/images/uchqunbot.png',
        happy: '/images/uchqunbot.png',
        sad: '/images/uchqunbot.png'
    };

    const currentImage = stateImageMap[state] || stateImageMap.idle;

    // Framer Motion fizikalari / Animatsiyalar
    const variants = {
        initial: { opacity: 0, scale: 0.8, y: 15 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { type: 'spring', stiffness: 260, damping: 20 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9, 
            y: -10,
            transition: { duration: 0.15 }
        },
        // Looping Background Animations
        idle_float: {
            y: [0, -8, 0],
            rotate: [0, -1, 1, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        },
        happy_bounce: {
            y: [0, -20, 0],
            transition: { duration: 0.6, repeat: Infinity, type: 'spring' }
        },
        sad_sigh: {
            y: [0, 8, 0],
            rotate: [0, 3, 0],
            transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
    };

    // Joriy statega qarab asinxron loop animatsiyani tanlash
    let loopingAnimation = "idle_float";
    if (state === 'happy') loopingAnimation = "happy_bounce";
    if (state === 'sad') loopingAnimation = "sad_sigh";

    // Status particles
    const renderParticles = () => {
        if (state === 'happy') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ y: [-10, -30], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ position:'absolute', top: '10%', right: '10%', fontSize: '1.5rem', zIndex: 10 }}>✨</motion.div>
                    <motion.div animate={{ y: [-10, -40], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} style={{ position:'absolute', top: '20%', left: '5%', fontSize: '1.2rem', zIndex: 10 }}>⭐</motion.div>
                </motion.div>
            );
        }
        if (state === 'sad') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ y: [0, 20], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position:'absolute', top: '40%', right: '20%', fontSize: '1.5rem', zIndex: 10 }}>💧</motion.div>
                    <motion.div animate={{ y: [0, 15], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.3, delay: 0.5 }} style={{ position:'absolute', top: '50%', left: '20%', fontSize: '1.5rem', zIndex: 10 }}>💧</motion.div>
                </motion.div>
            );
        }
        if (state === 'greeting') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ rotate: [0, 20, -10, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position:'absolute', top: '10%', right: '-10%', fontSize: '2rem', zIndex: 10, transformOrigin: 'bottom right' }}>👋</motion.div>
                </motion.div>
            );
        }
        if (state === 'invite') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position:'absolute', top: '40%', right: '-20%', fontSize: '2rem', zIndex: 10 }}>👉</motion.div>
                </motion.div>
            );
        }
        return null;
    }

    return (
        <div className={`robot-container state-${state} ${className}`} style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={state}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                    {renderParticles()}
                    <motion.img 
                        src={currentImage} 
                        alt={`AI Mascot - ${state}`}
                        className="robot-mascot-image"
                        variants={variants}
                        animate={loopingAnimation}
                        whileHover={{ scale: 1.05, filter: 'brightness(1.1) drop-shadow(0 0 25px rgba(0,255,204,0.6))' }}
                        whileTap={{ scale: 0.95 }}
                        style={{ position: 'relative', zIndex: 5 }}
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Yumshoq joylashuv soyasi (Floating Ground Shadow) */}
            <motion.div 
                className="robot-shadow-element"
                animate={
                    state === 'happy' ? { scale: [1, 0.5, 1], opacity: [0.3, 0.1, 0.3] }
                  : { scale: [1, 0.9, 1], opacity: [0.3, 0.2, 0.3] }
                }
                transition={
                    state === 'happy' ? { duration: 0.6, repeat: Infinity, type: 'spring' }
                  : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
            />
        </div>
    );
}

export default AnimatedRobot;
