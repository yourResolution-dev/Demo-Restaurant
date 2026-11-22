import type { Plugin } from 'vite';
import { RESTAURANT_INFO } from '../src/config/restaurant';
import { SEO } from '../src/config/seo';
import { HERO_SLIDES } from '../src/config/hero';
import { IMAGE_WIDTHS } from '../src/config/images';
import { PRELOAD_FONTS } from '../src/config/fonts';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Fills the SEO tokens in index.html and injects Open Graph, Twitter and
 * Restaurant JSON-LD tags, all from src/config. Set SITE_URL (e.g.
 * https://olive-table.example.com) at build time to also emit absolute
 * canonical / og:url / og:image URLs, which social crawlers require.
 */
export function seoPlugin(): Plugin {
  const siteUrl = (process.env.SITE_URL ?? '').replace(/\/+$/, '');
  const abs = (path: string) => (siteUrl ? `${siteUrl}${path}` : path);

  return {
    name: 'seo-html',
    transformIndexHtml(html) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: RESTAURANT_INFO.brandName,
        description: SEO.description,
        image: abs(SEO.ogImage),
        ...(siteUrl && { url: siteUrl }),
        telephone: RESTAURANT_INFO.phone,
        email: RESTAURANT_INFO.email,
        servesCuisine: SEO.cuisine,
        priceRange: SEO.priceRange,
        foundingDate: String(RESTAURANT_INFO.established),
        hasMap: RESTAURANT_INFO.googleMapsUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO.address.street,
          addressLocality: SEO.address.city,
          addressRegion: SEO.address.region,
          postalCode: SEO.address.postalCode,
          addressCountry: SEO.address.country,
        },
      };

      const meta = (attrs: Record<string, string>) =>
        `    <meta ${Object.entries(attrs)
          .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
          .join(' ')} />`;

      // Preload the first hero image so the browser fetches it before the JS runs.
      const heroMatch = HERO_SLIDES[0]?.image.match(/^(.*)-\d+\.webp$/);
      const heroPreload =
        heroMatch &&
        `    <link rel="preload" as="image" fetchpriority="high" imagesizes="100vw" imagesrcset="${IMAGE_WIDTHS.map((w) => `${heroMatch[1]}-${w}.webp ${w}w`).join(', ')}" />`;

      const fontPreloads = PRELOAD_FONTS.map(
        (href) =>
          `    <link rel="preload" as="font" type="font/woff2" href="${escapeHtml(href)}" crossorigin />`
      );

      const tags = [
        ...fontPreloads,
        heroPreload,
        meta({ name: 'theme-color', content: SEO.themeColor }),
        siteUrl && `    <link rel="canonical" href="${escapeHtml(siteUrl + '/')}" />`,
        meta({ property: 'og:type', content: 'restaurant.restaurant' }),
        meta({ property: 'og:site_name', content: RESTAURANT_INFO.brandName }),
        meta({ property: 'og:title', content: SEO.title }),
        meta({ property: 'og:description', content: SEO.description }),
        meta({ property: 'og:image', content: abs(SEO.ogImage) }),
        meta({ property: 'og:locale', content: SEO.locale }),
        siteUrl && meta({ property: 'og:url', content: siteUrl + '/' }),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: SEO.title }),
        meta({ name: 'twitter:description', content: SEO.description }),
        meta({ name: 'twitter:image', content: abs(SEO.ogImage) }),
        `    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\u003c')}</script>`,
      ]
        .filter(Boolean)
        .join('\n');

      return html
        .replace('%SEO_TITLE%', escapeHtml(SEO.title))
        .replace('%SEO_DESCRIPTION%', escapeHtml(SEO.description))
        .replace('</head>', `${tags}\n  </head>`);
    },
  };
}
