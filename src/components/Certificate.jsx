import { useEffect, useMemo, useState } from 'react';
import './Certificate.css';
import { useUser } from '../context/UserContext';
import { useCourseContent } from '../context/CourseContentContext';
import { BOSS_DATA } from '../data/bossData';
import { supabase } from '../lib/supabase';
import { createCertificateCode, getCourseAverageScore, isCourseComplete } from '../utils/certificateUtils';

const getStorageKey = (userId, courseId) => `duokod_certificate_${userId || 'local'}_${courseId}`;

function Certificate({ onBack }) {
    const { courses } = useCourseContent();
    const { stats } = useUser();
    const courseId = stats.currentCourse;
    const courseData = courses[courseId];
    const progress = stats.courses?.[courseId];
    const bosses = BOSS_DATA[courseId]?.bosses || [];
    const eligible = isCourseComplete(courseData, progress, bosses);
    const averageScore = getCourseAverageScore(courseData, progress);
    const userName = stats.username || 'DuoKod o‘quvchisi';
    const [certificate, setCertificate] = useState(null);
    const [status, setStatus] = useState(eligible ? 'loading' : 'ineligible');

    const localKey = useMemo(
        () => getStorageKey(stats.supabaseId || stats.email || userName, courseId),
        [courseId, stats.email, stats.supabaseId, userName]
    );

    useEffect(() => {
        if (!eligible) return;
        let active = true;

        const saveLocally = (record) => {
            localStorage.setItem(localKey, JSON.stringify(record));
            if (active) {
                setCertificate(record);
                setStatus('ready');
            }
        };

        const issueCertificate = async () => {
            const locallySaved = localStorage.getItem(localKey);
            if (locallySaved) {
                try {
                    saveLocally(JSON.parse(locallySaved));
                    return;
                } catch {
                    localStorage.removeItem(localKey);
                }
            }

            if (stats.supabaseId) {
                const { data: existing } = await supabase
                    .from('certificates')
                    .select('certificate_code, course_id, user_name, average_score, issued_at')
                    .eq('user_id', stats.supabaseId)
                    .eq('course_id', courseId)
                    .maybeSingle();

                if (existing) {
                    saveLocally(existing);
                    return;
                }
            }

            const record = {
                certificate_code: createCertificateCode(),
                course_id: courseId,
                user_name: userName,
                average_score: averageScore,
                issued_at: new Date().toISOString()
            };

            if (stats.supabaseId) {
                const { data, error } = await supabase
                    .from('certificates')
                    .insert({ ...record, user_id: stats.supabaseId })
                    .select('certificate_code, course_id, user_name, average_score, issued_at')
                    .single();
                if (!error && data) {
                    saveLocally(data);
                    return;
                }
            }

            saveLocally(record);
        };

        issueCertificate().catch(() => {
            if (active) setStatus('error');
        });
        return () => { active = false; };
    }, [averageScore, courseId, eligible, localKey, stats.supabaseId, userName]);

    if (!eligible) {
        return (
            <section className="certificate-section certificate-state">
                <h2>Sertifikat hali ochilmagan</h2>
                <p>Barcha darslar va challenge’larni yakunlaganingizdan keyin sertifikat beriladi.</p>
                <button className="download-btn" onClick={onBack}>Kursga qaytish</button>
            </section>
        );
    }

    if (status === 'loading') {
        return <section className="certificate-section certificate-state" role="status">Sertifikat tayyorlanmoqda...</section>;
    }

    if (status === 'error' || !certificate) {
        return (
            <section className="certificate-section certificate-state">
                <h2>Sertifikatni yaratib bo‘lmadi</h2>
                <button className="download-btn" onClick={onBack}>Kursga qaytish</button>
            </section>
        );
    }

    const issuedDate = new Date(certificate.issued_at).toLocaleDateString('uz-UZ');

    return (
        <section className="certificate-section">
            <button className="back-btn" onClick={onBack}>← Ortga</button>
            <h2 className="page-title">Sizning sertifikatingiz tayyor</h2>

            <div className="certificate-card">
                <div className="certificate-inner">
                    <div className="brand">DUOKOD</div>
                    <div className="eyebrow">Certificate of Achievement</div>
                    <h1 className="certificate-title">Muvaffaqiyat Sertifikati</h1>
                    <p className="certificate-subtitle">Ushbu sertifikat quyidagini tasdiqlaydi</p>
                    <h3 className="student-name">{certificate.user_name}</h3>
                    <p className="certificate-text">
                        <span className="course-name">{courseData?.title || 'Dasturlash asoslari'}</span> kursini muvaffaqiyatli tamomlagan.
                    </p>

                    <div className="certificate-meta">
                        <div className="meta-item">
                            <span className="meta-label">Berilgan sana</span>
                            <span className="meta-value">{issuedDate}</span>
                            {Number.isFinite(certificate.average_score) && <span className="meta-label">Natija: {certificate.average_score}%</span>}
                        </div>
                        <div className="meta-item meta-center"><div className="seal">DK</div></div>
                        <div className="meta-item meta-right">
                            <span className="meta-label">Sertifikat ID</span>
                            <span className="meta-value">{certificate.certificate_code}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="certificate-actions">
                <button className="download-btn" onClick={() => window.print()}>
                    <span className="btn-icon">⬇</span><span>PDF sifatida saqlash</span>
                </button>
            </div>
        </section>
    );
}

export default Certificate;
