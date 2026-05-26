# dzhezhelo.dev

Personal engineering portfolio for **Mykhailo Dzhezhelo** — React Native Engineer.

Built with Next.js 16, React 19, Tailwind CSS 4, and TypeScript.

**Live:** [engineering-profile.vercel.app](https://engineering-profile.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, CSS Modules |
| Language | TypeScript 5 |
| Icons | Lucide React |
| Fonts | Inter, JetBrains Mono (Google Fonts) |
| Deployment | Vercel |

## Project Structure

```
app/
  layout.tsx            # Root layout, metadata, fonts
  page.tsx              # Home page
  not-found.tsx         # Custom 404 page
  globals.css           # Design tokens, Tailwind theme, global styles
  manifest.ts           # PWA web manifest
  robots.ts             # robots.txt generation
  sitemap.ts            # sitemap.xml generation
  opengraph-image.tsx   # Dynamic OG image (1200x630)
  apple-icon.tsx        # Dynamic Apple touch icon (180x180)
  favicon.ico           # Multi-size favicon (16/32/48px)
  icon.svg              # SVG favicon

components/
  layout/
    nav-bar.tsx         # Sticky navbar with scroll spy
    footer.tsx          # Footer with social links
  sections/
    hero-section.tsx    # Hero with terminal card
    impact-section.tsx  # Key capabilities
    case-studies-section.tsx  # Expandable case studies (<details>)
    skills-section.tsx  # Skill layers grid
    experience-section.tsx   # Work history timeline
    contact-section.tsx # Contact form and links
    lazy-sections.tsx   # Lazy-loaded section wrapper
  ui/
    icons.tsx           # MDLogo, GitHub, LinkedIn icons
    primitives.tsx      # SectionLabel, Chip components
    fade-in.tsx         # Intersection Observer fade-in
    lazy-section.tsx    # Lazy section loading utility

lib/
  config.ts             # Site-wide constants (URL, author, email)
  data.ts               # All content data arrays
  types.ts              # TypeScript interfaces
  hooks.ts              # Custom hooks (useFadeIn)
  utils.ts              # Utility functions

styles/
  sections/             # CSS Modules for sections
  layout/               # CSS Modules for layout
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

Requires **Node.js 20+**.

## Configuration

All site-wide constants are in `lib/config.ts`:

```typescript
export const SITE_URL = "https://engineering-profile.vercel.app";
export const SITE_AUTHOR = "Mykhailo Dzhezhelo";
export const SITE_EMAIL = "dzhezhelomikhail@gmail.com";
```

Content data (experience, case studies, skills, etc.) lives in `lib/data.ts`.

## Search Engine Verification

After deploying, register the site and fill in the verification codes in `app/layout.tsx`:

```html
<meta name="google-site-verification" content="YOUR_CODE" />
<meta name="yandex-verification" content="YOUR_CODE" />
<meta name="msvalidate.01" content="YOUR_CODE" />
```

## Deploy to Vercel

```bash
npx vercel
```

Or connect the GitHub repository in the [Vercel Dashboard](https://vercel.com/new) — auto-detected as Next.js, zero config needed.

## License

Private project. All rights reserved.
