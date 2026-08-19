# dzhezhelo.dev

[![Live site](https://img.shields.io/badge/live-dzhezhelo.dev-38BDF8?style=flat-square)](https://dzhezhelo.dev)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CI](https://github.com/DMihail/engineering-profile/actions/workflows/ci.yml/badge.svg)](https://github.com/DMihail/engineering-profile/actions/workflows/ci.yml)

Public source for **[dzhezhelo.dev](https://dzhezhelo.dev)** — the portfolio of **Mykhailo Dzhezhelo**, React Native & full-stack developer.

Readable production code: typed route handlers, Cache Components, tests, and a deployable Next.js 16 app — not a theme kit.

## Highlights

- **Next.js 16 App Router** — Cache Components (`use cache` / `cacheLife`), App Router pages, Node API routes, `proxy.ts` for CSP headers, section redirects, and geo cookie
- **React 19** — `useActionState`, `useFormStatus`, React Compiler
- **Performance** — cached portfolio sections, client islands for nav/contact only, `content-visibility` on below-fold blocks
- **SEO** — Metadata API, JSON-LD, sitemap (HTML routes only), robots, OG image; canonical `/resume` (Ireland) is indexable
- **Contact** — validation, reCAPTCHA v3, per-IP rate limit, Firestore, optional Telegram + FCM to a companion inbox PWA
- **Accessibility** — landmarks, skip link, live regions, axe smoke tests, reduced-motion support
- **Quality** — ESLint 9, TypeScript ~5.9, Jest, GitHub Actions (Node 22)

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | Next.js 16.3, React 19.2, TypeScript 5.9 |
| Styling | Tailwind CSS 4, CSS Modules, design tokens (`styles/tokens/`) |
| Backend | Route Handlers, Firebase Admin, Firestore, nodemailer |
| Security | reCAPTCHA v3, CSP + hardening headers, inbox CORS + UID allowlist |
| Deploy | [Vercel](https://vercel.com) |
| Icons | lucide-react (content icons via `ContentIcon`) |

## Project structure

```
app/                    Pages, layouts, API routes, metadata routes
components/
  layout/               Nav (server shell + client), footer, skip link
  sections/             Hero, cached portfolio body, contact
  contact/              Form, sidebar islands, submit action
  seo/                  JSON-LD
  resume/               HTML resume + toolbar
lib/
  content/              Typed portfolio / career / UI copy
  cache-tags.ts         Tags for POST /api/revalidate
  security-headers.ts   Shared CSP + hardening headers
proxy.ts                Edge proxy (aliases, cookie, security headers)
styles/                 Tokens + CSS Modules
__tests__/              Jest (unit, API, a11y smoke)
public/                 CV PDFs, static assets
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
| `INBOX_ALLOWED_UIDS` | Firebase Auth UIDs for inbox routes (**required in production**) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Outbound SMTP for inbox replies |
| `SMTP_SECURE` | Set `true` for TLS (e.g. port 465) |
| `MAIL_FROM`, `MAIL_FROM_NAME`, `MAIL_REPLY_TO` | Mail headers |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Optional Telegram notify on contact |
| `NEXT_PUBLIC_CALENDLY_URL` | Contact aside booking link |
| `NEXT_PUBLIC_PROFILE_IMAGE_PATH` | Person JSON-LD image (default `/apple-icon`) |
| `SITE_LAST_MODIFIED` | Optional sitemap `lastModified` override (ISO date) |
| `ALLOWED_DEV_ORIGINS` | Comma-separated hosts for `next dev` LAN / HMR |

Contact rate limiting is **in-process memory** (burst control on reused instances). Prefer Vercel Firewall / WAF for stronger abuse limits.

### API overview

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | `POST` | Form → Firestore + optional Telegram / FCM |
| `/api/revalidate` | `POST` | On-demand cache tag invalidation |
| `/api/inbox/reply` | `POST` | Authenticated inbox reply → SMTP |
| `/api/inbox/test-push` | `POST` | Authenticated FCM test push |

### Resume & CV

| Surface | Role |
|---------|------|
| `/resume` | Canonical HTML resume (**Ireland**, indexed). Print → PDF |
| `/resume?variant=ua` | UA HTML variant (`noindex`) |
| Contact aside CV download | Region from `contact-region` cookie (geo on `/` only) |
| `public/*_CV_Ireland.pdf` / `*_CV_UK.pdf` | ATS files (`noindex`); UA still uses the historical `*_CV_UK.pdf` name |

## Security notes

- Hardening headers (CSP, COOP, CORP, HSTS, …) are defined once in `lib/security-headers.ts` and applied from `proxy.ts` and `next.config.ts`.
- Production CSP uses `'self' 'unsafe-inline'` for scripts (required with Cache Components / prerendered HTML). Nonce + `strict-dynamic` is intentionally **not** used.
- Inbox APIs require Firebase ID tokens; production also requires `INBOX_ALLOWED_UIDS`.

## Deployment

Built for **Vercel**:

1. Import the GitHub repository
2. Set env vars (at least reCAPTCHA + Firebase Admin; add `REVALIDATE_SECRET` for cache busting)
3. Deploy — `main` after CI

`proxy.ts` runs on the edge; API routes use Node where Firebase Admin / nodemailer need it.

## Testing

```bash
npm test
```

CI runs Jest on push/PR to `main` (Node 22). Lint locally with `npm run lint`.

## Forking & reuse

You may use this as a reference. Please:

- Replace personal content in `lib/content/`, `lib/config.ts`, and `public/` CVs
- Use your own Firebase, reCAPTCHA, and domain
- Do not republish case studies, copy, or CV as your own

## License

**Source code** is open for learning and reference.

**Site content** (text, case studies, CV files, branding) © Mykhailo Dzhezhelo. All rights reserved — do not reuse without permission.

## Links

- **Live site:** [dzhezhelo.dev](https://dzhezhelo.dev)
- **GitHub:** [@DMihail](https://github.com/DMihail)
- **LinkedIn:** [mihail-dzhezhelo](https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/)
