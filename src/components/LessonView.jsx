import { useState, useEffect } from 'react'
import './LessonView.css'
import './FillBlanksLesson.css'
import { useUser } from '../context/UserContext'
import Mascot from './Mascot'
import DragDropLesson from './DragDropLesson'

import { COURSES } from '../data/lessons'
import { playSuccessSound, playErrorSound } from '../utils/audio'
import { getMentorHint } from '../utils/aiMentor'

function LessonView({ onComplete, onExit, lessonId }) {
    const [phase, setPhase] = useState('theory') // 'theory' or 'quiz'
    const [currentTheoryIndex, setCurrentTheoryIndex] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedId, setSelectedId] = useState(null)
    const [fillValue, setFillValue] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [hintLevel, setHintLevel] = useState(0)

    const { stats, updateSkill } = useUser()
    const activeCourseData = COURSES[stats.currentCourse].data;
    const questionData = activeCourseData.find(l => l.id === lessonId) || activeCourseData[0];

    // Adaptive Boss Logic
    const isBossNode = questionData.id === activeCourseData[activeCourseData.length - 1].id;
    const [bossQuestions, setBossQuestions] = useState(null);

    useEffect(() => {
        if (isBossNode && !bossQuestions) {
            const courseSkills = stats.skillMap[stats.currentCourse] || {};
            const sortedSkills = Object.keys(courseSkills).sort((a, b) => courseSkills[a] - courseSkills[b]);
            const targetSkills = sortedSkills.slice(0, 2); // 2 lowest skills

            let adaptiveDocs = [];
            activeCourseData.forEach(module => {
                module.questions.forEach(q => {
                    if (q.skill && targetSkills.includes(q.skill)) {
                        adaptiveDocs.push({ ...q, isBoss: true });
                    }
                });
            });

            adaptiveDocs = adaptiveDocs.sort(() => 0.5 - Math.random()).slice(0, 5);
            if(adaptiveDocs.length === 0) adaptiveDocs = questionData.questions;

            setBossQuestions(adaptiveDocs);
        }
    }, [isBossNode, stats.currentCourse, stats.skillMap, activeCourseData, questionData.questions, bossQuestions]);

    const activeQuestions = isBossNode && bossQuestions ? bossQuestions : questionData.questions;

    useEffect(() => {
        setPhase('theory');
        setCurrentTheoryIndex(0);
        setCurrentQuestionIndex(0);
        setSelectedId(null);
        setFillValue('');
        setIsChecked(false);
        setIsCorrect(false);
        setHintLevel(0);
        setBossQuestions(null);
    }, [lessonId]);

    const handleCheck = () => {
        setIsChecked(true)
        let isAnswerCorrect = false;
        const currentQuestion = activeQuestions[currentQuestionIndex];

        if (currentQuestion.type === 'multiple-choice') {
            isAnswerCorrect = selectedId === currentQuestion.correctId;
        } else if (currentQuestion.type === 'fill-blanks') {
            isAnswerCorrect = fillValue.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
        } else if (currentQuestion.type === 'code-fix' || currentQuestion.type === 'code-write' || currentQuestion.type === 'drag-reorder') {
            // Remove all spaces for strict comparison of code structures
            const userSanitized = fillValue.replace(/\s+/g, '').toLowerCase();
            const correctSanitized = currentQuestion.correctAnswer.replace(/\s+/g, '').toLowerCase();
            isAnswerCorrect = userSanitized === correctSanitized && userSanitized.length > 0;
        }

        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            playSuccessSound();
            if (currentQuestion.skill && updateSkill) {
                updateSkill(stats.currentCourse, currentQuestion.skill, 5);
            }
        } else {
            playErrorSound();
            setHintLevel(0);
            if (currentQuestion.skill && updateSkill) {
                updateSkill(stats.currentCourse, currentQuestion.skill, -3);
            }
        }
    }

    const handleNext = () => {
        if (phase === 'theory') {
            if (currentTheoryIndex < questionData.theory.length - 1) {
                setCurrentTheoryIndex(prev => prev + 1);
            } else {
                setPhase('quiz');
                const firstQ = activeQuestions[0];
                setFillValue(firstQ.type === 'code-fix' ? firstQ.initialCode : '');
            }
        } else {
            if (isCorrect && currentQuestionIndex < activeQuestions.length - 1) {
                // Keyingi savolga o'tish
                const nextIndex = currentQuestionIndex + 1;
                const nextQ = activeQuestions[nextIndex];
                setCurrentQuestionIndex(nextIndex);
                setIsChecked(false);
                setIsCorrect(false);
                setSelectedId(null);
                setHintLevel(0);
                setFillValue(nextQ.type === 'code-fix' ? nextQ.initialCode : '');
            } else if (isCorrect && currentQuestionIndex === activeQuestions.length - 1) {
                // Oxirgi savolda tugatish
                onComplete(isCorrect);
            } else {
                // Biz Dulingoga ohshab joyida to'g'rilashga bermasdan pastga tugmani "Davom etish" qilsak qanday?
                // Hozir agar false botsa tekshirish yana qaytarilsin.
                setIsChecked(false);
                setSelectedId(null);
                setHintLevel(0);
                // fillValue qoladi (kodni o'chirmaslik uchun)
            }
        }
    }

    const renderTheory = () => (
        <div className="theory-container">
            <Mascot state="default" message="Yangi mavzuni o'rganamiz!" />
            <div className="theory-card">
                <h3>{questionData.title}</h3>
                <p>{questionData.theory[currentTheoryIndex]}</p>
                <div className="theory-pagination">
                    {currentTheoryIndex + 1} / {questionData.theory.length}
                </div>
            </div>
        </div>
    );

    const renderQuizOptions = () => {
        const currentQuestion = activeQuestions[currentQuestionIndex];

        if (currentQuestion.type === 'multiple-choice') {
            return (
                <div className="lesson-options">
                    {currentQuestion.options.map((opt) => (
                        <button
                            key={opt.id}
                            className={`option-btn 
                ${selectedId === opt.id ? 'selected' : ''} 
                ${isChecked && opt.id === currentQuestion.correctId ? 'correct' : ''}
                ${isChecked && selectedId === opt.id && !isCorrect ? 'incorrect' : ''}
              `}
                            onClick={() => !isChecked && setSelectedId(opt.id)}
                            disabled={isChecked}
                        >
                            <span className="option-number">{opt.id.toUpperCase()}</span>
                            {opt.text}
                        </button>
                    ))}
                </div>
            )
        }

        if (currentQuestion.type === 'fill-blanks') {
            return (
                <div className="fill-blanks-container">
                    <div className="code-editor-mock">
                        <span className="code-text">{currentQuestion.codeBefore}</span>
                        <input
                            type="text"
                            className={`fill-input ${isChecked ? (isCorrect ? 'correct-input' : 'incorrect-input') : ''}`}
                            value={fillValue}
                            onChange={(e) => setFillValue(e.target.value)}
                            disabled={isChecked}
                            placeholder="___"
                            autoFocus
                        />
                        <span className="code-text">{currentQuestion.codeAfter}</span>
                    </div>
                </div>
            )
        }
        if (currentQuestion.type === 'code-fix' || currentQuestion.type === 'code-write') {
            return (
                <div className="code-editor-container">
                    <textarea
                        className={`code-textarea ${isChecked ? (isCorrect ? 'correct-input' : 'incorrect-input') : ''}`}
                        value={fillValue}
                        onChange={(e) => setFillValue(e.target.value)}
                        disabled={isChecked}
                        placeholder={currentQuestion.placeholder || "Kodni bu yerga yozing..."}
                        autoFocus
                    />
                </div>
            )
        }
        if (currentQuestion.type === 'drag-reorder') {
            return (
                <DragDropLesson
                    blocks={currentQuestion.options}
                    correctAnswer={currentQuestion.correctAnswer}
                    isChecked={isChecked}
                    isCorrect={isCorrect}
                    terminalOutput={currentQuestion.terminalOutput}
                    onChange={(val) => setFillValue(val)}
                />
            )
        }
    }

    const renderQuiz = () => {
        const currentQuestion = activeQuestions[currentQuestionIndex];
        return (
            <div className={`quiz-container ${isBossNode ? 'boss-arena-mode' : ''}`}>
                {isBossNode && (
                    <div className="boss-fight-header">
                        <div className="fighter-card user-fighter">
                            <span className="fighter-name">Siz (Dasturchi)</span>
                            <div className="hp-bar-bg"><div className="hp-bar-fill user-hp" style={{ width: `${Math.max(0, Math.min(100, (stats.hearts / 50) * 100))}%` }}></div></div>
                        </div>
                        <div className="vs-badge">VS</div>
                        <div className="fighter-card boss-fighter">
                            <span className="fighter-name">Kiber Boss</span>
                            <div className="hp-bar-bg"><div className="hp-bar-fill boss-hp" style={{ width: `${Math.max(0, 100 - (currentQuestionIndex * (100 / activeQuestions.length)) - (isChecked && isCorrect ? (100 / activeQuestions.length) : 0))}%` }}></div></div>
                        </div>
                    </div>
                )}

                <div className="mascot-quiz-wrapper">
                    {isBossNode ? (
                        <div className={`boss-avatar ${isChecked && isCorrect ? 'boss-hurt glow-red' : 'glow-dark'}`}>
                            <i className="fa-solid fa-robot boss-icon"></i>
                            <div className="boss-dialogue">
                                {isChecked ? 
                                    (isCorrect ? "Argh! Bu zarba qattiq bo'ldi..." : "Ha ha ha! Kutgan edim! Aytgandim senga!") 
                                    : "Sening zaif joyingni kompyuterim topdi! Qani, buni top-chi!"}
                            </div>
                        </div>
                    ) : (
                        isChecked ? (
                            <Mascot
                                state={isCorrect ? 'happy' : 'sad'}
                                message={isCorrect ? 'Ajoyib! Juda to\'g\'ri' : getMentorHint(currentQuestion, selectedId || fillValue, hintLevel)}
                            />
                        ) : (
                            <Mascot state="thinking" message="Qani, o'ylab ko'ringchi..." />
                        )
                    )}
                </div>
                <h2 className="lesson-prompt" style={{ color: isBossNode ? '#ff1744' : '' }}>{isBossNode ? '⚠️ BOSS HUJUMI: ' : ''}{currentQuestion.prompt}</h2>
                {renderQuizOptions()}
            </div>
        );
    };

    const currentQuestion = phase === 'quiz' ? activeQuestions[currentQuestionIndex] : null;
    const isCheckDisabled = phase === 'quiz' ? (
        currentQuestion.type === 'multiple-choice' ? !selectedId : fillValue.trim() === ''
    ) : false;

    // Progress Bar: Umumiy savollar soni va ishlanganlariga qarab
    const totalSteps = questionData.theory.length + activeQuestions.length;
    const currentStep = phase === 'theory' ? currentTheoryIndex : questionData.theory.length + currentQuestionIndex;
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="lesson-container new-layout">
            <div className="lesson-stage">
                <div className="lesson-header">
                    <button className="lesson-exit-btn" onClick={onExit}>✕</button>
                    <div className="lesson-progress-bar">
                        <div className="lesson-progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <div className="lesson-hearts">
                        <i className="fa-solid fa-heart"></i> {stats.hearts}
                    </div>
                </div>

                <div className="lesson-content">
                    {phase === 'theory' ? renderTheory() : renderQuiz()}
                </div>

                <div className={`lesson-footer ${isChecked && phase === 'quiz' ? (isCorrect ? 'footer-correct' : 'footer-incorrect') : ''}`}>
                    <div className="footer-content">
                        {phase === 'theory' ? (
                            <div className="feedback-message theory-helper">
                                <p>Tayyor bo'lsangiz, keyingi qadamga o'tamiz.</p>
                            </div>
                        ) : (
                            isChecked && phase === 'quiz' ? (
                                <div className="feedback-message">
                                    <h3>{isCorrect ? 'To\'g\'ri!' : 'Xato javob!'}</h3>
                                    <p>{isCorrect ? 'Qoyilmaqom, davom etamiz 🎉' : 'Robot qahramon fikriga e\'tibor bering'}</p>
                                </div>
                            ) : (
                                <div className="feedback-placeholder"></div>
                            )
                        )}

                        <div className="button-group" style={{ display: 'flex', gap: '15px' }}>
                            {isChecked && phase === 'quiz' && !isCorrect && hintLevel < 3 && (
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setHintLevel(prev => prev + 1)}
                                    style={{ background: 'var(--surface)', color: 'var(--accent-pink)', borderColor: 'var(--accent-pink)' }}
                                >
                                    💡 Yordam So'rash ({3 - hintLevel})
                                </button>
                            )}
                            <button
                                className={`btn btn-primary check-btn ${phase === 'quiz' && isCheckDisabled && !isChecked ? 'disabled' : ''}`}
                                onClick={phase === 'theory' || isChecked ? handleNext : handleCheck}
                                disabled={phase === 'quiz' && !isChecked && isCheckDisabled}
                            >
                                {phase === 'theory' ? "Tushunarli, Davom etish" : (isChecked ? (isCorrect ? 'Davom etish' : 'Tushundim, Qayta urinish') : 'Tekshirish')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonView
