// src/utils/audio.js

// Ovoz yaratuvchi kontekstni inisializatsiya qilish
const getAudioContext = () => {
    if (!window.audioCtx) {
        window.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return window.audioCtx;
};

// To'g'ri javob berilganda "Bling" (ko'tarilgan yumshoq ohang) ovozi
export const playSuccessSound = () => {
    try {
        const audioCtx = getAudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sine'; // Yumshoq va toza tovush
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        // Ovoz balandligi konverti (Fade in va Fade out)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        // Chastota konverti (Pastdan yuqoriga - yutuq xissi)
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.4);
    } catch (err) {
        console.log("Audio API qo'llab quvvatlanmaydi", err);
    }
};

// Xato javob berilganda "Boop" (qisqa va aniq xato ovozi)
export const playErrorSound = () => {
    try {
        const audioCtx = getAudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Sawtooth emas, Triangle (nozikroq ohang, prrrr o'rniga tuut)
        osc.type = 'triangle'; 
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        // Ovoz balandligi (qisqaroq va silliqroq o'chish)
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

        // Chastota (350 dan pastga qisqa tushish: klassik xato ovozi)
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.3);
    } catch (err) {
        console.log("Audio API qo'llab quvvatlanmaydi", err);
    }
};
