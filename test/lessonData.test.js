import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES } from '../src/data/lessons.js';

const LEGACY_COURSES = ['html', 'css', 'js'];

test('legacy course lessons have complete theory and valid questions', () => {
  for (const courseId of LEGACY_COURSES) {
    const course = COURSES[courseId];
    assert.ok(course?.data?.length >= 5, `${courseId} should have at least 5 lessons`);

    for (const lesson of course.data) {
      assert.ok(lesson.title?.trim(), `${courseId}:${lesson.id} needs a title`);
      assert.ok(lesson.desc?.trim(), `${courseId}:${lesson.id} needs a description`);
      assert.ok(lesson.theory.length >= 4, `${courseId}:${lesson.id} needs richer theory`);
      assert.ok(lesson.questions.length >= 3, `${courseId}:${lesson.id} needs practice questions`);

      for (const question of lesson.questions) {
        assert.ok(question.id?.trim(), `${courseId}:${lesson.id} question needs id`);
        assert.ok(question.prompt?.trim(), `${courseId}:${lesson.id}:${question.id} needs prompt`);
        assert.ok(question.explanation?.trim(), `${courseId}:${lesson.id}:${question.id} needs explanation`);
        assert.equal(/[вЂрџЋђљёЎ]/.test(`${question.prompt} ${question.explanation}`), false, `${question.id} has mojibake text`);

        if (question.type === 'multiple-choice') {
          assert.ok(question.options?.length >= 4, `${question.id} needs four options`);
          assert.ok(question.options.some(option => option.id === question.correctId), `${question.id} correctId must match an option`);
        } else {
          assert.ok(question.correctAnswer?.trim(), `${question.id} needs correctAnswer`);
        }
      }
    }
  }
});
