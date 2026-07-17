import test from 'node:test';
import assert from 'node:assert/strict';
import { addDailyXp, getDailyGoalProgress, normalizeDailyXp } from '../src/utils/progressUtils.js';

test('daily xp resets when stored date is not today', () => {
  assert.deepEqual(
    normalizeDailyXp({ date: '2026-07-16', xp: 40 }, '2026-07-17'),
    { date: '2026-07-17', xp: 0 }
  );
});

test('daily xp accumulates only positive amounts for the same day', () => {
  const first = addDailyXp({ date: '2026-07-17', xp: 15 }, 20, '2026-07-17');
  const second = addDailyXp(first, -50, '2026-07-17');

  assert.deepEqual(first, { date: '2026-07-17', xp: 35 });
  assert.deepEqual(second, { date: '2026-07-17', xp: 35 });
});

test('daily goal progress is capped for display while preserving remaining xp', () => {
  assert.deepEqual(
    getDailyGoalProgress({ date: '2026-07-17', xp: 70 }, 50, '2026-07-17'),
    { currentXp: 70, cappedXp: 50, remainingXp: 0, percent: 100 }
  );
});
