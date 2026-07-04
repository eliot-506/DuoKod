import test from 'node:test';
import assert from 'node:assert/strict';
import { getCalendarDayDifference, getLocalDateKey } from '../src/utils/streakUtils.js';

test('local date key does not use UTC day', () => {
  const localDate = new Date(2026, 6, 4, 0, 30);
  assert.equal(getLocalDateKey(localDate), '2026-07-04');
});

test('calendar difference works across month and year boundaries', () => {
  assert.equal(getCalendarDayDifference('2026-12-31', '2027-01-01'), 1);
  assert.equal(getCalendarDayDifference('2026-07-01', '2026-07-04'), 3);
});
