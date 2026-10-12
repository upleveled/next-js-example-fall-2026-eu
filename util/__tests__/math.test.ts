import { describe, expect, test } from '@jest/globals';
import { multiply, sum } from '../math';

describe('sum function', () => {
  test('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(-10, 3)).toBe(-7);
  });

  test('throws an error if arguments are not numbers', () => {
    // @ts-expect-error -- Testing incorrect function usage
    expect(() => sum(2, '3')).toThrow('Please pass only numbers');
    // @ts-expect-error -- Testing incorrect function usage
    expect(() => sum(false, 100)).toThrow('Please pass only numbers');
  });
});

describe('multiply function', () => {
  test('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-10, 3)).toBe(-30);
  });

  test('throws an error if arguments are not numbers', () => {
    // @ts-expect-error -- Testing incorrect function usage
    expect(() => multiply(2, '3')).toThrow('Please pass only numbers');
    // @ts-expect-error -- Testing incorrect function usage
    expect(() => multiply(false, 100)).toThrow('Please pass only numbers');
  });
});
