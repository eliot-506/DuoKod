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
                <section aria-labelledby="learning-path-title" className="lp-canvas">
                    <div className="lp-canvas-header">
                        <h2 id="learning-path-title" className="lp-canvas-title">O‘quv yo‘li</h2>
                        <p className="lp-canvas-desc">Qayerda ekaningizni va keyingi darsni bir qarashda ko‘rish uchun vizual yo‘l xaritasi.</p>
                    </div>

                    <div className="journey-map-container">
                        {MODULE_NODES.map((node, i) => {
                            const isLast = i === MODULE_NODES.length - 1;
                            
                            // Distribute nodes using pure % values to fill the wide canvas
                            const pattern = [75, 40, 15, 50, 85, 60, 25, 50];
                            const xOffset = pattern[i % pattern.length];
                            const nextXOffset = isLast ? xOffset : pattern[(i + 1) % pattern.length];
                            
                            // Label positioning logic
                            const isLabelLeft = xOffset > 50; 
                            const labelSide = isLabelLeft ? 'left' : 'right';

                            // Sizing constants
                            let nodeSize = 88;
                            if (node.status === 'current' || node.status === 'unlocked') nodeSize = 104;
                            if (node.isBoss) nodeSize = 76;
                            if (isLast) nodeSize = 96;

                            return (
                                <div key={`node-${node.id}`} className={`journey-node-row status-${node.status} ${node.isBoss ? 'is-boss' : ''}`}>
                                    
                                    {/* Curved SVG Line connecting to next node */}
                                    {!isLast && (
                                        <svg className="path-connector" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path 
                                                d={`M ${xOffset} 0 C ${xOffset} 50, ${nextXOffset} 50, ${nextXOffset} 100`} 
                                                stroke={node.status === 'completed' || node.status === 'current' || node.status === 'unlocked' ? '#93C5FD' : '#E2E8F0'} 
                                                strokeWidth={node.status === 'completed' || node.status === 'current' || node.status === 'unlocked' ? "5" : "4"} 
                                                vectorEffect="non-scaling-stroke"
                                                fill="none" 
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    )}
                                    
                                    {/* Interactive Node Circle */}
                                    <div 
                                        className={`node-circle-btn size-variant-${nodeSize}`} 
                                        style={{ left: `${xOffset}%` }}
                                        onClick={() => {
                                            if(node.status !== 'locked' && !node.isBoss) setPreviewNode(node);
                                            if(node.status !== 'locked' && node.isBoss && onBossStart) onBossStart(node.bossData);
                                        }}
                                    >
                                        {node.isBoss ? (
                                             <span style={{fontSize:'1.3rem'}}>⚔️</span>
                                        ) : node.status === 'completed' ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="chk-icon">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        ) : node.status === 'locked' ? (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="chk-icon">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        ) : isLast ? (
                                             <span style={{fontSize:'1.5rem'}}>🏅</span>
                                        ) : (
                                            <div className="inner-dot"></div>
                                        )}
                                    </div>

                                {/* Label Card block */}
                                <div 
                                    className={`node-label-card label-${labelSide}`} 
                                    style={{ 
                                        ...(isLabelLeft 
                                            ? { right: `calc(100% - ${xOffset}% + ${nodeSize/2 + 24}px)` }
                                            : { left: `calc(${xOffset}% + ${nodeSize/2 + 24}px)` })
                                    }}
                                >
                                    <div className="j-meta-row">
                                        <span className={`j-badge badge-${node.status}`}>
                                            {node.status === 'challenge' ? 'Challenge' : (node.status === 'unlocked' ? 'Ochiq' : node.statusLabel)}
                                        </span>
                                        <span className="j-meta-text">• {node.meta}</span>
                                    </div>
                                    <h3 className="j-title">{node.title}</h3>
                                    <p className="j-desc">{node.desc}</p>
                                    
                                    <div className="j-actions">
                                        {node.status === 'completed' && <button className="j-btn j-btn-secondary" onClick={(e) => { e.stopPropagation(); setPreviewNode(node); }}>Qayta ko‘rish</button>}
                                        {(node.status === 'current' || node.status === 'unlocked') && <button className="j-btn j-btn-primary" onClick={(e) => { e.stopPropagation(); onNodeClick(selectedCourse, node.id); }}>Davom etish</button>}
                                        {node.status === 'challenge' && <button className="j-btn j-btn-primary" onClick={(e) => { e.stopPropagation(); if(onBossStart) onBossStart(node.bossData); }}>Jangni boshlash</button>}
                                        {node.status === 'locked' && <span className="j-locked-text">Oldingi modul ochilishi kerak</span>}
                                    </div>
                                </div>

                            </div>
                        );
                    })}
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
