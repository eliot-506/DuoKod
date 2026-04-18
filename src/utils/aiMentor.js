/**
 * AI Mentor (Smart Assistant) Core Logic
 * Generates dynamic, conversational hints based on user errors.
 */

export const getMentorHint = (question, userResponse, level) => {
    // Level 0: Boshlang'ich xato xabardorligi
    if (level === 0) {
        return "Notog'ri javob kiritildi. O'ylashda davom etamizmi yoki sirni ochaymi?";
    }

    // Level 1: Kichik yordam (Light Hint)
    if (level === 1) {
        if (question.type === 'multiple-choice') {
            return `💡 Kichik yordam: Siz tanlagan variant to'g'ri raqobat qila olmaydi. Keling mantiqiyroq faraz qilamiz. Asosiy e'tiborni savoldagi "${question.prompt.split(' ')[0] || ''}" tushunchasiga qarating.`;
        } else if (question.type === 'fill-blanks' || question.type === 'code-fix' || question.type === 'code-write') {
            const trimmedResponse = userResponse ? userResponse.trim() : '';
            if (trimmedResponse.length === 0) {
                return "💡 Hali hech qanday kod yozmabsiz. Qani, barmoqlarni ishlatdik!";
            }
            if (question.correctAnswer && !question.correctAnswer.includes(trimmedResponse.split(' ')[0])) {
                return `💡 Boshlanishi xato bo'lishi mumkin. E'tiborli bo'ling, kodingiz qanday sintaksisdan boshlanishi kerak?`;
            }
            return "💡 Kichik yordam: Kodda kichik imlo profilaktikasi bormikan? Qavslar, nuqta-vergullarga qarab yozganingizni solishtiring.";
        }
    }

    // Level 2: Kontseptni tushuntirish (Explanation/Concept)
    if (level === 2) {
        // Asosiy bazadagi explanation yoki generic javob
        return `🧠 Tushuntiraman: ${question.explanation || "Bu qoidaga ko'ra, siz so'ralgan funksiya parametrlarini to'g'ri o'rnatishingiz shart."}`;
    }

    // Level 3: Ochiq yechim (Direct Answer)
    if (level >= 3) {
        if (question.type === 'multiple-choice') {
            return `🎯 Yechim: To'g'ri variant - ${question.correctId.toUpperCase()}. Buni yodda saqlash foydali!`;
        } else {
            return `🎯 Yechim: "${question.correctAnswer}" kodini yozishingiz kerak edi. O'rganishda xato qilish tabiiy!`;
        }
    }

    return "Keling, davom etamiz!";
};
