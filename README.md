# dzhezhelo.dev

[![Live site](https://img.shields.io/badge/live-dzhezhelo.dev-38BDF8?style=flat-square)](https://dzhezhelo.dev)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.2-149eca?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CI](https://github.com/DMihail/engineering-profile/actions/workflows/ci.yml/badge.svg)](https://github.com/DMihail/engineering-profile/actions/workflows/ci.yml)

Public source for **[dzhezhelo.dev](https://dzhezhelo.dev)** — the portfolio of **Mykhailo Dzhezhelo**, Mobile Engineer (React Native) & web developer.

Readable production code: typed route handlers, Cache Components, tests, and a deployable Next.js 16 app — not a theme kit.

## Highlights

- **Next.js 16 App Router** — Cache Components (`use cache` / `cacheLife`), App Router pages, Node API routes, `proxy.ts` for CSP headers, section redirects, and geo cookie
- **React 19** — `useActionState`, `useFormStatus`, React Compiler (`reactCompiler: true`)
- **Theme** — light / dark / system via `data-theme` + `data-color-scheme`, bootstrap before paint, nav toggle
- **Performance** — cached portfolio sections, client islands for nav/contact only, `content-visibility` on below-fold blocks
- **SEO** — Metadata API, JSON-LD, sitemap (HTML routes only), robots (API + PDF disallow), OG images; canonical `/resume` (Ireland) is indexable
- **Agent briefs** — `/llms.txt` + `/llms-full.txt` for AI crawlers / sourcing agents
- **Contact** — validation, reCAPTCHA v3, per-IP rate limit, Firestore, optional Telegram + FCM (allowlisted UIDs only)
- **Accessibility** — landmarks, live regions, axe smoke (Jest + Playwright), reduced-motion support
- **Quality** — ESLint 9, TypeScript ~5.9, Jest, Playwright smoke, GitHub Actions on `main`/`dev` (Node 22)

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | Next.js 16.3, React 19.2, TypeScript 5.9 |
| Styling | Tailwind CSS 4, CSS Modules, design tokens (`styles/tokens/`) |
| Backend | Route Handlers, Firebase Admin, Firestore, nodemailer 10 |
| Security | reCAPTCHA v3, CSP + hardening headers, inbox CORS + UID allowlist |
| Deploy | [Vercel](https://vercel.com) |
| Icons | lucide-react (content icons via `ContentIcon`) |

## Project structure

```
app/                    Pages, layouts, API routes, metadata routes
components/
  layout/               Nav (server + client), theme toggle, footer
  sections/             Hero, cached portfolio body, contact
  contact/              Form, sidebar islands, submit action
  seo/                  JSON-LD scripts
  resume/               HTML resume + toolbar
lib/
  content/              Typed portfolio / career / UI copy
  theme.ts              Theme preference + bootstrap script
  cache-tags.ts         Tags for POST /api/revalidate
  security-headers.ts   Shared CSP + hardening headers
  inbox-allowed-uids.ts Contact FCM + inbox auth allowlist
proxy.ts                Edge proxy (aliases, cookie, security headers)
styles/                 Tokens + CSS Modules
e2e/                    Playwright smoke
__tests__/              Jest (unit, API, a11y)
public/                 CV PDFs, llms.txt / llms-full.txt, static assets
```

## Local development

**Requirements:** Node.js 22+, npm

```bash
git clone https://github.com/DMihail/engineering-profile.git
cd engineering-profile
npm install
cp .env.local.example .env.local   # fill secrets as needed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

UI works without backend keys. Contact submit and inbox APIs need env vars below.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Jest |
| `npm run test:e2e` | Playwright smoke |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run analyze` | Bundle analyzer (`ANALYZE=true`) |

## Environment variables

Create `.env.local` from `.env.local.example`. Never commit secrets.

### Contact form (minimum for submissions)

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | Server | reCAPTCHA v3 secret |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Server | Admin JSON (one line), **or** `FIREBASE_PROJECT_ID` / `NEXT_PUBLIC_FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` / `FIREBASE_PRIVATE_KEY_BASE64` |

Client Firebase web SDK keys are not used by this UI. Admin credentials are required to persist messages.

### Cache invalidation (recommended in production)

Portfolio body and site JSON-LD use Cache Components with `cacheLife("weeks")`. After content edits, invalidate without a full redeploy:

| Variable | Description |
|----------|-------------|
| `REVALIDATE_SECRET` | Bearer / `x-revalidate-secret` for `POST /api/revalidate` |

```bash
curl -X POST https://dzhezhelo.dev/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tag":"portfolio"}'
```

Allowed tags: `portfolio`, `site-json-ld` (see `lib/cache-tags.ts`).

### Optional — inbox PWA, mail, misc

| Variable | Description |
|----------|-------------|
| `INBOX_APP_URL` | Inbox origin (CORS + notification click) |
| `INBOX_ALLOWED_UIDS` | Firebase Auth UIDs for inbox routes **and** contact → FCM fan-out (**required in production**) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Outbound SMTP for inbox replies |
| `SMTP_SECURE` | Set `true` for TLS (e.g. port 465) |
| `MAIL_FROM`, `MAIL_FROM_NAME`, `MAIL_REPLY_TO` | Mail headers |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Optional Telegram notify on contact |
| `NEXT_PUBLIC_CALENDLY_URL` | Contact aside booking link |
| `NEXT_PUBLIC_PROFILE_IMAGE_PATH` | Person JSON-LD image (default `/apple-icon`) |
| `SITE_LAST_MODIFIED` | Optional sitemap `lastModified` override (ISO date; default in `lib/config.ts`) |
| `ALLOWED_DEV_ORIGINS` | Comma-separated hosts for `next dev` LAN / HMR |

Contact rate limiting is **in-process memory** (burst control on reused instances). The same helper also limits authenticated inbox reply / test-push by UID and `/api/revalidate` by IP. Prefer **Vercel Firewall / WAF** rules on `/api/contact` and `/api/inbox/*` for multi-instance abuse control.

### API overview

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | `POST` | Form → Firestore + optional Telegram / FCM (allowlisted UIDs) |
| `/api/revalidate` | `POST` | On-demand cache tag invalidation (`timingSafeEqual` + rate limit) |
| `/api/inbox/reply` | `POST` | Authenticated inbox reply → SMTP |
| `/api/inbox/test-push` | `POST` | Authenticated FCM test push |

### Resume & CV

| Surface | Role |
|---------|------|
| `/resume` | **Source of truth** — canonical HTML resume (Ireland, indexed). Print → Save as PDF |
| `/resume?variant=ua` | UA HTML variant (`noindex`; canonical stays `/resume`) |
| Hero **View resume** | Links to `/resume` (always current) |
| Contact aside | HTML resume link + region ATS PDF download |
| `public/*_CV_Ireland.pdf` / `*_CV_UK.pdf` | ATS files (`noindex` + robots disallow); UA keeps historical `*_CV_UK.pdf` name |

After career/content edits: update HTML via `lib/content/career/*`, then re-export PDFs from `/resume` (browser Print → Save as PDF) and bump `CV_PDF_EXPORTED_AT` in `lib/content/cv.ts`. Also set `SITE_LAST_MODIFIED` (or the default in `lib/config.ts`) so sitemap/footer stay honest. Keep `public/llms.txt` / `llms-full.txt` in sync when the hire pitch or projects change.

### Agent discovery

| URL | Role |
|-----|------|
| `/llms.txt` | Short hire card for AI agents |
| `/llms-full.txt` | Expanded briefing (projects, experience, contact policy) |

Prefer HTML `/resume` and the on-site contact form (`/#contact`) over PDF scraping or harvested emails.

## Security notes

- Hardening headers (CSP, COOP, CORP, HSTS, …) are defined once in `lib/security-headers.ts` and applied from `proxy.ts` and `next.config.ts`.
- Production CSP uses `'self' 'unsafe-inline'` for scripts (required with Cache Components / prerendered HTML). Nonce + `strict-dynamic` is intentionally **not** used.
- Inbox APIs require Firebase ID tokens; production also requires `INBOX_ALLOWED_UIDS` (also gates contact FCM fan-out).
- JSON-LD is serialized with `<` escaped for safe inline `<script>` embedding.

## Deployment

Built for **Vercel**:

1. Import the GitHub repository
2. Set env vars (at least reCAPTCHA + Firebase Admin + `INBOX_ALLOWED_UIDS` in production; add `REVALIDATE_SECRET` for cache busting)
3. Deploy — `main` after CI

`proxy.ts` runs on the edge; API routes use Node where Firebase Admin / nodemailer need it (`serverExternalPackages`).

## Testing

```bash
npm test
npm run test:e2e   # Playwright smoke (theme toggle, contrast light/dark, hero CTAs)
```

Install browsers once: `npx playwright install chromium`.

CI (`.github/workflows/ci.yml`) on push/PR to `main`/`dev`: lint → Jest → build → Playwright (Node 22).

## Forking & reuse

You may use this as a reference. Please:

- Replace personal content in `lib/content/`, `lib/config.ts`, `public/llms*.txt`, and `public/` CVs
- Use your own Firebase, reCAPTCHA, and domain
- Do not republish case studies, copy, or CV as your own

## License

**Source code** is open for learning and reference.

**Site content** (text, case studies, CV files, branding) © Mykhailo Dzhezhelo. All rights reserved — do not reuse without permission.

## Links

- **Live site:** [dzhezhelo.dev](https://dzhezhelo.dev)
- **GitHub:** [@DMihail](https://github.com/DMihail)
- **LinkedIn:** [mihail-dzhezhelo](https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/)
- **llms.txt:** [dzhezhelo.dev/llms.txt](https://dzhezhelo.dev/llms.txt)
