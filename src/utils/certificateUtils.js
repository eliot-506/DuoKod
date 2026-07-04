export const isCourseComplete = (course, progress, bosses = []) => {
    if (!course?.data?.length || !progress) return false;
    const completedNodes = progress.completedNodes || [];
    const completedLessons = course.data.filter(lesson => completedNodes.includes(lesson.id)).length;
    const completedBosses = bosses.filter(boss => completedNodes.includes(boss.moduleId * 100)).length;
    return completedLessons === course.data.length && completedBosses === bosses.length;
};

export const createCertificateCode = () => {
    const randomPart = globalThis.crypto?.randomUUID?.().replaceAll('-', '').slice(0, 12)
        || `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`.slice(0, 12);
    return `DK-${randomPart.toUpperCase()}`;
};

export const getCourseAverageScore = (course, progress) => {
    const scores = course?.data
        ?.map(lesson => progress?.lessonScores?.[lesson.id])
        .filter(Number.isFinite) || [];
    if (!scores.length) return null;
    return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
};
