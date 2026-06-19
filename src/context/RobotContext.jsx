import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RobotContext = createContext();

export function RobotProvider({ children }) {
    const [robotState, setRobotState] = useState({
        mood: 'idle',
        message: 'Salom asr! Men DuoKod asistanti — Uchqunbot man! 🚀',
        showBubble: false,
        isVisible: true
    });

    // Timer refs
    const messageTimer = React.useRef(null);
    const idleTimer = React.useRef(null);

    const triggerRobot = useCallback((mood, message, duration = 4000) => {
        if (!robotState.isVisible) return;
        
        clearTimeout(messageTimer.current);
        
        setRobotState(prev => ({
            ...prev,
            mood,
            message,
            showBubble: true
        }));

        messageTimer.current = setTimeout(() => {
            setRobotState(prev => ({
                ...prev,
                mood: 'idle',
                showBubble: false
            }));
        }, duration);
    }, [robotState.isVisible]);

    const resetIdleTimer = useCallback(() => {
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            if (robotState.isVisible && !robotState.showBubble) {
                triggerRobot('sleepy', "Uzoq o‘ylanib qoldingizmi? Yordam kerak bo'lsa ayting!", 5000);
            }
        }, 30000); // 30 seconds of inactivity triggers a hint
    }, [robotState.isVisible, robotState.showBubble, triggerRobot]);

    // Setup global listeners for idle detection
    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll'];
        const handleActivity = () => resetIdleTimer();
        
        events.forEach(event => window.addEventListener(event, handleActivity));
        resetIdleTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
            clearTimeout(messageTimer.current);
            clearTimeout(idleTimer.current);
        };
    }, [resetIdleTimer]);

    const toggleRobot = () => {
        setRobotState(prev => ({ ...prev, isVisible: !prev.isVisible }));
    };

    return (
        <RobotContext.Provider value={{ robotState, triggerRobot, toggleRobot }}>
            {children}
        </RobotContext.Provider>
    );
}

export function useRobot() {
    return useContext(RobotContext);
}
