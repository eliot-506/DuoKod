import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COURSES as STATIC_COURSES } from '../data/lessons';
import { supabase } from '../lib/supabase';
import { useUser } from './UserContext';

const CourseContentContext = createContext(null);

const mergeCourses = (rows) => {
    const overrides = new Map(
        (rows || []).map(row => [`${row.course_id}:${row.lesson_id}`, row])
    );

    return Object.fromEntries(
        Object.entries(STATIC_COURSES).map(([courseId, course]) => [
            courseId,
            {
                ...course,
                data: course.data.map(lesson => {
                    const override = overrides.get(`${courseId}:${lesson.id}`);
                    if (!override) return lesson;
                    return {
                        ...lesson,
                        title: override.title,
                        desc: override.description,
                        theory: Array.isArray(override.theory) ? override.theory : lesson.theory,
                        questions: Array.isArray(override.questions) ? override.questions : lesson.questions
                    };
                })
            }
        ])
    );
};

export function CourseContentProvider({ children }) {
    const { stats } = useUser();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshContent = useCallback(async () => {
        setLoading(true);
        const { data, error: queryError } = await supabase
            .from('lesson_contents')
            .select('*')
            .order('course_id')
            .order('lesson_id');

        if (queryError) {
            setError(queryError);
        } else {
            setRows(data || []);
            setError(null);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (stats.isLoggedIn) refreshContent();
        else setLoading(false);
    }, [refreshContent, stats.isLoggedIn, stats.supabaseId]);

    const saveLesson = async (courseId, lesson) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Darsni saqlash uchun tizimga qayta kiring.');

        const payload = {
            course_id: courseId,
            lesson_id: lesson.id,
            title: lesson.title.trim(),
            description: (lesson.desc || '').trim(),
            theory: lesson.theory || [],
            questions: lesson.questions || [],
            updated_by: user.id,
            updated_at: new Date().toISOString()
        };

        const { data, error: saveError } = await supabase
            .from('lesson_contents')
            .upsert(payload, { onConflict: 'course_id,lesson_id' })
            .select()
            .single();

        if (saveError) throw saveError;
        setRows(current => [
            ...current.filter(row => !(row.course_id === courseId && row.lesson_id === lesson.id)),
            data
        ]);
        return data;
    };

    const resetLesson = async (courseId, lessonId) => {
        const { error: deleteError } = await supabase
            .from('lesson_contents')
            .delete()
            .eq('course_id', courseId)
            .eq('lesson_id', lessonId);
        if (deleteError) throw deleteError;
        setRows(current => current.filter(row => !(row.course_id === courseId && row.lesson_id === lessonId)));
    };

    const courses = useMemo(() => mergeCourses(rows), [rows]);

    return (
        <CourseContentContext.Provider value={{ courses, loading, error, saveLesson, resetLesson, refreshContent }}>
            {children}
        </CourseContentContext.Provider>
    );
}

export const useCourseContent = () => {
    const value = useContext(CourseContentContext);
    if (!value) throw new Error('useCourseContent CourseContentProvider ichida ishlatilishi kerak.');
    return value;
};
