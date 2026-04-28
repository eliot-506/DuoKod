import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRobot } from '../context/RobotContext';
import './AnimatedRobot.css';

// state turlari: 'idle', 'happy', 'excited', 'thinking', 'confused', 'sad', 'wrong', 'celebration', 'sleepy'
function AnimatedRobot({ isFloating = false, customState, className = '' }) {
    const context = useRobot();
    
    const state = isFloating && context ? context.robotState.mood : (customState || 'idle');
    const message = isFloating && context ? context.robotState.message : null;
    const showBubble = isFloating && context ? context.robotState.showBubble : false;
    const isVisible = isFloating && context ? context.robotState.isVisible : true;

    if (!isVisible) return null;

    const stateImageMap = {
        idle: '/assets/mascots/idle.png',
        happy: '/assets/mascots/happy.png',
        excited: '/assets/mascots/happy.png',
        thinking: '/assets/mascots/idle.png',
        confused: '/assets/mascots/sad.png',
        sad: '/assets/mascots/sad.png',
        wrong: '/assets/mascots/sad.png',
        celebration: '/assets/mascots/happy.png',
        sleepy: '/assets/mascots/idle.png'
    };

    const currentImage = stateImageMap[state] || stateImageMap.idle;

    // Framer Motion fizikalari
    const variants = {
        initial: { opacity: 0, scale: 0.8, y: 30 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { type: 'spring', stiffness: 260, damping: 20 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.5, 
            y: 20,
            transition: { duration: 0.2 }
        },
        
        // Looping Background Animations
        idle_float: {
            y: [0, -8, 0],
            rotate: [0, -2, 2, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        },
        happy_bounce: {
            y: [0, -20, 0],
            transition: { duration: 0.6, repeat: Infinity, type: 'spring' }
        },
        confused_tilt: {
            y: [0, -5, 0],
            rotate: [0, 15, 10, 15, 0],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        },
        sad_sigh: {
            y: [0, 8, 0],
            rotate: [0, 3, 0],
            transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        },
        thinking_bob: {
            y: [0, -4, 0],
            rotate: [0, -5, 0],
            transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        },
        celebration_spin: {
            y: [0, -25, 0],
            rotate: [0, 360],
            transition: { duration: 1, repeat: Infinity, type: 'spring' }
        },
        sleepy_nod: {
            y: [0, 10, 0],
            rotate: [0, 5, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
    };

    let loopingAnimation = "idle_float";
    if (state === 'happy') loopingAnimation = "happy_bounce";
    if (state === 'sad' || state === 'wrong') loopingAnimation = "sad_sigh";
    if (state === 'thinking') loopingAnimation = "thinking_bob";
    if (state === 'confused') loopingAnimation = "confused_tilt";
    if (state === 'celebration') loopingAnimation = "celebration_spin";
    if (state === 'sleepy') loopingAnimation = "sleepy_nod";

    // Status particles
    const renderParticles = () => {
        if (state === 'happy' || state === 'celebration') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ y: [-10, -40], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} style={{ position:'absolute', top: '10%', right: '10%', fontSize: '1.5rem', zIndex: 10 }}>✨</motion.div>
                    <motion.div animate={{ y: [-10, -50], opacity: [1, 0], scale: [1, 1.5] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} style={{ position:'absolute', top: '20%', left: '5%', fontSize: '1.5rem', zIndex: 10 }}>🎉</motion.div>
                </motion.div>
            );
        }
        if (state === 'thinking') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position:'absolute', top: '-10%', right: '20%', fontSize: '1.5rem', zIndex: 10 }}>❔</motion.div>
                </motion.div>
            );
        }
        if (state === 'wrong' || state === 'sad') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ y: [0, 20], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position:'absolute', top: '40%', right: '20%', fontSize: '1.2rem', zIndex: 10 }}>💧</motion.div>
                </motion.div>
            );
        }
        if (state === 'sleepy') {
            return (
                <motion.div className="emotion-particles" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div animate={{ y: [-10, -30], x: [0, 10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ position:'absolute', top: '-10%', right: '10%', fontSize: '1.2rem', zIndex: 10, fontWeight: 800 }}>Z</motion.div>
                    <motion.div animate={{ y: [-10, -40], x: [0, 15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} style={{ position:'absolute', top: '-20%', right: '-5%', fontSize: '1.5rem', zIndex: 10, fontWeight: 800 }}>Z</motion.div>
                </motion.div>
            );
        }
        return null;
    }

    const RobotBody = (
        <div className={`robot-container state-${state} ${className}`}>
            
            <AnimatePresence>
                {showBubble && message && (
                    <motion.div 
                        className="robot-speech-bubble"
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <p className="speech-text">{message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={state}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                    {renderParticles()}
                    <motion.img 
                        src={currentImage} 
                        alt={`AI Mascot - ${state}`}
                        className="robot-mascot-image"
                        animate={loopingAnimation}
                        variants={variants}
                        whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.6))' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (isFloating && context) {
                                context.triggerRobot('happy', 'Qanday yordam bera olaman? 😊', 3000);
                            }
                        }}
                    />
                </motion.div>
            </AnimatePresence>
            
            <motion.div 
                className="robot-shadow-element"
                animate={
                    state === 'happy' || state === 'celebration' ? { scale: [1, 0.4, 1], opacity: [0.3, 0.1, 0.3] }
                  : { scale: [1, 0.9, 1], opacity: [0.3, 0.2, 0.3] }
                }
                transition={
                    state === 'happy' || state === 'celebration' ? { duration: 0.6, repeat: Infinity, type: 'spring' }
                  : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
            />
        </div>
    );

    if (isFloating) {
        return (
            <div className="floating-robot-wrapper">
                {RobotBody}
            </div>
        );
    }

    return RobotBody;
}

export default AnimatedRobot;
