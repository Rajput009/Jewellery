import { describe, expect, it } from 'vitest';
import { listProducts } from '../../api/products';

describe('listProducts fallback', () => {
  it('returns seeded fallback products when supabase env is missing', async () => {
    const products = await listProducts({ limit: 6 });
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('name');
  });

  it('filters with search query', async () => {
    const products = await listProducts({ search: 'emerald' });
    expect(products.some((product) => product.name.toLowerCase().includes('emerald'))).toBe(true);
  });
});
