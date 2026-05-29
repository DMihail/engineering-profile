import { buildContentSecurityPolicy, getSecurityHeaders, HSTS_HEADER_VALUE } from "@/lib/security-headers";

describe("security headers", () => {
  it("includes CSP with frame-ancestors and form-action", () => {
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
  });

  it("allows reCAPTCHA script and frame sources", () => {
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("https://www.google.com");
    expect(csp).toContain("https://www.recaptcha.google.com");
  });

  it("sets clickjacking protection headers", () => {
    const keys = getSecurityHeaders().map((header) => header.key);
    expect(keys).toContain("Content-Security-Policy");
    expect(keys).toContain("X-Frame-Options");

    const xfo = getSecurityHeaders().find((header) => header.key === "X-Frame-Options");
    expect(xfo?.value).toBe("SAMEORIGIN");
  });

  it("uses recommended referrer policy", () => {
    const referrer = getSecurityHeaders().find((header) => header.key === "Referrer-Policy");
    expect(referrer?.value).toBe("strict-origin-when-cross-origin");
    expect(referrer?.value).not.toBe("origin-when-cross-origin");
  });

  it("allows unsafe-eval in non-production for React dev tooling", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    expect(buildContentSecurityPolicy()).toContain("'unsafe-eval'");
    process.env.NODE_ENV = prev;
  });

  it("omits unsafe-eval in production CSP", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    expect(buildContentSecurityPolicy()).not.toContain("'unsafe-eval'");
    process.env.NODE_ENV = prev;
  });

  it("adds Trusted Types directives in production CSP", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("trusted-types default");
    expect(csp).toContain("require-trusted-types-for 'script'");
    process.env.NODE_ENV = prev;
  });

  it("sets baseline hardening headers", () => {
    const keys = getSecurityHeaders().map((header) => header.key);
    expect(keys).toContain("X-Content-Type-Options");
    expect(keys).toContain("Referrer-Policy");
    expect(keys).toContain("Cross-Origin-Opener-Policy");
    expect(keys).toContain("Cross-Origin-Resource-Policy");
  });

  it("includes HSTS with includeSubDomains and preload in production", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const hsts = getSecurityHeaders().find((header) => header.key === "Strict-Transport-Security");
    expect(hsts?.value).toBe(HSTS_HEADER_VALUE);
    expect(hsts?.value).toContain("includeSubDomains");
    expect(hsts?.value).toContain("preload");
    process.env.NODE_ENV = prev;
  });

  it("omits HSTS outside production", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    const keys = getSecurityHeaders().map((header) => header.key);
    expect(keys).not.toContain("Strict-Transport-Security");
    process.env.NODE_ENV = prev;
  });
});
