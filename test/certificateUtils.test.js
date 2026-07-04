import test from 'node:test';
import assert from 'node:assert/strict';
import { getCourseAverageScore, isCourseComplete } from '../src/utils/certificateUtils.js';

const course = { data: [{ id: 1 }, { id: 2 }] };
const bosses = [{ moduleId: 2 }];

test('certificate requires every lesson and boss', () => {
  assert.equal(isCourseComplete(course, { completedNodes: [1, 2] }, bosses), false);
  assert.equal(isCourseComplete(course, { completedNodes: [1, 2, 200] }, bosses), true);
});

test('average score ignores missing scores', () => {
  assert.equal(getCourseAverageScore(course, { lessonScores: { 1: 80, 2: 100 } }), 90);
  assert.equal(getCourseAverageScore(course, { lessonScores: {} }), null);
});
