import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { PAKISTAN_LOCATIONS } from '../data/pakistanLocations';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const domain = process.env.SITE_URL ?? 'https://example.com';
const base = domain.replace(/\/$/, '');

const urls = [
  `${base}/pakistan`,
  ...PAKISTAN_LOCATIONS.map((location) => `${base}/pakistan/${location.slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${loc.endsWith('/pakistan') ? '0.8' : '0.6'}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '..', 'public', 'pakistan-sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Generated ${outPath}`);
