import './CourseSelector.css'
import { useUser } from '../context/UserContext'
import { useCourseContent } from '../context/CourseContentContext'

const COURSE_META = {
    html: { icon: 'fa-code', desc: "Web sahifalar qanday qurilishini o'rganing. Barcha dasturchilar boshlashi kerak bo'lgan joy.", level: "Boshlang'ich", accent: '#E24C26' },
    css: { icon: 'fa-palette', desc: "Chiroyli interfeyslar yarating. Rang, animatsiya va flexbox bilan ishlashni o'rganing.", level: "O'rta", accent: '#2563EB' },
    js: { icon: 'fa-bolt', desc: "Saytlarni interaktiv qiling. Dunyoning eng mashhur dasturlash tili bilan tanishing.", level: "O'rta", accent: '#D97706' },
    python: { icon: 'fa-terminal', desc: "Eng qulay va kuchli til bilan kodlashni boshlang. AI, ma'lumotlar va web uchun ideal.", level: "Boshlang'ich", accent: '#2563EB' },
}

const LESSONS_COUNT = { html: 12, css: 10, js: 15, python: 11 }

function CourseSelector({ onSelectCourse }) {
    const { stats, switchCourse } = useUser()
    const { courses } = useCourseContent()
    const courseIds = Object.keys(courses)
    const hasPremiumAccess = stats?.isAdmin || (!stats?.isSuperAdmin && stats?.isPremium)

    const handleCourseClick = (courseId) => {
        switchCourse(courseId)
        onSelectCourse(courseId)
    }

    const handleCourseKeyDown = (event, courseId, isLocked) => {
        if (isLocked) return
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleCourseClick(courseId)
        }
    }

    const getProgress = (courseId) => {
        const total = courses[courseId]?.data?.length || 1
        const completed = stats?.courses?.[courseId]?.completedNodes?.filter(nodeId => Number(nodeId) < 100).length || 0
        return Math.floor((completed / total) * 100)
    }

    return (
        <div className="csel-page">
            <div className="csel-header">
                <p className="csel-eyebrow">DuoKod Platform</p>
                <h1 className="csel-title">Qaysi dasturlash tilini o'rganasiz?</h1>
                <p className="csel-subtitle">Tilni tanlang va o'quv xaritasi bo'ylab boshlang</p>
            </div>

            <div className="csel-grid">
                {courseIds.map((id) => {
                    const course = courses[id]
                    const meta = COURSE_META[id] || {}
                    const isLocked = !hasPremiumAccess && id !== 'python'
                    const isActive = stats?.currentCourse === id
                    const progress = getProgress(id)
                    const lessons = LESSONS_COUNT[id] || 10

                    return (
                        <div
                            key={id}
                            className={`csel-card${isLocked ? ' csel-card--locked' : ''}${isActive ? ' csel-card--active' : ''}`}
                            style={{ '--accent': isLocked ? '#CBD5E1' : meta.accent }}
                            onClick={() => !isLocked && handleCourseClick(id)}
                            onKeyDown={(event) => handleCourseKeyDown(event, id, isLocked)}
                            role="button"
                            tabIndex={isLocked ? -1 : 0}
                            aria-disabled={isLocked}
                        >
                            <div className="csel-top">
                                <div className="csel-icon-wrap" style={{ background: isLocked ? '#F1F5F9' : `${meta.accent}18` }}>
                                    <span className="csel-icon"><i className={`fa-solid ${meta.icon || 'fa-book-open'}`}></i></span>
                                </div>
                                {isLocked ? (
                                    <span className="csel-badge csel-badge--locked"><i className="fa-solid fa-lock"></i> Tez kunda</span>
                                ) : isActive ? (
                                    <span className="csel-badge csel-badge--active"><i className="fa-solid fa-check"></i> Faol</span>
                                ) : (
                                    <span className="csel-badge csel-badge--level">{meta.level}</span>
                                )}
                            </div>

                            <h3 className="csel-name" style={{ opacity: isLocked ? 0.45 : 1 }}>
                                {course?.title || id}
                            </h3>
                            <p className="csel-desc" style={{ opacity: isLocked ? 0.35 : 1 }}>
                                {meta.desc}
                            </p>

                            <div className="csel-meta">
                                <span className="csel-meta-item"><i className="fa-solid fa-book-open"></i> {lessons} ta dars</span>
                                <span className="csel-meta-item"><i className="fa-solid fa-clock"></i> ~{lessons * 8} daqiqa</span>
                            </div>

                            {!isLocked && progress > 0 && (
                                <div className="csel-progress">
                                    <div className="csel-progress-bar">
                                        <div className="csel-progress-fill" style={{ width: `${progress}%`, background: meta.accent }} />
                                    </div>
                                    <span className="csel-progress-label">{progress}% bajarildi</span>
                                </div>
                            )}

                            {!isLocked && (
                                <button className="csel-btn" type="button">
                                    {isActive ? 'Davom etish' : 'Boshlash'} <i className="fa-solid fa-arrow-right"></i>
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CourseSelector
