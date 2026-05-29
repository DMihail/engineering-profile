import {
  buildContentSecurityPolicy,
  createCspNonce,
  getSecurityHeaders,
  HSTS_HEADER_VALUE,
} from "@/lib/security-headers";
import { withNodeEnv } from "./helpers/with-node-env";

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

  it("uses nonce and strict-dynamic in production script-src instead of unsafe-inline", () => {
    withNodeEnv("production", () => {
      const nonce = createCspNonce();
      const csp = buildContentSecurityPolicy(nonce);
      const scriptSrc = csp.split(";").find((part) => part.trim().startsWith("script-src")) ?? "";
      expect(scriptSrc).toContain(`'nonce-${nonce}'`);
      expect(scriptSrc).toContain("'strict-dynamic'");
      expect(scriptSrc).not.toContain("'unsafe-inline'");
      expect(csp).toContain("style-src 'self' 'unsafe-inline'");
    });
  });

  it("omits CSP from static headers in production without a nonce", () => {
    withNodeEnv("production", () => {
      const keys = getSecurityHeaders().map((header) => header.key);
      expect(keys).not.toContain("Content-Security-Policy");
    });
  });

  it("includes CSP in production when nonce is provided", () => {
    withNodeEnv("production", () => {
      const nonce = createCspNonce();
      const cspHeader = getSecurityHeaders({ nonce }).find((header) => header.key === "Content-Security-Policy");
      expect(cspHeader?.value).toContain(`'nonce-${nonce}'`);
    });
  });

  it("sets clickjacking protection headers", () => {
    const keys = getSecurityHeaders().map((header) => header.key);
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
    withNodeEnv("development", () => {
      expect(buildContentSecurityPolicy()).toContain("'unsafe-inline'");
      expect(buildContentSecurityPolicy()).toContain("'unsafe-eval'");
    });
  });

  it("omits unsafe-eval in production CSP", () => {
    withNodeEnv("production", () => {
      expect(buildContentSecurityPolicy(createCspNonce())).not.toContain("'unsafe-eval'");
    });
  });

  it("omits Trusted Types in production CSP for Next.js chunk loading", () => {
    withNodeEnv("production", () => {
      const csp = buildContentSecurityPolicy(createCspNonce());
      expect(csp).not.toContain("trusted-types");
      expect(csp).not.toContain("require-trusted-types-for");
    });
  });

  it("sets baseline hardening headers", () => {
    const keys = getSecurityHeaders().map((header) => header.key);
    expect(keys).toContain("X-Content-Type-Options");
    expect(keys).toContain("Referrer-Policy");
    expect(keys).toContain("Cross-Origin-Opener-Policy");
    expect(keys).toContain("Cross-Origin-Resource-Policy");
  });

  it("includes HSTS with includeSubDomains and preload in production", () => {
    withNodeEnv("production", () => {
      const hsts = getSecurityHeaders().find((header) => header.key === "Strict-Transport-Security");
      expect(hsts?.value).toBe(HSTS_HEADER_VALUE);
      expect(hsts?.value).toContain("includeSubDomains");
      expect(hsts?.value).toContain("preload");
    });
  });

  it("omits HSTS outside production", () => {
    withNodeEnv("development", () => {
      const keys = getSecurityHeaders().map((header) => header.key);
      expect(keys).not.toContain("Strict-Transport-Security");
    });
  });
});
