import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Mascot from './Mascot';
import { COURSES } from '../data/lessons';
import './FastLearn.css';

function FastLearn({ courseId, onBack }) {
    const { addXp, addHeart } = useUser();
    const course = COURSES[courseId];
    const [phase, setPhase] = useState('reading'); // reading, quiz, result
    const [timeLeft, setTimeLeft] = useState(180);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    // Mock theory & questions based on courseId
    const theoryText = courseId === 'html'
        ? "HTML (HyperText Markup Language) — veb-sahifalarni yaratish uchun ishlatiladigan standart belgilash tili. U sahifaning tuzilishini (skeletini) belgilaydi. Asosiy teglar: <html>, <head>, <body>, <h1>-<h6>, <p>, <a>, <img>."
        : courseId === 'css'
            ? "CSS (Cascading Style Sheets) - sahifani bezash (rang, o'lcham, joylashuv) uchun xizmat qiladi. CSS dagi klasslar '.' (nuqta) bilan, id lar esa '#' (panjara) bilan belgilanadi."
            : courseId === 'js'
                ? "JavaScript - sahifani dinamik va interaktiv (harakatlanuvchi) qilish uchun ishlatiladi. JS da ma'lumot saqlash uchun 'let' va 'const' o'zgaruvchilari ishlatiladi."
                : "Tanlangan til uchun qisqacha nazariy ma'lumotlar bu yerda aks etadi. Eslab qoling, har bir detal muhim!";

    // Generate 3 mock questions based on course
    const questionsList = {
        html: [
            { q: "Hujjatning qaysi qismi ko'rinmas ma'lumotlarni saqlaydi?", options: ["<body>", "<head>", "<footer>"], a: 1 },
            { q: "Asosiy sarlavha qaysi teg orqali yoziladi?", options: ["<title>", "<header>", "<h1>"], a: 2 },
            { q: "Havola (link) qo'shish uchun qaysi teg ishlatiladi?", options: ["<a>", "<link>", "<href>"], a: 0 }
        ],
        css: [
            { q: "Klasslarga (.class) CSS orqali murojaat nima bilan boshlanadi?", options: ["#", ".", "&"], a: 1 },
            { q: "Matn rangini o'zgartirish qaysi xususiyat orqali bo'ladi?", options: ["color", "font-color", "text-style"], a: 0 },
            { q: "Orqa fonni bo'yash nima deb nomlanadi?", options: ["bgcolor", "background", "canvas"], a: 1 }
        ],
        js: [
            { q: "O'zgaruvchi e'lon qilish uchun to'g'ri kalit so'z qaysi?", options: ["var", "let", "ikkalasi ham"], a: 2 },
            { q: "Ekranga ma'lumot chiqarish qaysi funksiya?", options: ["console.log()", "print()", "write()"], a: 0 },
            { q: "Qat'iy (o'zgarmas) qiymat qay holatda saqlanadi?", options: ["const", "let", "static"], a: 0 }
        ],
        python: [
            { q: "Ekranga nimadir chop etish uchun nima ishlatiladi?", options: ["echo", "console.log", "print"], a: 2 },
            { q: "Python da ro'yxat (list) nima bilan yoziladi?", options: ["{}", "()", "[]"], a: 2 },
            { q: "O'zgaruvchilar oldiga let yoki var yozish shartmi?", options: ["Ha, shart", "Yo'q, shart emas", "Faqat var stharti"], a: 1 }
        ]
    };

    const questions = questionsList[courseId] || questionsList['html'];

    useEffect(() => {
        if (phase === 'reading' && timeLeft > 0) {
            const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(t);
        } else if (phase === 'reading' && timeLeft === 0) {
            setPhase('quiz');
        }
    }, [phase, timeLeft]);

    const handleAnswer = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
        
        const isCorrect = index === questions[currentQuestion].a;
        if (isCorrect) setScore(s => s + 1);

        const finalScore = isCorrect ? score + 1 : score;

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedOption(null);
            } else {
                setPhase('result');
                const earnedXp = finalScore * 10;
                if (earnedXp > 0) addXp(earnedXp);
                // Mukammal ishlaganiga 5 tanga beramiz
                if (finalScore === questions.length && addHeart) {
                    addHeart(5);
                }
            }
        }, 1000);
    };

    if (phase === 'reading') {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        return (
            <div className="fast-learn-container">
                <button className="back-btn-top" onClick={onBack}>⬅ Orqaga</button>
                <div className="timer-header">
                    <h2>Diqqat qiling!</h2>
                    <div className="countdown">⏳ {mins}:{secs.toString().padStart(2, '0')}</div>
                </div>
                <div className="theory-card">
                    <Mascot state="thinking" message="Vaqtingiz ketmoqda! Quyidagi ma'lumotlarni idrok qilib, yodlab qolishga harakat qiling." />
                    <p className="theory-text">{theoryText}</p>
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button className="btn btn-primary btn-large" onClick={() => setPhase('quiz')}>O'qib bo'ldim (Testga o'tish) ⚡</button>
                </div>
            </div>
        );
    }

    if (phase === 'quiz') {
        const currentQ = questions[currentQuestion];
        return (
            <div className="fast-learn-container">
                <div className="quiz-header">
                    <h3>Tezkor Sinov: {currentQuestion + 1} / {questions.length}</h3>
                </div>
                <div className="quiz-question-card">
                    <h2>{currentQ.q}</h2>
                    <div className="quiz-options">
                        {currentQ.options.map((opt, i) => {
                            let className = "quiz-option-btn ";
                            if (selectedOption !== null) {
                                if (i === currentQ.a) className += "correct";
                                else if (i === selectedOption) className += "wrong";
                            }
                            return (
                                <button
                                    key={i}
                                    className={className}
                                    onClick={() => handleAnswer(i)}
                                    disabled={selectedOption !== null}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'result') {
        return (
            <div className="fast-learn-container text-center">
                <h1 className="success-glow" style={{ fontSize: '4rem', marginTop: '50px' }}>Yakunlandi!</h1>
                <div className="score-box" style={{ fontSize: '2rem', margin: '30px 0' }}>
                    Sizning Natija: <strong style={{ color: score === questions.length ? 'var(--accent)' : '#ff4b4b' }}>{score} / {questions.length}</strong>
                </div>
                <Mascot 
                    state={score === questions.length ? "happy" : score > 0 ? "idle" : "sad"} 
                    message={score === questions.length ? "Ajoyib xotira! +30 XP va +5 Tanga yutdingiz!" : score > 0 ? `Yomon emas! +${score * 10} XP yutdingiz.` : "Afsus, umuman to'g'ri topolmadingiz! Ko'proq o'qib yana urining."} 
                />
                <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '40px', padding: '15px 40px', fontSize: '1.2rem' }}>Menyuga Qaytish</button>
            </div>
        );
    }

    return null;
}

export default FastLearn;
