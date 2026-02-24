import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('chat edge cases', () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  it('returns guidance for empty query', async () => {
    const { getChatRecommendations } = await import('../../api/chat');
    const result = await getChatRecommendations('   ');
    expect(result.recommendations).toEqual([]);
    expect(result.text.length).toBeGreaterThan(0);
  });

  it('throws backend unavailable error when supabase function fails', async () => {
    const invoke = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'function failed' },
    });

    vi.doMock('../../lib/supabaseClient', () => ({
      hasSupabaseEnv: true,
      requireSupabase: () => ({
        functions: { invoke },
      }),
    }));

    const { getChatRecommendations } = await import('../../api/chat');
    await expect(getChatRecommendations('wedding look', 'en')).rejects.toMatchObject({
      name: 'ApiError',
      code: 'BACKEND_UNAVAILABLE',
    });
  });
});
