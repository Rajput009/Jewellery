export type PakistanLocation = {
  slug: string;
  city: string;
  province: string;
  region: string;
  populationTier: 'mega' | 'large' | 'growing';
  nearby: string[];
  storeNote: string;
};

export const PAKISTAN_LOCATIONS: PakistanLocation[] = [
  {
    slug: 'karachi',
    city: 'Karachi',
    province: 'Sindh',
    region: 'Coastal South',
    populationTier: 'mega',
    nearby: ['hyderabad', 'sukkur'],
    storeNote: 'Flagship delivery coverage across Clifton, DHA, and PECHS with same-day concierge pickups.',
  },
  {
    slug: 'lahore',
    city: 'Lahore',
    province: 'Punjab',
    region: 'Central Punjab',
    populationTier: 'mega',
    nearby: ['faisalabad', 'gujranwala', 'sialkot'],
    storeNote: 'High-touch appointments available near Gulberg and DHA Phase 5 with evening slots.',
  },
  {
    slug: 'islamabad',
    city: 'Islamabad',
    province: 'Islamabad Capital Territory',
    region: 'Northern Capital',
    populationTier: 'large',
    nearby: ['rawalpindi', 'peshawar'],
    storeNote: 'Private styling sessions by appointment for F-6, F-7, and E-11 clients.',
  },
  {
    slug: 'rawalpindi',
    city: 'Rawalpindi',
    province: 'Punjab',
    region: 'Northern Punjab',
    populationTier: 'large',
    nearby: ['islamabad', 'peshawar'],
    storeNote: 'Citywide insured delivery with quick swaps for ring sizing.',
  },
  {
    slug: 'faisalabad',
    city: 'Faisalabad',
    province: 'Punjab',
    region: 'Central Punjab',
    populationTier: 'large',
    nearby: ['lahore', 'sargodha'],
    storeNote: 'Weekend appointment slots for family gifting consultations.',
  },
  {
    slug: 'multan',
    city: 'Multan',
    province: 'Punjab',
    region: 'Southern Punjab',
    populationTier: 'large',
    nearby: ['bahawalpur', 'sukkur'],
    storeNote: 'Priority dispatch for wedding season and festival gifting.',
  },
  {
    slug: 'gujranwala',
    city: 'Gujranwala',
    province: 'Punjab',
    region: 'Central Punjab',
    populationTier: 'large',
    nearby: ['lahore', 'sialkot'],
    storeNote: 'Style concierge available for bridal set planning.',
  },
  {
    slug: 'peshawar',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    region: 'North West',
    populationTier: 'large',
    nearby: ['islamabad', 'mardan'],
    storeNote: 'Dedicated styling team for traditional ceremony sets.',
  },
  {
    slug: 'quetta',
    city: 'Quetta',
    province: 'Balochistan',
    region: 'South West',
    populationTier: 'growing',
    nearby: ['sukkur', 'karachi'],
    storeNote: 'Secure insured delivery for long-distance shipments.',
  },
  {
    slug: 'hyderabad',
    city: 'Hyderabad',
    province: 'Sindh',
    region: 'Lower Sindh',
    populationTier: 'growing',
    nearby: ['karachi', 'sukkur'],
    storeNote: 'Evening delivery windows available for gifting.',
  },
  {
    slug: 'sukkur',
    city: 'Sukkur',
    province: 'Sindh',
    region: 'Upper Sindh',
    populationTier: 'growing',
    nearby: ['hyderabad', 'multan'],
    storeNote: 'Complimentary virtual consultation for first-time buyers.',
  },
  {
    slug: 'sialkot',
    city: 'Sialkot',
    province: 'Punjab',
    region: 'North East Punjab',
    populationTier: 'growing',
    nearby: ['gujranwala', 'lahore'],
    storeNote: 'Local pickup scheduling for bespoke orders.',
  },
  {
    slug: 'bahawalpur',
    city: 'Bahawalpur',
    province: 'Punjab',
    region: 'Southern Punjab',
    populationTier: 'growing',
    nearby: ['multan', 'sukkur'],
    storeNote: 'Curated gifting bundles for festivals and celebrations.',
  },
  {
    slug: 'sargodha',
    city: 'Sargodha',
    province: 'Punjab',
    region: 'Central Punjab',
    populationTier: 'growing',
    nearby: ['faisalabad', 'lahore'],
    storeNote: 'Fast dispatch for anniversary and engagement orders.',
  },
  {
    slug: 'mardan',
    city: 'Mardan',
    province: 'Khyber Pakhtunkhwa',
    region: 'North West',
    populationTier: 'growing',
    nearby: ['peshawar', 'islamabad'],
    storeNote: 'Priority support for custom ring sizing.',
  },
];

export const findLocation = (slug?: string) =>
  PAKISTAN_LOCATIONS.find((location) => location.slug === slug);

export const getNearbyLocations = (slug: string) => {
  const location = findLocation(slug);
  if (!location) return [];
  return PAKISTAN_LOCATIONS.filter((item) => location.nearby.includes(item.slug));
};
