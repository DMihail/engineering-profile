type Header = { key: string; value: string };

function isProductionEnv(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * CSP for Next.js Cache Components + prerendered HTML.
 *
 * Per-request nonces + `strict-dynamic` are incompatible here: Vercel serves cached
 * HTML (`x-nextjs-prerender`) whose script `nonce` attributes were fixed at render
 * time, while a fresh response nonce would not match. Browsers then block `/_next`
 * chunks, Next inline flight/form scripts, and reCAPTCHA.
 *
 * With no nonce/hash in `script-src`, `'unsafe-inline'` stays effective for Next
 * inline scripts; `'self'` covers framework chunks; Google hosts cover reCAPTCHA.
 */
export function buildContentSecurityPolicy(): string {
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

/**
 * Shared hardening headers for `next.config` (static) and `proxy.ts` (HTML/API).
 * Same source keeps CSP/COOP/CORP in sync across both application points.
 */
export function getSecurityHeaders(): Header[] {
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

export function applySecurityHeaders(response: Response): void {
  for (const { key, value } of getSecurityHeaders()) {
    response.headers.set(key, value);
  }
}
