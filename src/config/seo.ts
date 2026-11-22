import { AGENCY } from './agency';
import { RESTAURANT_INFO } from './restaurant';

// Search and social-sharing metadata. The Vite plugin in scripts/seo-plugin.ts
// writes this into index.html at build time, so crawlers see it without running JS.
export const SEO = {
  title: `${RESTAURANT_INFO.name} | ${RESTAURANT_INFO.tagline}`,
  description:
    'A Taste Worth Remembering. Experience an exquisite symphony of taste, tradition, and timeless atmosphere at The Olive Table.' +
    (AGENCY.enabled ? ` ${AGENCY.name} Showcase Demo.` : ''),
  /** Served from /public. 1200x630 is the size social networks expect. */
  ogImage: '/og-image.jpg',
  locale: 'en_IN',
  themeColor: '#081510',
  cuisine: 'Mediterranean',
  priceRange: '₹₹₹',
  address: {
    street: '42 Olive Courtyard, High Street, Bandra West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400050',
    country: 'IN',
  },
};
