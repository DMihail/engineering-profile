# dzhezhelo.dev

[![Live site](https://img.shields.io/badge/live-dzhezhelo.dev-38BDF8?style=flat-square)](https://dzhezhelo.dev)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![CI](https://github.com/DMihail/engineering-profile/actions/workflows/ci.yml/badge.svg)](https://github.com/DMihail/engineering-profile/actions/workflows/ci.yml)

Public source for **[dzhezhelo.dev](https://dzhezhelo.dev)** — the portfolio site of **Mykhailo Dzhezhelo**, React Native & full-stack developer.

The repo is meant to be readable: production patterns, typed API routes, tests, and a deployable Next.js app — not a theme or starter kit.

## Highlights

- **Next.js 16 App Router** — static home page, dynamic API routes, `proxy.ts` for edge routing and geo hints
- **React 19** — `useActionState`, `useFormStatus`, React Compiler enabled
- **Performance** — `content-visibility: auto` on below-fold sections, optimized `lucide-react` imports, no-JS fallbacks for nav and contact
- **SEO** — Metadata API, JSON-LD (`Person`, `WebSite`, `ItemList`), sitemap, robots, OG image route
- **Contact form** — client validation, reCAPTCHA v3, Firestore persistence, optional FCM push to a companion inbox app
- **Accessibility** — semantic landmarks, skip link, keyboard nav, reduced-motion-aware animations
- **Quality** — ESLint, TypeScript strict mode, Jest (unit + API + component tests), GitHub Actions CI

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, CSS Modules, design tokens in `app/globals.css` |
| Backend | Route Handlers, Firebase Admin, Firestore, nodemailer |
| Security | reCAPTCHA v3, security headers, CORS on inbox API |
| Deploy | [Vercel](https://vercel.com) |
| Icons | lucide-react |

## Project structure

```
app/                    App Router pages, layouts, API routes, metadata routes
components/
  layout/               NavBar, Footer
  sections/             Hero, case studies, skills, experience, contact, …
  seo/                  JSON-LD script component
lib/
  content/              Typed site content (career, portfolio, nav, UI labels)
  config.ts             Site constants (URL, author, SEO copy)
  json-ld.ts            Schema.org graph builder
proxy.ts                Edge proxy (section aliases → /#id, 404 passthrough, contact region cookie)
styles/                 CSS Modules per section / layout
__tests__/              Jest tests
public/                 CV PDFs, static assets
```

## Local development

**Requirements:** Node.js 20+, npm

```bash
git clone https://github.com/DMihail/engineering-profile.git
cd engineering-profile
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site renders without backend keys. The contact form and inbox API need environment variables (see below).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm test` | Jest test suite |
| `npm run analyze` | Bundle analyzer (`ANALYZE=true`) |

## Environment variables

Create `.env.local` from the template (`.env.local.example`) and fill in values. Never commit `.env.local`.

### Contact form (minimum for submissions)

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | Server | reCAPTCHA v3 secret |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Server | Firebase Admin JSON (single line), **or** `FIREBASE_PROJECT_ID` / `NEXT_PUBLIC_FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` / `FIREBASE_PRIVATE_KEY_BASE64` |

Admin credentials are required to write messages to Firestore. Client Firebase web SDK keys are not used by this portfolio UI.

### Optional — push notifications & inbox reply API

Used with the separate **personal-site-inbox** PWA (same Firebase project):

| Variable | Description |
|----------|-------------|
| `INBOX_APP_URL` | Inbox app origin (CORS + notification click URL) |
| `INBOX_ALLOWED_UIDS` | Comma-separated Firebase Auth UIDs allowed on inbox API routes (**required in production**) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Outbound mail for inbox replies |
| `MAIL_FROM`, `MAIL_FROM_NAME`, `MAIL_REPLY_TO` | From / Reply-To headers |

Without Admin credentials the contact UI still works locally; submissions fail server-side until Firestore is configured. Push notifications are skipped if FCM is unavailable.

### API overview

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | `POST` | Contact form → Firestore + optional FCM |
| `/api/inbox/reply` | `POST` | Authenticated reply from inbox PWA → email via SMTP |
| `/api/inbox/test-push` | `POST` | Authenticated FCM test push to the signed-in user's device token |

### Resume assets

| Surface | Role |
|---------|------|
| `/resume` | Canonical HTML resume (indexed, print → PDF) |
| `public/*_CV_Ireland.pdf` / `*_CV_UK.pdf` | ATS downloadables (`noindex`); UA region still uses the historical `*_CV_UK.pdf` filename |

## Deployment

Built for **Vercel**:

1. Import the GitHub repository
2. Set environment variables in the Vercel project settings
3. Deploy — `main` branch is production-ready after CI passes

`proxy.ts` runs on the edge; API routes use the Node.js runtime where Firebase Admin and nodemailer are required.

## Testing

```bash
npm test
```

CI runs on every push and pull request to `main` (lint is run locally; CI runs the Jest suite).

## Forking & reuse

You may use this codebase as a reference or starting point for your own portfolio. Please:

- Replace personal content in `lib/content/`, `lib/config.ts`, and `public/` CVs
- Use your own Firebase project, reCAPTCHA keys, and domain
- Do not republish my case studies, copy, or CV as your own

## License

**Source code** in this repository is open for learning and reference.

**Site content** (text, case studies, CV files, branding) © Mykhailo Dzhezhelo. All rights reserved — do not reuse without permission.

## Links

- **Live site:** [dzhezhelo.dev](https://dzhezhelo.dev)
- **GitHub:** [@DMihail](https://github.com/DMihail)
- **LinkedIn:** [mihail-dzhezhelo](https://www.linkedin.com/in/mihail-dzhezhelo-27a41114a/)
