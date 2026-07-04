export const getStreakTier = (streak) => {
    // 1-bosqich: Boshlang'ich Uchqun (0-2 kun)
    if (streak < 3) {
        return {
            name: "Uchqun",
            color: "#ff9800", // Soft Orange
            icon: "🔥", 
            glow: 5 + streak * 3, // Starts at 5px, max 11px
            tier: 1
        };
    } 
    // 2-bosqich: Ko'k Neon (3-6 kun)
    else if (streak < 7) {
        return {
            name: "Neon Alanga",
            color: "#00e5ff", // Bright Cyan
            icon: "☄️", 
            glow: 10 + (streak - 3) * 3.5, // Starts at 10px, max 20px
            tier: 2
        };
    } 
    // 3-bosqich: Binafsharang Olov (7-13 kun)
    else if (streak < 14) {
        return {
            name: "Sirli Olov",
            color: "#e040fb", // Deep Purple
            icon: "🔮", 
            glow: 15 + (streak - 7) * 2.5, // Starts at 15px, max 30px
            tier: 3
        };
    } 
    // 4-bosqich: Qora Jodu (14-29 kun)
    else if (streak < 30) {
        return {
            name: "Qora Jodu",
            color: "#ff1744", // Crimson Red
            icon: "🌌", 
            glow: 25 + (streak - 14) * 1.5, // Starts at 25px, max ~47px
            tier: 4
        };
    } 
    // 5-bosqich: Oltin Toj (30+ kun)
    else {
        return {
            name: "Oltin Toj",
            color: "#ffd700", // Gold Royal
            icon: "👑", 
            glow: 40 + Math.min((streak - 30) * 1, 30), // Caps at 70px to prevent blinding
            tier: 5
        };
    }
};

export const getLocalDateKey = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getCalendarDayDifference = (fromDateKey, toDateKey) => {
    if (!fromDateKey || !toDateKey) return null;
    const [fromYear, fromMonth, fromDay] = fromDateKey.split('-').map(Number);
    const [toYear, toMonth, toDay] = toDateKey.split('-').map(Number);
    const fromUtc = Date.UTC(fromYear, fromMonth - 1, fromDay);
    const toUtc = Date.UTC(toYear, toMonth - 1, toDay);
    return Math.round((toUtc - fromUtc) / 86_400_000);
};
