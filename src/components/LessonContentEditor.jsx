import { useEffect, useMemo, useState } from 'react';
import { useCourseContent } from '../context/CourseContentContext';
import './LessonContentEditor.css';

const QUESTION_TYPES = [
    ['multiple-choice', 'Variantli test'],
    ['fill-blanks', 'Bo‘sh joyni to‘ldirish'],
    ['drag-reorder', 'Drag and drop'],
    ['code-write', 'Kod yozish'],
    ['code-fix', 'Kodni tuzatish']
];

const makeQuestion = (type, index) => {
    const base = {
        id: `admin-q-${Date.now()}-${index}`,
        type,
        skill: 'syntax',
        prompt: '',
        explanation: ''
    };
    if (type === 'multiple-choice') {
        return {
            ...base,
            options: [
                { id: 'a', text: '1-variant' },
                { id: 'b', text: '2-variant' }
            ],
            correctId: 'a'
        };
    }
    return { ...base, correctAnswer: '', options: type === 'drag-reorder' ? [] : undefined };
};

function LessonContentEditor() {
    const { courses, saveLesson, resetLesson, error: contentError } = useCourseContent();
    const courseIds = Object.keys(courses);
    const [courseId, setCourseId] = useState(courseIds[0] || 'python');
    const lessons = useMemo(() => courses[courseId]?.data || [], [courseId, courses]);
    const [lessonId, setLessonId] = useState(lessons[0]?.id || 1);
    const sourceLesson = useMemo(
        () => lessons.find(lesson => lesson.id === Number(lessonId)) || lessons[0],
        [lessonId, lessons]
    );
    const [draft, setDraft] = useState(null);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState('');

    useEffect(() => {
        if (lessons.length && !lessons.some(lesson => lesson.id === Number(lessonId))) {
            setLessonId(lessons[0].id);
        }
    }, [lessonId, lessons]);

    useEffect(() => {
        if (!sourceLesson) return;
        setDraft(JSON.parse(JSON.stringify(sourceLesson)));
        setNotice('');
    }, [sourceLesson]);

    const updateQuestion = (index, patch) => {
        setDraft(current => ({
            ...current,
            questions: current.questions.map((question, questionIndex) => (
                questionIndex === index ? { ...question, ...patch } : question
            ))
        }));
    };

    const changeQuestionType = (index, type) => {
        const previous = draft.questions[index];
        updateQuestion(index, {
            ...makeQuestion(type, index),
            id: previous.id,
            prompt: previous.prompt,
            skill: previous.skill,
            explanation: previous.explanation
        });
    };

    const updateChoiceOptions = (index, value) => {
        const options = value.split('\n').filter(Boolean).map((text, optionIndex) => ({
            id: String.fromCharCode(97 + optionIndex),
            text
        }));
        const current = draft.questions[index];
        updateQuestion(index, {
            options,
            correctId: options.some(option => option.id === current.correctId) ? current.correctId : options[0]?.id
        });
    };

    const handleSave = async () => {
        if (!draft?.title.trim()) return setNotice('Dars sarlavhasi bo‘sh bo‘lishi mumkin emas.');
        if (!draft.questions.length) return setNotice('Kamida bitta topshiriq qo‘shing.');
        setSaving(true);
        setNotice('');
        try {
            await saveLesson(courseId, draft);
            setNotice('Dars saqlandi va kursga qo‘llandi.');
        } catch (error) {
            setNotice(`Saqlashda xatolik: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleReset = async () => {
        if (!window.confirm('Bu darsdagi admin tahrirlarini o‘chirib, asl holatiga qaytarasizmi?')) return;
        try {
            await resetLesson(courseId, draft.id);
            setNotice('Dars asl holatiga qaytarildi.');
        } catch (error) {
            setNotice(`Qaytarishda xatolik: ${error.message}`);
        }
    };

    if (!draft) return <div className="lesson-editor-empty">Darslar topilmadi.</div>;

    return (
        <section className="lesson-editor">
            <div className="lesson-editor-heading">
                <div>
                    <p className="lesson-editor-kicker">SuperAdmin Studio</p>
                    <h2>Dars kontenti muharriri</h2>
                    <p>Nazariya, test, drag-and-drop va kod mashqlarini boshqaring.</p>
                </div>
                <div className="lesson-editor-actions">
                    <button type="button" className="editor-btn editor-btn-muted" onClick={handleReset}>Asl holatga qaytarish</button>
                    <button type="button" className="editor-btn editor-btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saqlanmoqda...' : 'Darsni saqlash'}
                    </button>
                </div>
            </div>

            {contentError && <div className="editor-alert editor-alert-error">Baza tayyor emas: Supabase migratsiyasini ishga tushiring.</div>}
            {notice && <div className="editor-alert">{notice}</div>}

            <div className="editor-selectors">
                <label>Kurs
                    <select value={courseId} onChange={event => { setCourseId(event.target.value); setLessonId(courses[event.target.value].data[0]?.id || 1); }}>
                        {courseIds.map(id => <option key={id} value={id}>{courses[id].title}</option>)}
                    </select>
                </label>
                <label>Dars
                    <select value={lessonId} onChange={event => setLessonId(Number(event.target.value))}>
                        {lessons.map(lesson => <option key={lesson.id} value={lesson.id}>{lesson.id}. {lesson.title}</option>)}
                    </select>
                </label>
            </div>

            <div className="editor-panel">
                <label>Sarlavha
                    <input value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} />
                </label>
                <label>Qisqa tavsif
                    <input value={draft.desc || ''} onChange={event => setDraft({ ...draft, desc: event.target.value })} />
                </label>
                <label>Nazariya <small>Har bir yangi qator alohida nazariya kartasi bo‘ladi.</small>
                    <textarea
                        rows="8"
                        value={(draft.theory || []).join('\n')}
                        onChange={event => setDraft({ ...draft, theory: event.target.value.split('\n').filter(line => line.trim()) })}
                    />
                </label>
            </div>

            <div className="editor-questions-header">
                <div><h3>Interaktiv topshiriqlar</h3><p>{draft.questions.length} ta topshiriq</p></div>
                <div className="editor-add-buttons">
                    {QUESTION_TYPES.map(([type, label]) => (
                        <button key={type} type="button" onClick={() => setDraft({ ...draft, questions: [...draft.questions, makeQuestion(type, draft.questions.length)] })}>
                            + {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="editor-question-list">
                {draft.questions.map((question, index) => (
                    <article className="editor-question-card" key={question.id || index}>
                        <div className="editor-question-top">
                            <strong>{index + 1}-topshiriq</strong>
                            <select value={question.type} onChange={event => changeQuestionType(index, event.target.value)}>
                                {QUESTION_TYPES.map(([type, label]) => <option key={type} value={type}>{label}</option>)}
                            </select>
                            <button type="button" className="editor-remove" onClick={() => setDraft({ ...draft, questions: draft.questions.filter((_, i) => i !== index) })}>O‘chirish</button>
                        </div>
                        <div className="editor-question-grid">
                            <label className="editor-field-wide">Savol
                                <textarea rows="2" value={question.prompt || ''} onChange={event => updateQuestion(index, { prompt: event.target.value })} />
                            </label>
                            <label>Ko‘nikma
                                <input value={question.skill || ''} onChange={event => updateQuestion(index, { skill: event.target.value })} placeholder="syntax, logic, loops..." />
                            </label>
                            {question.type === 'multiple-choice' ? (
                                <>
                                    <label className="editor-field-wide">Variantlar <small>Har qatorda bitta variant.</small>
                                        <textarea rows="4" value={(question.options || []).map(option => option.text).join('\n')} onChange={event => updateChoiceOptions(index, event.target.value)} />
                                    </label>
                                    <label>To‘g‘ri variant
                                        <select value={question.correctId || ''} onChange={event => updateQuestion(index, { correctId: event.target.value })}>
                                            {(question.options || []).map(option => <option key={option.id} value={option.id}>{option.text}</option>)}
                                        </select>
                                    </label>
                                </>
                            ) : (
                                <>
                                    {question.type === 'fill-blanks' && (
                                        <>
                                            <label>Kiritish maydonidan oldingi kod
                                                <input value={question.codeBefore || ''} onChange={event => updateQuestion(index, { codeBefore: event.target.value })} />
                                            </label>
                                            <label>Kiritish maydonidan keyingi kod
                                                <input value={question.codeAfter || ''} onChange={event => updateQuestion(index, { codeAfter: event.target.value })} />
                                            </label>
                                        </>
                                    )}
                                    {question.type === 'code-fix' && (
                                        <label className="editor-field-wide">Tuzatilishi kerak bo‘lgan boshlang‘ich kod
                                            <textarea rows="3" value={question.initialCode || ''} onChange={event => updateQuestion(index, { initialCode: event.target.value })} />
                                        </label>
                                    )}
                                    {question.type === 'drag-reorder' && (
                                        <label className="editor-field-wide">Sudraladigan bo‘laklar <small>Har qatorda bitta bo‘lak.</small>
                                            <textarea rows="3" value={(question.options || []).join('\n')} onChange={event => updateQuestion(index, { options: event.target.value.split('\n').filter(Boolean) })} />
                                        </label>
                                    )}
                                    <label className="editor-field-wide">To‘g‘ri javob
                                        <textarea rows="2" value={question.correctAnswer || ''} onChange={event => updateQuestion(index, { correctAnswer: event.target.value })} />
                                    </label>
                                </>
                            )}
                            <label className="editor-field-wide">Javob izohi
                                <textarea rows="2" value={question.explanation || ''} onChange={event => updateQuestion(index, { explanation: event.target.value })} />
                            </label>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default LessonContentEditor;
