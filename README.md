# The Olive Table

A single-page restaurant website: hero slideshow, story, signature menu with a tasting list,
chef profile, gallery with lightbox, reviews, a simulated table reservation with a WhatsApp
handoff, and contact details. Built as a showcase demo and structured so a new restaurant can
be re-skinned by editing one folder.

**Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 4, shadcn/ui-style components on Radix.

## Run it

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint (TypeScript, React Hooks, jsx-a11y)
npm run format     # Prettier
```

Node 20 or newer is required (Tailwind CSS 4).

## Re-skin for another restaurant

Everything a restaurant owner would change lives in `src/config/`:

| File              | What it controls                                                      |
| ----------------- | --------------------------------------------------------------------- |
| `restaurant.ts`   | Name, tagline, address, phone, email, WhatsApp number, hours, chef    |
| `menu.ts`         | Dishes, prices, descriptions, tags, photos                            |
| `gallery.ts`      | Gallery photos and captions                                           |
| `testimonials.ts` | Guest reviews                                                         |
| `hero.ts`         | Hero slideshow copy and images (the first image is preloaded)         |
| `seo.ts`          | Page title, description, social image, address for search engines     |
| `theme.css`       | Colour palette and fonts, as CSS variables mapped to Tailwind         |
| `agency.ts`       | Agency showcase layer on/off: banner, inquiry modal, demo footer line |
| `images.ts`       | Image widths generated for every photo                                |
| `fonts.ts`        | Fonts preloaded on first load                                         |

### Delivering to a real restaurant

Set `enabled: false` in `src/config/agency.ts`. The ReSolution banner, inquiry modal and demo line in
the footer disappear, the search description drops "Showcase Demo", and the floating WhatsApp button
messages the restaurant instead of the agency. While it is on, set `AGENCY.whatsappNumber` to the
agency's own WhatsApp number (it currently matches the restaurant's).

Page prose in the section components (story, section headings) is still written in the
components themselves; edit those files for deeper copy changes.

`whatsappNumber` is digits only with the country code and no `+`, for example `919332012109`.

### Colours and components

Use the palette tokens, not raw hex values: `bg-forest-900`, `text-gold-700`, `border-gold-400/40`.
On light backgrounds use `text-gold-700` or darker, because the lighter golds fail WCAG AA contrast
there. Reusable pieces are in `src/components/ui/` (`Button`, `Input`, `Field`, `Select`,
`Dialog`, `Sheet`, `Badge`, `ResponsiveImage`). The button has brand variants such as `gold`,
`outline` and `whatsapp`.

## Images and fonts

Photos and fonts are self-hosted so the page makes no third-party requests.

```bash
node scripts/fetch-images.mjs      # downloads each photo as WebP in several widths
node scripts/fetch-fonts.mjs       # downloads the fonts and writes src/styles/fonts.css
python scripts/subset-fonts.py     # trims fonts to the characters the site uses
```

- Photo ids are listed in `scripts/image-sources.json`. To use your own photos, put WebP files in
  `public/images/` named `<name>-<width>.webp` for each width in `src/config/images.ts`, and point
  the config at one of them, for example `/images/dish-1200.webp`.
- `subset-fonts.py` needs `pip install fonttools brotli`. Re-run the font scripts after adding
  text with new special characters.
- Photos come from [Unsplash](https://unsplash.com) and are credited in the footer. Fonts are
  licensed under the SIL Open Font License.

## Deploying

The build output is plain static files in `dist/`; any static host works.

1. Set the environment variable `SITE_URL` to the final address at build time, for example
   `https://olive-table.example.com`. It adds the canonical link, `og:url` and absolute
   social-share image URLs, which social networks require.
2. Build command `npm run build`, output directory `dist`.
3. `public/_headers` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel) set long-lived caching
   for the fingerprinted files in `assets/` and for `images/` and `fonts/`.

Search and share metadata (title, description, Open Graph, Twitter card and `Restaurant`
structured data) is written into `index.html` at build time from `src/config` by
`scripts/seo-plugin.ts`.

## How it is organised

```
src/
  config/          content and theme (edit this to re-skin)
  components/      page sections and modals
  components/ui/   shared building blocks
  lib/             small helpers: lazy sections, saved tasting list, WhatsApp message, focus
scripts/           image and font tooling, SEO build plugin
```

Below-the-fold sections load as you scroll (`src/lib/lazy-section.tsx`). Each leaves a placeholder
with the same `id` and a similar height, so anchor links work and the page does not jump. If you
change a section's height a lot, update its `placeholderClass` in `src/RestaurantDemoPage.tsx`.

The reservation form is a simulation: it validates input and shows a confirmation with a
reference code, and the confirmation offers to send the booking to the restaurant on WhatsApp.
Nothing is sent to a server. The tasting list is saved in the browser's `localStorage`.

## Accessibility

Targets WCAG 2.2 AA: skip link, visible focus, keyboard-operable dialogs with focus return, a
pausable hero slideshow that stays still for visitors who prefer reduced motion, and tested colour
contrast. Lint enforces the `jsx-a11y` rules.
