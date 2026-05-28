# dzhezhelo.dev

Personal engineering portfolio — **Mykhailo Dzhezhelo**, React Native Engineer.

**Live:** [dzhezhelo.dev](https://dzhezhelo.dev)

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, Tailwind CSS 4, CSS Modules
- Firebase (Cloud Firestore)
- Google reCAPTCHA v3
- TypeScript 5
- Vercel

## Setup

```bash
npm install
cp .env.local.example .env.local  # fill in Firebase + reCAPTCHA keys
npm run dev
```

Requires **Node.js 20+**.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase client API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (public) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key (server only) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase Admin service account JSON (single line) — for FCM push to inbox |
| `FIREBASE_CLIENT_EMAIL` | Alternative to JSON: service account client email |
| `FIREBASE_PRIVATE_KEY` | Service account `private_key` — **one line** in double quotes with `\n` (do not paste multiline PEM in `.env`) |
| `FIREBASE_PRIVATE_KEY_BASE64` | Optional: entire PEM file base64-encoded (robust for Vercel) |
| `INBOX_APP_URL` | Optional. URL opened when a push notification is clicked (inbox app) |

Push notifications are sent to devices registered in the **personal-site-inbox** app (`fcmTokens` collection in the same Firebase project). Without Admin credentials the contact form still works; push is skipped.

## License

Private project. All rights reserved.
