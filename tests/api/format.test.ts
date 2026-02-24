import { describe, expect, it } from 'vitest';
import { formatMoney } from '../../api/format';

describe('formatMoney', () => {
  it('formats usd cents correctly', () => {
    expect(formatMoney(315000, 'USD')).toBe('$3,150');
  });

  it('handles zero values', () => {
    expect(formatMoney(0, 'USD')).toBe('$0');
  });
});
