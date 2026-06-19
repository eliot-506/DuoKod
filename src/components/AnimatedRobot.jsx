import { AnimatePresence, motion } from 'framer-motion';
import { useRobot } from '../context/RobotContext';
import './AnimatedRobot.css';

const STATE_ALIASES = {
    default: 'idle',
    normal: 'idle',
    happy: 'happy',
    greeting: 'wave',
    invite: 'wave',
    confused: 'thinking',
    wrong: 'sad'
};

function RobotSvg() {
    return (
        <svg className="robot-svg" viewBox="0 0 180 190" role="img" aria-label="DuoKod animatsiyali robot maskoti">
            <defs>
                <linearGradient id="robotBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#60a5fa" />
                    <stop offset="1" stopColor="#6d28d9" />
                </linearGradient>
                <linearGradient id="robotHead" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="1" stopColor="#dbeafe" />
                </linearGradient>
                <filter id="robotGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#4f46e5" floodOpacity=".25" />
                </filter>
            </defs>

            <g className="robot-antenna">
                <path d="M90 29V17" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                <circle className="robot-antenna-light" cx="90" cy="12" r="7" fill="#22d3ee" />
            </g>

            <g className="robot-leg robot-leg-left">
                <rect x="54" y="139" width="25" height="34" rx="12" fill="#475569" />
                <rect x="45" y="165" width="38" height="16" rx="8" fill="#1e293b" />
            </g>
            <g className="robot-leg robot-leg-right">
                <rect x="101" y="139" width="25" height="34" rx="12" fill="#475569" />
                <rect x="97" y="165" width="38" height="16" rx="8" fill="#1e293b" />
            </g>

            <g className="robot-arm robot-arm-left">
                <circle cx="39" cy="94" r="13" fill="#93c5fd" />
                <rect x="24" y="92" width="25" height="48" rx="12" fill="url(#robotBody)" />
                <circle cx="36" cy="142" r="12" fill="#e0f2fe" stroke="#60a5fa" strokeWidth="4" />
            </g>
            <g className="robot-arm robot-arm-right">
                <circle cx="141" cy="94" r="13" fill="#93c5fd" />
                <rect x="131" y="92" width="25" height="48" rx="12" fill="url(#robotBody)" />
                <circle cx="144" cy="142" r="12" fill="#e0f2fe" stroke="#60a5fa" strokeWidth="4" />
            </g>

            <g className="robot-body" filter="url(#robotGlow)">
                <rect x="47" y="83" width="86" height="70" rx="28" fill="url(#robotBody)" />
                <rect x="66" y="105" width="48" height="31" rx="12" fill="#172554" opacity=".72" />
                <circle cx="78" cy="120" r="5" fill="#22d3ee" />
                <circle cx="91" cy="120" r="5" fill="#facc15" />
                <circle cx="104" cy="120" r="5" fill="#f472b6" />
                <path d="M79 143h22" stroke="#bfdbfe" strokeWidth="5" strokeLinecap="round" />
            </g>

            <g className="robot-head" filter="url(#robotGlow)">
                <rect x="38" y="31" width="104" height="70" rx="29" fill="url(#robotHead)" stroke="#60a5fa" strokeWidth="5" />
                <rect x="51" y="45" width="78" height="43" rx="20" fill="#172554" />
                <g className="robot-eyes">
                    <ellipse className="robot-eye robot-eye-left" cx="74" cy="65" rx="8" ry="10" fill="#22d3ee" />
                    <ellipse className="robot-eye robot-eye-right" cx="106" cy="65" rx="8" ry="10" fill="#22d3ee" />
                </g>
                <path className="robot-mouth robot-mouth-happy" d="M78 78c7 7 17 7 24 0" fill="none" stroke="#a5f3fc" strokeWidth="4" strokeLinecap="round" />
                <path className="robot-mouth robot-mouth-sad" d="M78 82c7-7 17-7 24 0" fill="none" stroke="#fda4af" strokeWidth="4" strokeLinecap="round" />
            </g>
        </svg>
    );
}

function AnimatedRobot({ isFloating = false, customState, state: stateProp, className = '' }) {
    const context = useRobot();
    const requestedState = isFloating && context ? context.robotState.mood : (customState || stateProp || 'idle');
    const state = STATE_ALIASES[requestedState] || requestedState;
    const message = isFloating && context ? context.robotState.message : null;
    const showBubble = isFloating && context ? context.robotState.showBubble : false;
    const isVisible = isFloating && context ? context.robotState.isVisible : true;

    if (!isVisible) return null;

    const handleClick = () => {
        if (isFloating && context) context.triggerRobot('wave', 'Salom! Birgalikda kod yozamiz!', 3200);
    };

    const RobotBody = (
        <div className={`robot-container state-${state} ${className}`}>
            <AnimatePresence>
                {showBubble && message && (
                    <motion.div
                        className="robot-speech-bubble"
                        initial={{ opacity: 0, scale: 0.75, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    >
                        <p className="speech-text">{message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                key={state}
                className="robot-stage"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleClick}
            >
                {(state === 'happy' || state === 'celebration') && <div className="robot-particles" aria-hidden="true"><span>✦</span><span>★</span><span>✦</span></div>}
                {state === 'thinking' && <div className="robot-thought" aria-hidden="true">?</div>}
                {state === 'sleepy' && <div className="robot-sleep" aria-hidden="true">Z z</div>}
                <RobotSvg />
            </motion.div>
            <div className="robot-shadow-element" />
        </div>
    );

    return isFloating ? <div className="floating-robot-wrapper">{RobotBody}</div> : RobotBody;
}

export default AnimatedRobot;
