import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('orders edge cases', () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  it('rejects invalid order number format', async () => {
    const { getOrderByOrderNumber } = await import('../../api/orders');
    await expect(getOrderByOrderNumber('bad-order')).rejects.toMatchObject({
      name: 'ApiError',
      code: 'VALIDATION_FAILED',
    });
  });

  it('requires authentication when supabase is configured', async () => {
    vi.doMock('../../lib/supabaseClient', () => ({
      hasSupabaseEnv: true,
      requireSupabase: () => ({
        from: vi.fn(),
      }),
    }));
    vi.doMock('../../api/auth', () => ({
      getCurrentUser: vi.fn().mockResolvedValue(null),
    }));

    const { getOrderByOrderNumber } = await import('../../api/orders');
    await expect(getOrderByOrderNumber('ELX-20260224-AB12CD34')).rejects.toMatchObject({
      name: 'ApiError',
      code: 'AUTH_REQUIRED',
    });
  });

  it('returns local order record in fallback mode when number matches latest', async () => {
    vi.doMock('../../lib/supabaseClient', () => ({
      hasSupabaseEnv: false,
      requireSupabase: vi.fn(),
    }));
    vi.doMock('../../api/auth', () => ({
      getCurrentUser: vi.fn().mockResolvedValue(null),
    }));

    const orderNumber = 'ELX-20260224-AB12CD34';
    window.localStorage.setItem('latest_order_number', orderNumber);

    const { getOrderByOrderNumber } = await import('../../api/orders');
    const result = await getOrderByOrderNumber(orderNumber);
    expect(result?.orderNumber).toBe(orderNumber);
  });
});
