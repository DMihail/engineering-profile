import { randomBytes } from "node:crypto";
import { SCROLL_HASH_BOOTSTRAP_CSP_HASH } from "./scroll-hash-bootstrap";

type Header = { key: string; value: string };

export const CSP_NONCE_HEADER = "x-nonce";

function isProductionEnv(): boolean {
  return process.env.NODE_ENV === "production";
}

export function createCspNonce(): string {
  return randomBytes(16).toString("base64");
}

/** CSP tuned for Next.js, self-hosted fonts, and lazy-loaded reCAPTCHA v3. */
export function buildContentSecurityPolicy(nonce?: string): string {
  const isProd = isProductionEnv();

  const scriptSrc =
    isProd && nonce
      ? [
          "'self'",
          `'nonce-${nonce}'`,
          `'${SCROLL_HASH_BOOTSTRAP_CSP_HASH}'`,
          "'strict-dynamic'",
          "https://www.google.com",
          "https://www.gstatic.com",
        ]
      : [
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

export function getSecurityHeaders(options?: { nonce?: string }): Header[] {
  const headers: Header[] = [
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

  const includeCsp = Boolean(options?.nonce) || !isProductionEnv();
  if (includeCsp) {
    headers.unshift({
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy(options?.nonce),
    });
  }

  if (isProductionEnv()) {
    headers.push({
      key: "Strict-Transport-Security",
      value: HSTS_HEADER_VALUE,
    });
  }

  return headers;
}

export function applySecurityHeaders(response: Response, nonce?: string): void {
  for (const { key, value } of getSecurityHeaders({ nonce })) {
    response.headers.set(key, value);
  }
}
