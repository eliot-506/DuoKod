import React from 'react';
import './Certificate.css';
import { useUser } from '../context/UserContext';
import { COURSES } from '../data/lessons';

function Certificate({ onBack }) {
    const { stats } = useUser();
    const courseData = COURSES[stats.currentCourse];
    const currentDate = new Date().toLocaleDateString('uz-UZ');
    const certificateId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const userName = stats.username || 'Super Dasturchi';

    const handleDownload = () => {
        window.print();
    };

    return (
        <section className="certificate-section">
            <button className="back-btn" onClick={onBack}>← Ortga</button>
            <h2 className="page-title">Sizning sertifikatingiz tayyor</h2>

            <div className="certificate-card">
                <div className="certificate-inner">
                    <div className="brand">DUOKOD</div>
                    <div className="eyebrow">Certificate of Achievement</div>

                    <h1 className="certificate-title">Muvaffaqiyat Sertifikati</h1>

                    <p className="certificate-subtitle">
                        Ushbu sertifikat quyidagini tasdiqlaydi
                    </p>

                    <h3 className="student-name">{userName}</h3>

                    <p className="certificate-text">
                        <span className="course-name">{courseData?.title || 'Dasturlash asoslari'}</span> modulini muvaffaqiyatli
                        tamomlagan.
                    </p>

                    <div className="certificate-meta">
                        <div className="meta-item">
                            <span className="meta-label">Berilgan sana</span>
                            <span className="meta-value">{currentDate}</span>
                        </div>

                        <div className="meta-item meta-center">
                            <div className="seal">DK</div>
                        </div>

                        <div className="meta-item meta-right">
                            <span className="meta-label">Sertifikat ID</span>
                            <span className="meta-value">{certificateId}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="certificate-actions">
                <button className="download-btn" onClick={handleDownload}>
                    <span className="btn-icon">⬇</span>
                    <span>Saqlash (PDF)</span>
                </button>
            </div>
        </section>
    );
}

export default Certificate;
