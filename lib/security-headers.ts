type Header = { key: string; value: string };

function isProductionEnv(): boolean {
  return process.env.NODE_ENV === "production";
}

/** CSP tuned for Next.js, self-hosted fonts, and lazy-loaded reCAPTCHA v3. */
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
    directives.push("trusted-types default");
    directives.push("require-trusted-types-for 'script'");
  }

  return directives.join("; ");
}

export const HSTS_HEADER_VALUE = "max-age=63072000; includeSubDomains; preload";

/** Security headers applied on every HTML/API response (enforcement, not report-only). */
export function getSecurityHeaders(): Header[] {
  const headers: Header[] = [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
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

/** @deprecated Use getSecurityHeaders() so production-only headers resolve at call time. */
export const SECURITY_HEADERS = getSecurityHeaders();
