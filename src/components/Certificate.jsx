import { useState, useEffect, useRef } from 'react'
import './Certificate.css'
import { useUser } from '../context/UserContext'
import { COURSES } from '../data/lessons'

function Certificate({ onBack }) {
    const { stats } = useUser()
    const [name, setName] = useState('')
    const [isGenerated, setIsGenerated] = useState(false)
    const canvasRef = useRef(null)

    const courseData = COURSES[stats.currentCourse]
    const currentDate = new Date().toLocaleDateString('uz-UZ')

    const generateCertificate = () => {
        if (!name.trim()) return;
        setIsGenerated(true);
        drawToCanvas();
    }

    const drawToCanvas = () => {
        setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            // Xolst (Canvas) sozlamalari HD kachestva uchun
            canvas.width = 1200;
            canvas.height = 800;

            // Orqa fon (Dark Cyberpunk gradient)
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0a0a0a');
            gradient.addColorStop(1, '#111827');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Chiziqli naqsh
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 1;
            for (let i = 0; i < canvas.width; i += 40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }

            // Chekka ramka tasviri (Border)
            ctx.strokeStyle = courseData.color || '#00ff88';
            ctx.lineWidth = 15;
            ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

            ctx.lineWidth = 2;
            ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

            // DUOKOD Logotip matni
            ctx.font = 'bold 50px "Fira Code", monospace';
            ctx.fillStyle = courseData.color || '#00ff88';
            ctx.textAlign = 'center';
            ctx.fillText('DuoKod', canvas.width / 2, 150);

            // Sarlavha
            ctx.font = 'bold 70px "Outfit", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('Muvaffaqiyat Sertifikati', canvas.width / 2, 280);

            // Oddiy matn
            ctx.font = '30px "Outfit", sans-serif';
            ctx.fillStyle = '#a3a3a3';
            ctx.fillText("Ushbu sertifikat tasdiqlaydiki", canvas.width / 2, 360);

            // Foydalanuvchi ismi
            ctx.font = 'bold 80px "Outfit", monospace';
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = courseData.color || '#00ff88';
            ctx.fillText(name.toUpperCase(), canvas.width / 2, 480);
            ctx.shadowBlur = 0; // Reset shadow

            // Kurs nomi
            ctx.font = '40px "Outfit", sans-serif';
            ctx.fillStyle = '#a3a3a3';
            ctx.fillText(`nomli yigit/qiz, quyidagi kursni a'lo darajada tamomladi:`, canvas.width / 2, 570);

            ctx.font = 'bold 50px "Outfit", sans-serif';
            ctx.fillStyle = courseData.color || '#00ff88';
            ctx.fillText(`${courseData.title.toUpperCase()} Moduli`, canvas.width / 2, 650);

            // Sana va Imzo qismlari
            ctx.font = '25px "Fira Code", monospace';
            ctx.fillStyle = '#a3a3a3';

            // Chap tomon Sana
            ctx.textAlign = 'left';
            ctx.fillText(`Sana: ${currentDate}`, 120, 720);

            // O'ng tomon ID/Imzo platformasi
            ctx.textAlign = 'right';
            ctx.fillText(`ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, canvas.width - 120, 720);

        }, 100);
    }

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `DuoKod_${courseData.id}_Sertifikat.png`;
        link.href = dataUrl;
        link.click();
    }

    return (
        <div className="certificate-page">
            <button className="back-btn" onClick={onBack}>← Ortga</button>
            <div className="cert-container">
                {!isGenerated ? (
                    <div className="cert-form-box" style={{ borderColor: courseData.color }}>
                        <div className="cert-icon" style={{ textShadow: `0 0 20px ${courseData.color}` }}>🏆</div>
                        <h2>Tabriklaymiz!</h2>
                        <p>Siz <b>{courseData.title}</b> kursidagi barcha darslarni to'liq tugatdingiz.</p>

                        <div className="name-input-group">
                            <label>Sertifikatga yozish uchun to'liq ismingizni kiriting:</label>
                            <input
                                type="text"
                                placeholder="Masalan: Murodjon Komilov"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <button
                            className="generate-btn"
                            style={{ backgroundColor: courseData.color, color: '#000' }}
                            onClick={generateCertificate}
                            disabled={!name.trim()}
                        >
                            Sertifikat Yarating
                        </button>
                    </div>
                ) : (
                    <div className="cert-preview-box">
                        <h3>Sizning Maqtov Yorlig'ingiz</h3>
                        <div className="canvas-wrapper">
                            <canvas ref={canvasRef} className="cert-canvas"></canvas>
                        </div>
                        <div className="cert-actions">
                            <button className="download-btn" onClick={downloadCertificate}>
                                📥 Yuklab Olish (PNG)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Certificate
