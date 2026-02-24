import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('cart edge cases', () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  it('rejects invalid product identifier', async () => {
    const { addCartItem } = await import('../../api/cart');
    await expect(addCartItem('!', 1)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'VALIDATION_FAILED',
    });
  });

  it('rejects non-positive quantity', async () => {
    const { addCartItem } = await import('../../api/cart');
    await expect(addCartItem('c1', 0)).rejects.toMatchObject({
      name: 'ApiError',
      code: 'VALIDATION_FAILED',
    });
  });

  it('throws backend error for authenticated user instead of falling back', async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('database unavailable'),
    });
    const eq = vi.fn().mockReturnValue({ single });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });

    vi.doMock('../../lib/supabaseClient', () => ({
      hasSupabaseEnv: true,
      requireSupabase: () => ({ from }),
    }));
    vi.doMock('../../api/auth', () => ({
      getCurrentUser: vi.fn().mockResolvedValue({ id: 'user-1', email: 'u@example.com' }),
    }));

    const { getCartItems } = await import('../../api/cart');
    await expect(getCartItems()).rejects.toBeInstanceOf(Error);
    expect(from).toHaveBeenCalledWith('carts');
  });
});
