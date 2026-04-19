import './CourseSelector.css'
import { COURSES } from '../data/lessons'
import { useUser } from '../context/UserContext'

function CourseSelector({ onSelectCourse }) {
    const { stats, switchCourse } = useUser();
    const courseList = Object.values(COURSES);

    const handleCourseClick = (courseId) => {
        switchCourse(courseId);
        onSelectCourse();
    };

    const calculateProgress = (courseId) => {
        const total = COURSES[courseId].data.length;
        const completed = stats.courses[courseId]?.completedNodes.length || 0;
        return Math.floor((completed / total) * 100);
    };

    return (
        <div className="course-selector-container">
            <div className="course-selector-header">
                <h2>Yo'nalishni tanlang</h2>
                <p>O'zingizga qiziqarli dasturlash tilidan boshlang</p>
            </div>

            <div className="courses-grid">
                {courseList.map((course) => {
                    const progress = calculateProgress(course.id);
                    const isCompleted = progress === 100;
                    const isActive = stats.currentCourse === course.id;
                    const isLocked = course.id !== 'python';

                    return (
                        <div
                            key={course.id}
                            className={`course-card ${isActive ? 'active-course' : ''} ${isCompleted ? 'completed-course' : ''} ${isLocked ? 'locked-course' : ''}`}
                            onClick={() => !isLocked && handleCourseClick(course.id)}
                            style={{ 
                                '--course-color': isLocked ? '#666' : course.color,
                                opacity: isLocked ? 0.6 : 1,
                                filter: isLocked ? 'grayscale(1)' : 'none',
                                cursor: isLocked ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <div className="course-glow"></div>
                            <div className="course-icon">
                                {course.id === 'html' && '🌐'}
                                {course.id === 'css' && '🎨'}
                                {course.id === 'js' && '⚡'}
                                {course.id === 'python' && '🐍'}
                            </div>
                            <h3 className="course-title">{course.title}</h3>

                            {!isLocked && (
                                <div className="course-progress-container">
                                    <div className="course-progress-bar">
                                        <div
                                            className="course-progress-fill"
                                            style={{ width: `${progress}%`, backgroundColor: course.color }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">{progress}% {isCompleted && '🏆'}</span>
                                </div>
                            )}

                            {isLocked ? (
                                <div className="locked-badge" style={{ marginTop: '15px', color: '#888', fontWeight: 'bold', border: '1px dashed #888', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                                    🔒 Tez Kunda
                                </div>
                            ) : (
                                <button className="course-btn">
                                    {isActive ? 'Davom etish' : 'Boshlash'}
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
