import './CourseSelector.css'
import { COURSES } from '../data/lessons'
import { useUser } from '../context/UserContext'

const COURSE_META = {
    html:   { icon: '🧱', desc: "Web sahifalar qanday qurilishini o'rganing. Barcha dasturchilar boshlashi kerak bo'lgan joy.", level: "Boshlang'ich", accent: '#E24C26' },
    css:    { icon: '🎨', desc: "Chiroyli interfeyslar yarating. Rang, animatsiya va flexbox bilan ishlashni o'rganing.", level: "O'rta", accent: '#2563EB' },
    js:     { icon: '⚡', desc: "Saytlarni interaktiv qiling. Dunyoning eng mashhur dasturlash tili bilan tanishing.", level: "O'rta", accent: '#D97706' },
    python: { icon: '🐍', desc: "Eng qulay va kuchli til bilan kodlashni boshlang. AI, ma'lumotlar va web uchun ideal.", level: "Boshlang'ich", accent: '#2563EB' },
};

const LESSONS_COUNT = { html: 12, css: 10, js: 15, python: 11 };

function CourseSelector({ onSelectCourse }) {
    const { stats, switchCourse, isAdmin } = useUser();
    const courseIds = Object.keys(COURSES);

    const handleCourseClick = (courseId) => {
        switchCourse(courseId);
        onSelectCourse();
    };

    const getProgress = (courseId) => {
        const total = COURSES[courseId]?.data?.length || 1;
        const completed = stats?.courses?.[courseId]?.completedNodes?.length || 0;
        return Math.floor((completed / total) * 100);
    };

    return (
        <div className="csel-page">
            {/* Header */}
            <div className="csel-header">
                <p className="csel-eyebrow">DuoKod Platform</p>
                <h1 className="csel-title">Siz nima o'rganmoqchisiz?</h1>
                <p className="csel-subtitle">O'zingizga mos yo'nalishni tanlang va bugunoq boshlang</p>
            </div>

            {/* 2×2 grid */}
            <div className="csel-grid">
                {courseIds.map((id) => {
                    const course = COURSES[id];
                    const meta = COURSE_META[id] || {};
                    const isLocked = !isAdmin && id !== 'python';
                    const isActive = stats?.currentCourse === id;
                    const progress = getProgress(id);
                    const lessons = LESSONS_COUNT[id] || 10;

                    return (
                        <div
                            key={id}
                            className={`csel-card${isLocked ? ' csel-card--locked' : ''}${isActive ? ' csel-card--active' : ''}`}
                            style={{ '--accent': isLocked ? '#CBD5E1' : meta.accent }}
                            onClick={() => !isLocked && handleCourseClick(id)}
                            role="button"
                            tabIndex={isLocked ? -1 : 0}
                            aria-disabled={isLocked}
                        >
                            {/* Top row: icon + badge */}
                            <div className="csel-top">
                                <div className="csel-icon-wrap" style={{ background: isLocked ? '#F1F5F9' : `${meta.accent}18` }}>
                                    <span className="csel-icon">{meta.icon || '📚'}</span>
                                </div>
                                {isLocked ? (
                                    <span className="csel-badge csel-badge--locked">🔒 Tez kunda</span>
                                ) : isActive ? (
                                    <span className="csel-badge csel-badge--active">✓ Faol</span>
                                ) : (
                                    <span className="csel-badge csel-badge--level">{meta.level}</span>
                                )}
                            </div>

                            {/* Name + description */}
                            <h3 className="csel-name" style={{ opacity: isLocked ? 0.45 : 1 }}>
                                {course?.title || id}
                            </h3>
                            <p className="csel-desc" style={{ opacity: isLocked ? 0.35 : 1 }}>
                                {meta.desc}
                            </p>

                            {/* Meta: lessons + time */}
                            <div className="csel-meta">
                                <span className="csel-meta-item">📚 {lessons} ta dars</span>
                                <span className="csel-meta-item">⏱ ~{lessons * 8} daqiqa</span>
                            </div>

                            {/* Progress bar for active/started courses */}
                            {!isLocked && progress > 0 && (
                                <div className="csel-progress">
                                    <div className="csel-progress-bar">
                                        <div className="csel-progress-fill" style={{ width: `${progress}%`, background: meta.accent }}/>
                                    </div>
                                    <span className="csel-progress-label">{progress}% bajarildi</span>
                                </div>
                            )}

                            {/* CTA */}
                            {!isLocked && (
                                <button className="csel-btn">
                                    {isActive ? 'Davom etish →' : 'Boshlash →'}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CourseSelector;
