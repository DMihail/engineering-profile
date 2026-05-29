/**
 * @jest-environment jsdom
 */
import { ensureRecaptchaLoaded } from "@/lib/recaptcha-client";

describe("ensureRecaptchaLoaded", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "test-site-key";
    document.querySelectorAll('script[src*="recaptcha"]').forEach((el) => el.remove());
    // @ts-expect-error test cleanup
    delete window.grecaptcha;
  });

  it("resolves immediately when grecaptcha is already present", async () => {
    window.grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: jest.fn(),
    };
    await expect(ensureRecaptchaLoaded()).resolves.toBeUndefined();
  });

  it("injects script when grecaptcha is missing", async () => {
    const promise = ensureRecaptchaLoaded();
    const script = document.querySelector('script[src*="recaptcha/api.js"]');
    expect(script).not.toBeNull();
    script?.dispatchEvent(new Event("load"));
    await expect(promise).resolves.toBeUndefined();
  });

  it("rejects when site key is missing", async () => {
    delete process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    await expect(ensureRecaptchaLoaded()).rejects.toThrow(/not configured/i);
  });
});
