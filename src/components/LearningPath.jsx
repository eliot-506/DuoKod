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
                if (nextModStatus === 'completed' || nextModStatus === 'current') {
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

    return (
        <div className="unified-learning-path">
            <button className="back-btn" onClick={onBack}>
                <i className="fa-solid fa-arrow-left"></i> Menyuga qaytish
            </button>
            
            <div className="learning-path-wrapper">
                <div className="roadmap-section">
                    
                    {/* 1. Header Card (Integrated) */}
                    <div className="course-overview-card">
                        <div className="co-header">
                            <h2 className="co-title">{currentCourseData.title}</h2>
                            <span className="co-percent">{progressPercent}%</span>
                        </div>
                        <p className="co-subtitle">Muvaffaqiyatli darslar orqali darajangizni oshiring</p>
                        <div className="co-meta">
                            <span>{completedCount}/{courseData.length} modul tugallandi</span>
                            <span>{totalChallenges} challenge</span>
                            <span>Joriy: {stats?.courses?.[selectedCourse]?.unlockedNodes?.[stats.courses[selectedCourse].unlockedNodes.length - 1] || 1}-modul</span>
                        </div>
                        <div className="co-actions">
                            <button className="co-btn co-btn-primary" onClick={() => {
                                const lastUnlocked = stats?.courses?.[selectedCourse]?.unlockedNodes?.[stats.courses[selectedCourse].unlockedNodes.length - 1] || 1;
                                onNodeClick(selectedCourse, lastUnlocked);
                            }}>Davom etish</button>
                            <button className="co-btn co-btn-outline">Kurs haqida</button>
                        </div>
                    </div>

                    {/* 2. S-Shape Journey Map */}
                    <div className="journey-map-container">
                        
                        {MODULE_NODES.map((node, i) => {
                        const isLast = i === MODULE_NODES.length - 1;
                        // S-shape pattern for X offsets from center
                        const pattern = [0, 80, 160, 50, -50, -160, -80];
                        const xOffset = pattern[i % pattern.length];
                        const nextXOffset = isLast ? 0 : pattern[(i + 1) % pattern.length];
                        
                        const isLabelLeft = xOffset > 0; // If node shifted right, label sits left
                        const labelSide = isLabelLeft ? 'left' : 'right';

                        // Sizing constants based on specs
                        let nodeSize = 88;
                        if (node.status === 'current') nodeSize = 104;
                        if (node.isBoss) nodeSize = 76;
                        if (isLast) nodeSize = 96;

                        return (
                            <div key={`node-${node.id}`} className={`journey-node-row status-${node.status} ${node.isBoss ? 'is-boss' : ''}`} style={{ position: 'relative', height: '240px', display: 'flex', justifyContent: 'center' }}>
                                
                                {/* Curved SVG Line to next node */}
                                {!isLast && (
                                    <svg className="path-connector" width="100%" height="240" style={{ position: 'absolute', top: '50%', left: 0, overflow: 'visible', zIndex: 0 }}>
                                        <path 
                                            d={`M ${300 + xOffset} 0 C ${300 + xOffset} 120, ${300 + nextXOffset} 120, ${300 + nextXOffset} 240`} 
                                            stroke={node.status === 'completed' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'} 
                                            strokeWidth="6" 
                                            fill="none" 
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                )}
                                
                                {/* Interactive Node Circle */}
                                <div 
                                    className={`node-circle-btn size-variant-${nodeSize}`} 
                                    style={{ transform: `translateX(${xOffset}px)`, zIndex: 2 }}
                                    onClick={() => {
                                        if(node.status !== 'locked' && !node.isBoss) setPreviewNode(node);
                                        if(node.status !== 'locked' && node.isBoss && onBossStart) onBossStart(node.bossData);
                                    }}
                                >
                                    {node.status === 'completed' ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="chk-icon">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    ) : node.isBoss ? (
                                         <span style={{fontSize:'1.5rem'}}>⚔️</span>
                                    ) : isLast ? (
                                         <span style={{fontSize:'2rem'}}>🏅</span>
                                    ) : (
                                        <div className="inner-dot"></div>
                                    )}
                                </div>

                                {/* Label Card block */}
                                <div 
                                    className={`node-label-card label-${labelSide}`} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)',
                                        ...(isLabelLeft 
                                            ? { right: `calc(50% - ${xOffset}px + ${nodeSize/2 + 24}px)` }
                                            : { left: `calc(50% + ${xOffset}px + ${nodeSize/2 + 24}px)` })
                                    }}
                                >
                                    <h4 className="j-title">{node.title}</h4>
                                    <div className="j-meta">
                                        <span className={`j-badge badge-${node.status}`}>
                                            {node.status === 'challenge' ? 'Challenge' : node.statusLabel}
                                        </span>
                                        <span className="j-meta-text">• {node.meta}</span>
                                    </div>
                                    <p className="j-desc">{node.desc}</p>
                                    <div className="j-actions">
                                        {node.status === 'completed' && <button className="j-btn j-btn-secondary" onClick={(e) => { e.stopPropagation(); setPreviewNode(node); }}>Qayta ko‘rish</button>}
                                        {node.status === 'current' && <button className="j-btn j-btn-primary" onClick={(e) => { e.stopPropagation(); onNodeClick(selectedCourse, node.id); }}>Davom etish</button>}
                                        {node.status === 'challenge' && <button className="j-btn j-btn-primary" onClick={(e) => { e.stopPropagation(); if(onBossStart) onBossStart(node.bossData); }}>Jangni boshlash</button>}
                                        {node.status === 'locked' && <span className="j-locked-text">Oldingi modul tugagach ochiladi</span>}
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

                {/* Completion Actions */}
                {completedCount >= courseData.length && (
                    <div className="completion-actions">
                        <button className="btn-primary cert-btn" onClick={onClaimCertificate}>
                            🏆 {currentCourseData.title.split(' ')[0]} Sertifikatni Olish
                        </button>
                    </div>
                )}
                </div> {/* End roadmap-section */}
            </div> {/* End learning-path-wrapper */}

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
                            <button className="btn-primary preview-start-btn" onClick={() => {
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
