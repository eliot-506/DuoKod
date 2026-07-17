import { getLocalDateKey } from './streakUtils.js';

export const createDailyXpState = (amount = 0, dateKey = getLocalDateKey()) => ({
    date: dateKey,
    xp: Math.max(0, Number(amount) || 0)
});

export const normalizeDailyXp = (dailyXp, dateKey = getLocalDateKey()) => {
    if (!dailyXp || dailyXp.date !== dateKey) return createDailyXpState(0, dateKey);
    return createDailyXpState(dailyXp.xp, dateKey);
};

export const addDailyXp = (dailyXp, amount, dateKey = getLocalDateKey()) => {
    const current = normalizeDailyXp(dailyXp, dateKey);
    return createDailyXpState(current.xp + Math.max(0, Number(amount) || 0), dateKey);
};

export const getDailyGoalProgress = (dailyXp, goal = 50, dateKey = getLocalDateKey()) => {
    const safeGoal = Math.max(1, Number(goal) || 1);
    const current = normalizeDailyXp(dailyXp, dateKey).xp;
    const cappedXp = Math.min(current, safeGoal);

    return {
        currentXp: current,
        cappedXp,
        remainingXp: Math.max(0, safeGoal - current),
        percent: Math.round((cappedXp / safeGoal) * 100)
    };
};
