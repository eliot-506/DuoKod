export const addUniqueBadges = (currentBadges = [], badgeIds = []) => {
    const nextBadges = [...currentBadges];
    badgeIds.forEach((badgeId) => {
        if (badgeId && !nextBadges.includes(badgeId)) nextBadges.push(badgeId);
    });
    return nextBadges;
};

export const getLessonCompletionBadges = ({ courseId, completedLessonCount, score }) => {
    const badges = [];

    if (completedLessonCount >= 1) badges.push('first_lesson');
    if (Number.isFinite(score) && Math.round(score) >= 100) badges.push('perfect_score');
    if (courseId === 'python' && completedLessonCount >= 3) badges.push('python_beginner');

    return badges;
};

export const getStreakBadges = (streak) => {
    const badges = [];
    if (streak >= 3) badges.push('streak_3');
    if (streak >= 7) badges.push('streak_7');
    if (streak >= 14) badges.push('streak_14');
    if (streak >= 30) badges.push('streak_30');
    return badges;
};
