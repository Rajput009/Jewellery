export const formatMoney = (amountCents: number, currency = 'USD') => {
  const normalized = Number.isFinite(amountCents) ? amountCents : 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(normalized / 100);
};

export const compactProductDetails = (metal?: string | null, gemstone?: string | null) =>
  [metal, gemstone].filter(Boolean).join(' - ');
