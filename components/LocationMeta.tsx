import { PAKISTAN_LOCATIONS } from '../data/pakistanLocations';

const slugToTitle = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const LocationMeta = () => {
  const path = window.location.pathname;
  if (!path.startsWith('/pakistan')) return null;

  const slug = path.split('/')[2];
  const location = PAKISTAN_LOCATIONS.find((item) => item.slug === slug);
  const cityName = location?.city ?? (slug ? slugToTitle(slug) : 'Pakistan');

  const title = location
    ? `Luxury Jewelry in ${location.city}, ${location.province} | Eluxee`
    : 'Jewelry Delivery in Pakistan | Eluxee';
  const description = location
    ? `Shop luxury jewelry in ${location.city}. Book store visits, get insured delivery, and explore curated wedding sets.`
    : 'Explore luxury jewelry delivery across Pakistan with curated collections and concierge support.';

  document.title = title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', description);

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: `Eluxee ${cityName}`,
    areaServed: location ? `${location.city}, ${location.province}` : 'Pakistan',
    url: window.location.href,
    description,
  };
  const scriptId = 'location-schema';
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(ldJson);

  return null;
};

export default LocationMeta;
