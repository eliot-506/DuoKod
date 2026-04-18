import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Mascot from './Mascot';
import './ProjectMode.css';

const PROJECT_STEPS = [
    {
        title: "1. Asosiy Qutini Yaratamiz",
        text: "Kodni yozishga tayyormisiz? Dastlab HTML orqali ilovamizning asosiy konteynerini yozamiz.",
        instruction: "HTML fayliga quyidagi kodni yozing:\n<div class=\"todo-app\">\n  <h1>Mening Vazifalarim</h1>\n</div>",
        validation: (html) => html.includes('todo-app') && html.includes('Mening Vazifalarim')
    },
    {
        title: "2. Input va Tugma Qo'shamiz",
        text: "Foydalanuvchi yangi vazifani yozishi uchun bizga Input va uni tizimga qo'shuvchi Button kerak bo'ladi.",
        instruction: "HTML da <h1> tagidan so'ng yozing:\n<input id=\"taskInput\" placeholder=\"Yangi vazifa...\">\n<button onclick=\"addTask()\">Qo'shish</button>\n<ul id=\"taskList\"></ul>",
        validation: (html) => html.includes('taskInput') && html.includes('button') && html.includes('taskList')
    },
    {
        title: "3. Dizayn Beramiz (CSS)",
        text: "Ilovamiz zerikarli ko'rinmasligi uchun unga CSS orqali rang va shakl beramiz.",
        instruction: "CSS oopiga yozing:\n.todo-app {\n  background: #2a2d3e;\n  padding: 20px;\n  border-radius: 15px;\n  color: white;\n}",
        validation: (html, css) => css.includes('.todo-app') && css.includes('background')
    },
    {
        title: "4. JavaScript Mantiqi",
        text: "Endi eng qizig'i! Tugma bosilganda yangi elementni ro'yxatga qo'shuvchi funksiyani yozamiz.",
        instruction: "JS oopiga yozing:\nfunction addTask() {\n  let val = document.getElementById('taskInput').value;\n  if(val) {\n    document.getElementById('taskList').innerHTML += '<li>' + val + '</li>';\n    document.getElementById('taskInput').value = '';\n  }\n}",
        validation: (html, css, js) => js.includes('addTask') && js.includes('innerHTML') && js.includes('getElementById')
    }
];

function ProjectMode({ onExit }) {
    const { addXp } = useUser();
    const [currentStep, setCurrentStep] = useState(0);
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState('html');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>
                            body { font-family: sans-serif; display: flex; justify-content: center; margin-top: 2rem; background: #000; }
                            ${css}
                        </style>
                    </head>
                    <body>
                        ${html}
                        <script>${js}</script>
                    </body>
                </html>
            `);
        }, 500);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const handleCheckStep = () => {
        const step = PROJECT_STEPS[currentStep];
        if (step.validation(html, css, js)) {
            if (currentStep < PROJECT_STEPS.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                setIsCompleted(true);
                addXp(500);
            }
        } else {
            alert("Dev: Kodda xatolik bor yoki talab qilingan elementlar mavjud emas. Instruksiyani tekshirib qayta yozing!");
        }
    };

    if (isCompleted) {
        return (
            <div className="project-container completed-view">
                <div className="confetti-effect"></div>
                <h1 className="success-glow">Loyiha Muvaffaqiyatli Yakunlandi! 🎉</h1>
                <Mascot state="happy" message="Qoyilmaqom! 🥳 Siz mustaqil ravishda HTML, CSS, JS larni ulab To-Do dasturini yaratdingiz! +500 XP bonus sening hisobingga qo'shildi!" />
                <button className="btn btn-primary mt-20 p-20 text-large" onClick={onExit}>Asosiy Oynaga Qaytish 🔙</button>
            </div>
        );
    }

    const stepInfo = PROJECT_STEPS[currentStep];

    return (
        <div className="project-container">
            <div className="project-header">
                <button className="back-btn" onClick={onExit}>⬅ Chiqish</button>
                <h2>🚀 To-Do Dasturini Ishlab Chiqish ({currentStep + 1} / {PROJECT_STEPS.length})</h2>
                <div className="step-progress-wrapper">
                    <div className="step-progress" style={{ width: `${((currentStep) / PROJECT_STEPS.length) * 100}%` }}></div>
                </div>
            </div>

            <div className="project-split-view">
                <div className="project-instructions">
                    <Mascot state="thinking" message={stepInfo.text} />
                    <div className="instruction-card">
                        <h3>{stepInfo.title}</h3>
                        <pre className="code-hint">{stepInfo.instruction}</pre>
                    </div>
                </div>

                <div className="project-workspace">
                    <div className="arena-tabs">
                        <button className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`} onClick={() => setActiveTab('html')}>HTML</button>
                        <button className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>CSS</button>
                        <button className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>JS</button>
                        <button className="run-btn" onClick={handleCheckStep}>Tekshirish ✔</button>
                    </div>

                    <div className="editor-pane project-editor">
                        {activeTab === 'html' && (
                            <textarea value={html} onChange={(e) => setHtml(e.target.value)} className="code-input html-editor" spellCheck="false" placeholder="<!-- HTML kodini shu yerg yozing... -->" />
                        )}
                        {activeTab === 'css' && (
                            <textarea value={css} onChange={(e) => setCss(e.target.value)} className="code-input css-editor" spellCheck="false" placeholder="/* CSS kodingiz... */" />
                        )}
                        {activeTab === 'js' && (
                            <textarea value={js} onChange={(e) => setJs(e.target.value)} className="code-input js-editor" spellCheck="false" placeholder="// JavaScript mantiqi..." />
                        )}
                    </div>

                    <div className="arena-output-section project-preview">
                        <div className="output-header">Live Preview ⚡ Natija darhol shu yerda chiqadi</div>
                        <iframe
                            srcDoc={srcDoc}
                            title="Live Preview"
                            sandbox="allow-scripts allow-modals"
                            className="arena-iframe"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectMode;
