import { useState } from 'react';
import LearningPath from './LearningPath';
import FastLearn from './FastLearn';
import { COURSES } from '../data/lessons';
import { useUser } from '../context/UserContext';
import './LearningTab.css';

const courseResources = {
    html: [
        { title: 'A. Boymurodov, Sh. Allamova - "Web Texnologiyalari" (O\'quv qo\'llanma)', url: '/books/uzb/web_texnologiyalari_boymurodov.pdf' },
        { title: 'Farhod Fayzullayev - "Web dasturlash asoslari" (Kitob)', url: '/books/uzb/web_dasturlash.pdf' },
        { title: 'J. Nizomov, S. Aliqulov - "HTML va CSS yordamida web-sahifa ishlab chiqish" (Maqola)', url: '/books/uzb/html_css_maqola.pdf' },
        { title: 'Javlon Abdullo - "Mukammal Dasturlash (HTML & CSS)" (Kitob)', url: '/books/uzb/mukammal_dasturlash_1.pdf' }
    ],
    css: [
        { title: 'A. Boymurodov, Sh. Allamova - "Web Texnologiyalari" (O\'quv qo\'llanma)', url: '/books/uzb/web_texnologiyalari_boymurodov.pdf' },
        { title: 'J. Nizomov, S. Aliqulov - "HTML va CSS yordamida web-sahifa ishlab chiqish" (Maqola)', url: '/books/uzb/html_css_maqola.pdf' },
        { title: '"Zamonaviy Web Dizayn: Flexbox va Grid arxitekturasi"', url: '/books/uzb/css_flex_grid.pdf' },
        { title: 'Javlon Abdullo - "Mukammal Dasturlash (HTML & CSS)" (Kitob)', url: '/books/uzb/mukammal_dasturlash_1.pdf' }
    ],
    js: [
        { title: 'Ethan Brown - "Изучаем JavaScript" O\'Reilly (Rus tilida kitob)', url: '/books/uzb/izuchaem_js.pdf' },
        { title: 'V. Muslim - "JavaScript Darslari (Web designerlar uchun)" (Kitob)', url: '/books/uzb/javascript_darslari.pdf' },
        { title: 'Ismoilova Orzigul - "JavaScript Dasturlash Tili" (Maqola)', url: '/books/uzb/javascript_dasturlash.pdf' },
        { title: 'Q. Murtazayev, J. Jabborov - "Foydalanuvchi interfeysi texnologiyalari (React, Vue, Angular) tahlili" (Maqola)', url: '/books/uzb/interfeys_texnologiyalari.pdf' },
        { title: 'U. Madaminov, Sh. Bayramova - "Zamonaviy web texnologiyalar yordamida multimediali web ilova ishlab chiqish"', url: '/books/uzb/multimediali_web_ilova.pdf' }
    ],
    python: [
        { title: 'M.A. Bobojonova - "Python Dasturlash Tili" (O\'quv qo\'llanma)', url: '/books/uzb/python_bobojonova.pdf' },
        { title: 'Sh. Mengliyev - "Python Dasturlash tili" (O\'quv qo\'llanma)', url: '/books/uzb/python_dasturlash_mengliyev.pdf' },
        { title: 'A. Qodirov - "Python3 da dasturlash va Algoritmlar"', url: '/books/uzb/python_algoritmlar.pdf' },
        { title: '"Python tilida tabiiy tilni qayta ishlash (NLP) tizimlari" (ResearchGate maqola)', url: 'https://www.researchgate.net/publication/379754253_Python_dasturlash_tilida_tabiiy_tilni_qayta_ishlash_NLP_tizimlari' }
    ]
};

// Yordamchi oddiy komponent (Adabiyotlar)
function Literature({ courseId, onBack }) {
    const course = COURSES[courseId];
    const resources = courseResources[courseId] || [];

    return (
        <div className="literature-container" style={{ padding: '30px', color: 'white' }}>
            <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '20px' }}>⬅ Orqaga</button>
            <h1 style={{ color: '#ffffff', textShadow: `0 2px 4px rgba(0,0,0,0.8), 0 0 15px ${course.color}, 0 0 30px ${course.color}` }}>{course.title} - Ilmiy Adabiyotlar 📖</h1>
            
            <div className="literature-content" style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <h3>📚 Tavsiya etilgan qo'llanma:</h3>
                <ul className="resource-list" style={{ marginLeft: '10px', marginTop: '15px', listStyle: 'none', padding: 0 }}>
                    {resources.map((res, i) => (
                        <li key={i} style={{ marginBottom: '15px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '15px', borderLeft: `4px solid ${course.color}` }}>
                            <span style={{ fontSize: '1.5rem' }}>📖</span>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', transition: 'color 0.2s ease', cursor: 'pointer' }}
                               onMouseOver={e => e.target.style.color = course.color}
                               onMouseOut={e => e.target.style.color = '#fff'}
                            >
                                {res.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '30px', padding: '15px', borderLeft: `4px solid ${course.color}`, background: 'rgba(255,255,255,0.02)' }}>
                    <p style={{ fontStyle: 'italic', color: '#ccc', margin: 0 }}>
                        <strong style={{ color: '#fff' }}>Maslahat:</strong> Ustozlarsiz ham dasturchi bo'lish siri ko'p mutolaa qilishdadir. Yuqoridagi kitob o'z yo'nalishida eng kuchli manbalardan biridir.
                    </p>
                </div>
            </div>
        </div >
    );
}

function LearningTab({ onNodeClick, onBossStart, onClaimCertificate, onStartProject }) {
    const { stats, switchCourse } = useUser();
    const isAdmin = stats?.isAdmin || stats?.isSuperAdmin;
    
    // Ensure stats exists and fallback properly
    const initialCourse = stats?.currentCourse || null;
    const [selectedCourse, setSelectedCourse] = useState(initialCourse);
    const [selectedMode, setSelectedMode] = useState('gamification');

    const handleCourseSelect = (key) => {
        setSelectedCourse(key);
        if (switchCourse) switchCourse(key);
        setSelectedMode(null); 
    };

    // Safe fallback to prevent ANY React crashes if state gets corrupted
    if (selectedCourse && selectedMode) {
        if (selectedMode === 'gamification') {
            return (
                <LearningPath
                    selectedCourse={selectedCourse}
                    onNodeClick={onNodeClick}
                    onBossStart={onBossStart}
                    onClaimCertificate={onClaimCertificate}
                    onStartProject={onStartProject}
                    onBack={() => setSelectedMode(null)}
                />
            );
        }
        if (selectedMode === 'literature') {
            return <Literature courseId={selectedCourse} onBack={() => setSelectedMode(null)} />;
        }
        if (selectedMode === 'fast_learn') {
            return <FastLearn courseId={selectedCourse} onBack={() => setSelectedMode(null)} />;
        }
    }

    if (selectedCourse && !selectedMode) {
        const course = COURSES[selectedCourse];
        if (!course) {
            // Failsafe for corrupted course ID
            setSelectedCourse(null);
            return null;
        }
        return (
            <div className="mode-selector-container">
                <button className="back-btn-top" onClick={() => setSelectedCourse(null)}>⬅ Tillarga Qaytish</button>
                <div className="mode-header text-center">
                    <h1 style={{ color: '#ffffff', textShadow: `0 2px 4px rgba(0,0,0,0.8), 0 0 15px ${course.color}, 0 0 30px ${course.color}` }}>{course.title}</h1>
                    <p>O'zingizga qulay bo'lgan ta'lim rejimini tanlang</p>
                </div>
                <div className="modes-grid">
                    <div className="mode-card" onClick={() => setSelectedMode('literature')}>
                        <div className="mode-icon">📖</div>
                        <h3>Adabiyotlar</h3>
                        <p>Qo'shimcha darsliklar, chuqur ma'lumotlar va rasmiy dokumentatsiyalarni o'qish orqali poydevorni mustahkamlang.</p>
                    </div>
                    <div className="mode-card" onClick={() => setSelectedMode('fast_learn')}>
                        <div className="mode-icon" style={{ color: '#feca57' }}>⚡</div>
                        <h3>Tezkor O'rganish</h3>
                        <p>3 daqiqalik intensiv nazariya o'qiladi, so'ngra xotirani tekshiruvchi tezkor testlar beriladi.</p>
                    </div>
                    <div className="mode-card" onClick={() => setSelectedMode('gamification')}>
                        <div className="mode-icon" style={{ color: 'var(--accent-pink)' }}>🎮</div>
                        <h3>Geymifikatsiya</h3>
                        <p>O'yin uslubidagi izchil xarita! Bosqichma-bosqich XP yig'ib, qahramoningizni o'stiring va Loyiha yarating.</p>
                    </div>
                </div>
            </div >
        );
    }

    // Step 1: Course Selection
    const COURSE_KEYS = ['html', 'css', 'js', 'python'];
    return (
        <div className="course-selector-container">
            <div className="header-title text-center">
                <h2>Siz nima o'rganmoqchisiz?</h2>
                <p>O'zingiz qiziqqan yo'nalishni tanlang</p>
            </div>
            <div className="courses-grid">
                {COURSE_KEYS.map(key => {
                    const c = COURSES[key];
                    if (!c) return null;
                    const isLocked = !isAdmin && key !== 'python'; // Admins have all, others only Python
                    return (
                        <div
                            key={key}
                            className={`course-card ${isLocked ? 'course-card-locked' : ''}`}
                            style={{ '--card-color': isLocked ? '#444' : (c.color || '#fff') }}
                            onClick={() => !isLocked && handleCourseSelect(key)}
                        >
                            <div className="course-icon" style={{ opacity: isLocked ? 0.4 : 1 }}>{c.title ? c.title.charAt(0) : 'C'}</div>
                            <h3 style={{ opacity: isLocked ? 0.5 : 1 }}>{c.title || 'Kurs'}</h3>
                            {isLocked ? (
                                <div className="course-locked-badge">🔒 Tez kunda</div>
                            ) : (
                                <button className="start-btn" style={{ backgroundColor: c.color || '#fff', color: '#000' }}>Tanlash</button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LearningTab;
