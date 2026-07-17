import test from 'node:test';
import assert from 'node:assert/strict';
import { addUniqueBadges, getLessonCompletionBadges, getStreakBadges } from '../src/utils/badgeUtils.js';

test('unique badge helper does not duplicate existing badges', () => {
  assert.deepEqual(
    addUniqueBadges(['first_lesson'], ['first_lesson', 'perfect_score']),
    ['first_lesson', 'perfect_score']
  );
});

test('lesson completion badges include first lesson, perfect score, and python beginner', () => {
  assert.deepEqual(
    getLessonCompletionBadges({ courseId: 'python', completedLessonCount: 3, score: 100 }),
    ['first_lesson', 'perfect_score', 'python_beginner']
  );
});

test('streak badges unlock cumulatively', () => {
  assert.deepEqual(getStreakBadges(14), ['streak_3', 'streak_7', 'streak_14']);
  assert.deepEqual(getStreakBadges(30), ['streak_3', 'streak_7', 'streak_14', 'streak_30']);
});
