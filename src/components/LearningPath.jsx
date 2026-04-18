import { useState } from 'react'
import { useUser } from '../context/UserContext'
import './LearningPath.css'
import { COURSES } from '../data/lessons'

function LearningPath({ selectedCourse, onNodeClick, onClaimCertificate, onStartProject, onBack }) {
    const { stats } = useUser()
    const [previewNode, setPreviewNode] = useState(null)

    const getNodeStatus = (nodeId) => {
        const courseProgress = stats.courses[selectedCourse] || { completedNodes: [], unlockedNodes: [1] };

        if (courseProgress?.completedNodes.includes(nodeId)) {
            return 'completed';
        } else if (courseProgress?.unlockedNodes?.includes(nodeId) || nodeId === 1) {
            return 'unlocked';
        }
        return 'locked';
    }

    const currentCourseData = COURSES[selectedCourse];
    if (!currentCourseData) return null;

    const MODULE_NODES = currentCourseData.data.map((l, i) => {
        const pattern = [0, -30, 20, 40, 0, -20, -40, 20];
        return {
            ...l,
            xOffset: pattern[i % pattern.length],
            type: (i === currentCourseData.data.length - 1) ? 'checkpoint' : (i % 3 === 0 ? 'practice' : 'lesson')
        };
    });

    return (
        <div className="unified-learning-path">
            <button className="back-btn" onClick={onBack} style={{ margin: '20px 30px', fontSize: '1.2rem', padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: 'var(--accent)', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}>⬅ Menyuga Qaytish</button>
            <div className="learning-path-container" style={{ '--course-color': currentCourseData.color }}>
                <div className="section-header" style={{ borderColor: currentCourseData.color }}>
                    <h2 className="section-title" style={{ color: '#fff', textShadow: `0 2px 4px rgba(0,0,0,0.8), 0 0 15px ${currentCourseData.color}, 0 0 30px ${currentCourseData.color}` }}>{currentCourseData.title}</h2>
                    <p className="section-desc">Muvaffaqiyatli darslar orqali darajangizni oshiring</p>
                </div>

                <div className="path-map">
                    {MODULE_NODES.map((node, index) => {
                        const status = getNodeStatus(node.id)
                        return (
                            <div
                                key={`${selectedCourse}-${node.id}`}
                                className={`map-node-wrapper ${status}`}
                                style={{ transform: `translateX(${node.xOffset}px)` }}
                            >
                                <svg className="path-line" width="60" height="80" viewBox="0 0 60 80">
                                    <path
                                        d="M30,0 Q30,40 30,80"
                                        fill="none"
                                        stroke={status === 'completed' ? currentCourseData.color : 'var(--border-color)'}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                    {status === 'completed' && index < MODULE_NODES.length - 1 && (
                                        <path
                                            className="flow-line"
                                            d="M30,0 Q30,40 30,80"
                                            fill="none"
                                            stroke="#ffffff"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    )}
                                </svg>

                                <button
                                    className={`node-btn node-${node.type} status-${status}`}
                                    title={status === 'locked' ? '🔒 Oldingi darslarni yoping' : node.title}
                                    onClick={() => status !== 'locked' && setPreviewNode(node)}
                                >
                                    <div className="node-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                        {status === 'completed' ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '35px', height: '35px', filter: 'drop-shadow(0 0 5px currentColor)' }}>
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        ) : status === 'locked' ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '30px', height: '30px', opacity: 0.8 }}>
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        ) : (
                                            <img
                                                src={stats.currentAvatar && stats.currentAvatar !== 'default' ? `/assets/mascots/mascot_${stats.currentAvatar}.png` : `/assets/mascots/idle.png`}
                                                alt="Current Position"
                                                style={{
                                                    width: '90px',
                                                    height: '90px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '2px solid var(--primary)',
                                                    boxShadow: '0 0 15px var(--primary)',
                                                    transform: 'scale(1.2)'
                                                }}
                                            />
                                        )}
                                    </div>
                                </button>
                                <span className="node-title">{node.title}</span>
                            </div>
                        )
                    })}
                </div>

                {stats.courses[selectedCourse]?.completedNodes.length === currentCourseData.data.length && (
                    <div style={{ textAlign: 'center', margin: '20px 0 40px', animation: 'fadeIn 1s' }}>
                        <button
                            className="btn btn-primary"
                            style={{ backgroundColor: currentCourseData.color, color: '#000', fontSize: '1.2rem', padding: '15px 30px', boxShadow: `0 0 20px ${currentCourseData.color}` }}
                            onClick={onClaimCertificate}
                        >
                            🏆 {currentCourseData.title.split(' ')[0]} Sertifikatni Olish
                        </button>
                    </div>
                )}
            </div>

            {/* REAL PROJECT BANNER */}
            <div className="real-project-banner" style={{
                margin: '40px 20px',
                padding: '30px',
                background: 'linear-gradient(45deg, #1a1c29, #2a2d3e)',
                borderRadius: '20px',
                border: '2px solid var(--accent)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,255,0.1)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-20px', fontSize: '150px', opacity: 0.1, transform: 'rotate(15deg)' }}>🚀</div>
                <h2 style={{ color: 'var(--accent)', fontSize: '2rem', marginBottom: '15px', textShadow: '0 0 10px var(--accent-glow)' }}>🚀 Haqiqiy Loyiha: {currentCourseData.title.split(' ')[0]} App</h2>
                <p style={{ fontSize: '1.2rem', color: '#e6edf3', marginBottom: '25px', lineHeight: '1.5' }}>
                    O'rganganlaringizni amaliyotda sinab ko'ring! Noldan boshlab o'zingizning ishlashiga tayyor ilovangizni yarating.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '10px', fontSize: '1.1rem' }}>
                        🎁 Mukofot: <span style={{ color: '#feca57', fontWeight: 'bold' }}>+500 XP</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={onStartProject}
                        style={{ padding: '15px 40px', fontSize: '1.3rem', animation: 'pulse 2s infinite' }}
                    >
                        Loyihani Boshlash ⚡
                    </button>
                </div>
            </div>

            {previewNode && (
                <div className="preview-modal-backdrop" onClick={() => setPreviewNode(null)}>
                    <div className="preview-modal" onClick={e => e.stopPropagation()}>
                        <button className="preview-close-btn" onClick={() => setPreviewNode(null)}>✕</button>
                        
                        <div className="preview-header">
                            <div className="preview-icon">
                                <i className={`fa-solid ${previewNode.type === 'checkpoint' ? 'fa-skull' : 'fa-code'}`}></i>
                            </div>
                            <h3>{previewNode.title}</h3>
                        </div>

                        <div className="preview-body">
                            <p className="preview-desc">
                                Dasturlash mahoratingizni keyingi bosqichga olib chiqish uchun tayyormisiz? Ushbu bosqichda ko'proq amaliy mashg'ulotlar va sintaksis mashqlari kutmoqda.
                            </p>
                            
                            <div className="preview-stats-panel">
                                <div className="p-stat">
                                    <span className="p-val">{previewNode.theory?.length || 0} ta</span>
                                    <span className="p-key">Nazariya</span>
                                </div>
                                <div className="p-stat">
                                    <span className="p-val">{previewNode.questions?.length || 0} ta</span>
                                    <span className="p-key">Amaliyot</span>
                                </div>
                                <div className="p-stat target-xp">
                                    <span className="p-val">+{previewNode.questions?.length * 5 || 15} XP</span>
                                    <span className="p-key">Mukofot</span>
                                </div>
                            </div>
                        </div>

                        <div className="preview-footer">
                            <button 
                                className="btn btn-primary preview-start-btn" 
                                onClick={() => {
                                    onNodeClick(selectedCourse, previewNode.id);
                                    setPreviewNode(null);
                                }}
                            >
                                Jangni Boshlash ⚔️
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default LearningPath
