import { randomBytes } from "node:crypto";

type Header = { key: string; value: string };

/** @deprecated Unused with Cache Components — prerendered HTML cannot match per-request nonces. */
export const CSP_NONCE_HEADER = "x-nonce";

function isProductionEnv(): boolean {
  return process.env.NODE_ENV === "production";
}

/** @deprecated Prefer hash/'self' policies; kept for tests and any legacy callers. */
export function createCspNonce(): string {
  return randomBytes(16).toString("base64");
}

/**
 * CSP for Next.js Cache Components + prerendered HTML.
 *
 * Per-request nonces + `strict-dynamic` are incompatible here: Vercel serves cached
 * HTML (`x-nextjs-prerender`) whose script `nonce` attributes were fixed at render
 * time, while proxy would mint a new nonce each request. Browsers then block
 * `/_next` chunks, Next's inline flight/form scripts, and reCAPTCHA.
 *
 * With no nonce/hash in `script-src`, `'unsafe-inline'` stays effective for Next
 * inline scripts; `'self'` covers framework chunks; Google hosts cover reCAPTCHA.
 *
 * `@param _nonce` ignored (API compat).
 */
export function buildContentSecurityPolicy(_nonce?: string): string {
  const isProd = isProductionEnv();

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isProd ? [] : ["'unsafe-eval'"]),
    "https://www.google.com",
    "https://www.gstatic.com",
  ];

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    "connect-src 'self' https://www.google.com https://www.grecaptcha.net",
    "frame-src https://www.google.com https://www.recaptcha.google.com https://recaptcha.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "manifest-src 'self'",
  ];

  if (isProd) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

export const HSTS_HEADER_VALUE = "max-age=63072000; includeSubDomains; preload";

export function getSecurityHeaders(_options?: { nonce?: string }): Header[] {
  const headers: Header[] = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(),
    },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=(), interest-cohort=()" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
    { key: "Origin-Agent-Cluster", value: "?1" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  ];

  if (isProductionEnv()) {
    headers.push({
      key: "Strict-Transport-Security",
      value: HSTS_HEADER_VALUE,
    });
  }

  return headers;
}

export function applySecurityHeaders(response: Response, _nonce?: string): void {
  for (const { key, value } of getSecurityHeaders()) {
    response.headers.set(key, value);
  }
}
