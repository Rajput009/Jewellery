import { describe, expect, it } from 'vitest';
import { getChatRecommendations } from '../../api/chat';

describe('chat recommendations fallback', () => {
  it('returns recommendation response', async () => {
    const result = await getChatRecommendations('shaadi ke liye ring', 'ur');
    expect(result.text.length).toBeGreaterThan(0);
    expect(Array.isArray(result.recommendations)).toBe(true);
  });
});
