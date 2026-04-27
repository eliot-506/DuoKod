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

    return (
        <div className={`robot-container state-${state} ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={state}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ width: '100%', height: '100%' }}
                >
                    <motion.img 
                        src={currentImage} 
                        alt={`AI Mascot - ${state}`}
                        className="robot-mascot-image"
                        variants={variants}
                        animate={loopingAnimation}
                        whileHover={{ scale: 1.05, filter: 'brightness(1.1) drop-shadow(0 0 25px rgba(0,255,204,0.6))' }}
                        whileTap={{ scale: 0.95 }}
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
