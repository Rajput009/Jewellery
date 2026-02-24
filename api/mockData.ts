import type { ProductCard, ProductDetail } from './types';

export const FALLBACK_PRODUCTS: ProductCard[] = [
  {
    id: 'c1',
    slug: 'eternal-diamond-solitaire',
    name: 'Eternal Diamond Solitaire',
    collection: 'Bridal Collection',
    priceLabel: '$2,450',
    details: '18k Yellow Gold - 1.2 Carat',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=900&auto=format&fit=crop',
    shortDescription: 'Bridal icon in 18k gold.',
  },
  {
    id: 'c2',
    slug: 'sapphire-halo-orbit',
    name: 'Sapphire Halo Orbit',
    collection: 'Modern Muse',
    priceLabel: '$1,890',
    details: 'Platinum - Blue Sapphire',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop',
    shortDescription: 'Modern sapphire halo ring.',
  },
  {
    id: 'c3',
    slug: 'dainty-pave-stack-band',
    name: 'Dainty Pave Stack Band',
    collection: 'Modern Muse',
    priceLabel: '$1,200',
    details: '18k Rose Gold - Recycled Diamonds',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=900&auto=format&fit=crop',
    shortDescription: 'Minimal everyday stack band.',
  },
  {
    id: 'c4',
    slug: 'vintage-emerald-cut',
    name: 'Vintage Emerald Cut',
    collection: 'Heritage',
    priceLabel: '$3,150',
    details: '18k Yellow Gold - Emerald Cut',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop',
    shortDescription: 'Heritage emerald statement ring.',
  },
  {
    id: 'c5',
    slug: 'grand-gatsby-signet',
    name: 'Grand Gatsby Signet',
    collection: 'Heritage',
    priceLabel: '$2,780',
    details: '18k White Gold - Custom Intaglio',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=900&auto=format&fit=crop',
    shortDescription: 'Art deco inspired signet ring.',
  },
  {
    id: 'c6',
    slug: 'infinity-vine-band',
    name: 'Infinity Vine Band',
    collection: 'Modern Muse',
    priceLabel: '$950',
    details: '14k Yellow Gold - Conflict Free',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop',
    shortDescription: 'Soft vine motif ring.',
  },
];

export const FALLBACK_PRODUCT_DETAILS: Record<string, ProductDetail> = {
  c4: {
    id: 'c4',
    slug: 'vintage-emerald-cut',
    name: 'Vintage Emerald Cut Ring',
    collection: 'Heritage Collection',
    priceLabel: '$3,150',
    description:
      'Hand-crafted in our Milan atelier, this piece features a 2.5ct ethically sourced emerald in a sculpted 18k yellow gold setting.',
    metal: '18k Yellow Gold',
    gemstone: 'Natural Emerald (2.5ct)',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1400&auto=format&fit=crop',
        alt: 'Vintage Emerald Cut Ring main view',
      },
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop',
        alt: 'Emerald gemstone detail',
      },
      {
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop',
        alt: 'Lifestyle hand shot',
      },
    ],
    variants: [],
  },
};
