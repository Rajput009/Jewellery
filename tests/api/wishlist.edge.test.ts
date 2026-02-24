import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('wishlist edge cases', () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  it('rejects invalid product identifier', async () => {
    const { addWishlistItem } = await import('../../api/wishlist');
    await expect(addWishlistItem('!')).rejects.toMatchObject({
      name: 'ApiError',
      code: 'VALIDATION_FAILED',
    });
  });
});
