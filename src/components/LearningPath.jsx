import { useState } from 'react'
import { useUser } from '../context/UserContext'
import './LearningPath.css'
import { COURSES } from '../data/lessons'
import { BOSS_DATA } from '../data/bossData'

function LearningPath({ selectedCourse, onNodeClick, onBossStart, onClaimCertificate, onStartProject, onBack }) {
    const { stats } = useUser()
    const [previewNode, setPreviewNode] = useState(null)
    const isAdmin = stats?.isAdmin || stats?.isSuperAdmin

    const getNodeStatus = (nodeId) => {
        if (isAdmin) return 'unlocked';
        const courseProgress = stats.courses[selectedCourse] || { completedNodes: [], unlockedNodes: [1] };
        if (courseProgress?.completedNodes.includes(nodeId)) return 'completed';
        if (courseProgress?.unlockedNodes?.includes(nodeId) || nodeId === 1) return 'current';
        return 'locked';
    }

    const currentCourseData = COURSES[selectedCourse];
    if (!currentCourseData) return null;

    const courseData = currentCourseData.data;
    const courseBosses = BOSS_DATA[selectedCourse]?.bosses || [];

    const getBossDisplayName = (boss) => {
        if (boss.isFinalBoss || boss.title.includes('Final') || boss.title.includes('Terror')) return 'Yakuniy challenge';
        const fp = boss.title.split(' ')[0];
        if(fp === 'Conditional') return 'Mantiqiy challenge';
        if(fp === 'Loop') return 'Takrorlash sinovi';
        if(fp === 'Variable') return 'Sonlar sinovi';
        return `${fp} challenge`;
    };

    const MODULE_NODES = [];
    courseData.forEach((l, i) => {
        const s = getNodeStatus(l.id);
        const stLabel = s === 'completed' ? 'Tugallangan' : (s === 'current' ? 'Joriy' : 'Keyingi');
        
        MODULE_NODES.push({
            ...l,
            isBoss: false,
            status: s,
            meta: `${i + 1}-modul`,
            statusLabel: stLabel,
            desc: l.desc || 'Asosiy tushunchalar bilan tanishuv'
        });
        
        const boss = courseBosses.find(b => b.moduleId === l.id);
        if (boss) {
            const nextModStatus = getNodeStatus(l.id + 1);
            let bStatus = 'locked';
            let bLabel = 'Yopiq';
            
            if (s === 'completed') {
                if (nextModStatus === 'completed' || nextModStatus === 'current' || nextModStatus === 'unlocked') {
                    bStatus = 'completed';
                    bLabel = 'Yakunlandi';
                } else {
                    bStatus = 'challenge';
                    bLabel = 'Faol';
                }
            }
            if(isAdmin && bStatus === 'locked') {
                 bStatus = 'challenge';
                 bLabel = 'Faol';
            }

            MODULE_NODES.push({
                id: `boss_${l.id}`,
                title: getBossDisplayName(boss),
                desc: boss.isFinalBoss ? 'Kurs bo\'yicha barcha bilimlarni sinash' : 'Modul bo\'yicha amaliy mashqlar va sinovlar',
                isBoss: true,
                status: bStatus,
                meta: 'Challenge',
                statusLabel: bStatus === 'completed' ? 'Yakunlandi' : (bStatus === 'challenge' ? 'Faol' : 'Yopiq'),
                bossData: { ...boss, color: currentCourseData.color }
            });
        }
    });

    const completedCount = stats?.courses?.[selectedCourse]?.completedNodes?.length || 0;
    const progressPercent = Math.round((completedCount / courseData.length) * 100) || 0;
    const totalChallenges = courseBosses.length;
    const currentModLabel = stats?.courses?.[selectedCourse]?.unlockedNodes?.[stats.courses[selectedCourse].unlockedNodes.length - 1] || 1;

    return (
        <div className="unified-learning-path">
            <div className="learning-path-wrapper">
                
                {/* Back Button */}
                <button className="back-btn" onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i> Menyuga qaytish
                </button>

                {/* 1. Header Block */}
                <header className="lp-header-block">
                    <div className="lp-header-content">
                        <p className="lp-header-subtitle">{currentCourseData.title}</p>
                        <h1 className="lp-header-title">Muvaffaqiyatli darslar orqali darajangizni oshiring</h1>
                        <p className="lp-header-desc">
                            Kursning asosiy modullari orqali bilimlarni shakllantiring. Keyingi challenge va davomiy darslar orqali tajribangizni mustahkamlang.
                        </p>
                    </div>

                    <div className="lp-header-right">
                        <div className="lp-stats-row">
                            <div className="lp-stat-chip">
                                <p className="lp-stat-label">Progress</p>
                                <p className="lp-stat-value">{completedCount}/{courseData.length} modul</p>
                            </div>
                            <div className="lp-stat-chip">
                                <p className="lp-stat-label">Challenge</p>
                                <p className="lp-stat-value">{totalChallenges} ta</p>
                            </div>
                            <div className="lp-stat-chip">
                                <p className="lp-stat-label">Joriy holat</p>
                                <p className="lp-stat-value">{currentModLabel}-modul</p>
                            </div>
                        </div>

                        <div className="lp-actions-row">
                            <button className="lp-btn lp-btn-primary" onClick={() => {
                                const lastUnlocked = stats?.courses?.[selectedCourse]?.unlockedNodes?.[stats.courses[selectedCourse].unlockedNodes.length - 1] || 1;
                                onNodeClick(selectedCourse, lastUnlocked);
                            }}>
                                Davom etish
                            </button>
                            <button className="lp-btn lp-btn-secondary">
                                Kurs haqida
                            </button>
                        </div>
                    </div>
                </header>

                {/* 2. Path Canvas */}
                <section aria-labelledby="learning-path-title" className="lp-canvas pristine-grid">
                    <div className="lp-canvas-header">
                        <h2 id="learning-path-title" className="lp-canvas-title">O‘quv yo‘li</h2>
                        <p className="lp-canvas-desc">Qayerda ekaningizni va keyingi darsni bir qarashda ko'rishingiz mumkin.</p>
                    </div>

                    <div className="journey-map-container timeline-view z-flow">
                        {MODULE_NODES.map((node, i) => {
                            const isLast = i === MODULE_NODES.length - 1;
                            
                            // 🏁 Z-Flow Logic (Left -> Right -> Left)
                            // i=0: Left, i=1: Right, i=2: Left, i=3: Right
                            const sideClass = i % 2 === 0 ? 'side-left' : 'side-right';

                            return (
                                <div key={`node-${node.id}`} className={`timeline-row status-${node.status} ${node.isBoss ? 'is-boss' : ''} ${sideClass}`}>
                                    
                                    <div className="timeline-center">
                                        <div 
                                            className={`node-circle-btn`} 
                                            onClick={() => {
                                                if(node.status !== 'locked' && !node.isBoss) setPreviewNode(node);
                                                if(node.status !== 'locked' && node.isBoss && onBossStart) onBossStart(node.bossData);
                                            }}
                                        >
                                            {node.isBoss ? (
                                                 <span className="node-icon">⚔️</span>
                                            ) : node.status === 'completed' ? (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="chk-icon">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            ) : isLast ? (
                                                 <span className="node-icon">🏅</span>
                                            ) : (
                                                <div className="inner-dot"></div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Card - Pristine White */}
                                    <div className="timeline-card-wrapper">
                                        <div className="node-label-card pristine-card">
                                            <div className="j-meta-row">
                                                <span className={`j-badge badge-${node.status} accent-tag`}>
                                                    {node.status === 'challenge' ? 'CHALLENGE' : (node.status === 'unlocked' || node.status === 'current' ? 'OCHIQ' : 'Yopiq')} 
                                                    &nbsp;• {node.meta}
                                                </span>
                                            </div>
                                            <h3 className="j-title">{node.title}</h3>
                                            <p className="j-desc">{node.desc}</p>
                                            
                                            <div className="j-actions">
                                                {node.status === 'completed' && <button className="lp-btn lp-btn-secondary lp-btn-sm" onClick={(e) => { e.stopPropagation(); setPreviewNode(node); }}>Qayta ko‘rish</button>}
                                                {(node.status === 'current' || node.status === 'unlocked') && <button className="lp-btn lp-btn-primary lp-btn-sm" onClick={(e) => { e.stopPropagation(); onNodeClick(selectedCourse, node.id); }}>Davom etish</button>}
                                                {node.status === 'challenge' && <button className="lp-btn lp-btn-danger lp-btn-sm" onClick={(e) => { e.stopPropagation(); if(onBossStart) onBossStart(node.bossData); }}>Jangni boshlash</button>}
                                            </div>

                                            {node.isBoss && (
                                                <div className="card-footer-icons">
                                                    <div className="green-dots"><span></span><span></span><span></span></div>
                                                    <i className="fa-solid fa-crossed-swords sword-small"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Chatbot Assistant */}
                    <div className="lp-chatbot-persistent">
                        <div className="chatbot-bubble">
                            Uzoq o'ylanib qoldingizmi? Yordam kerak bo'lsa ayting!
                        </div>
                        <div className="chatbot-avatar">
                            <img src="/mascot-robot.png" alt="Robot" onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png'} />
                        </div>
                    </div>

                    {/* Completion Actions */}
                    {completedCount >= courseData.length && (
                        <div className="completion-actions">
                            <button className="lp-btn lp-btn-primary cert-btn" onClick={onClaimCertificate}>
                                🏆 {currentCourseData.title.split(' ')[0]} Sertifikatni Olish
                            </button>
                        </div>
                    )}
                </section>
            </div>

            {/* Preview Modal */}
            {previewNode && (
                <div className="preview-modal-backdrop" onClick={() => setPreviewNode(null)}>
                    <div className="preview-modal" onClick={e => e.stopPropagation()}>
                        <button className="preview-close-btn" onClick={() => setPreviewNode(null)}>✕</button>
                        <div className="preview-header">
                            <h3>{previewNode.title}</h3>
                        </div>
                        <div className="preview-body">
                            <p className="preview-desc">{previewNode.desc}</p>
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
                            <button className="lp-btn lp-btn-primary preview-start-btn" onClick={() => {
                                onNodeClick(selectedCourse, previewNode.id);
                                setPreviewNode(null);
                            }}>
                                Boshlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LearningPath
