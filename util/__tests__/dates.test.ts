import { describe, expect, test } from '@jest/globals';
import { formatDate, getDaysUntilNextBirthday } from '../dates';

describe('formatDate function', () => {
  test("formats animal's birth date", () => {
    expect(formatDate(new Date('2002-03-02'))).toBe('02-03-2002');
    expect(formatDate(new Date('2020-05-10'))).toBe('10-05-2020');
    expect(formatDate(new Date('2020-05-10'), 'de-AT')).toBe('10.05.2020');

    const dates = [
      {
        actualParameter: new Date('2010-08-01'),
        expected: '01-08-2010',
      },
      {
        actualParameter: new Date('2001-07-10'),
        expected: '10-07-2001',
      },
    ];

    for (const date of dates) {
      expect(formatDate(date.actualParameter)).toBe(date.expected);
    }
  });
});

describe('getDaysUntilNextBirthday function', () => {
  test('returns 0 when the birthday is today', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2026-06-15T12:00:00Z'),
        new Date('2002-06-15T00:00:00Z'),
      ),
    ).toBe(0);
  });

  test('returns 1 when the birthday is tomorrow', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2026-06-14T12:00:00Z'),
        new Date('2002-06-15T00:00:00Z'),
      ),
    ).toBe(1);
  });

  test('uses next year when the birthday has already passed', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2026-06-16T12:00:00Z'),
        new Date('2002-06-15T00:00:00Z'),
      ),
    ).toBe(364);
  });

  test('counts days across the end of the year', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2026-12-31T12:00:00Z'),
        new Date('2002-01-01T00:00:00Z'),
      ),
    ).toBe(1);
  });

  test('includes February 29 when counting days in a leap year', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2028-02-28T12:00:00Z'),
        new Date('2002-03-01T00:00:00Z'),
      ),
    ).toBe(2);
  });

  test('returns 1 for a February 29 birthday on February 28 in a leap year', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2028-02-28T12:00:00Z'),
        new Date('2000-02-29T00:00:00Z'),
      ),
    ).toBe(1);
  });

  test('uses March 1 for a February 29 birthday in a non-leap year', () => {
    expect(
      getDaysUntilNextBirthday(
        new Date('2026-02-28T12:00:00Z'),
        new Date('2000-02-29T00:00:00Z'),
      ),
    ).toBe(1);
  });

  test('does not mutate the birth date', () => {
    const birthDate = new Date('2002-06-15T15:30:00Z');

    getDaysUntilNextBirthday(new Date('2026-06-14T12:00:00Z'), birthDate);

    expect(birthDate.toISOString()).toBe('2002-06-15T15:30:00.000Z');
  });
});
