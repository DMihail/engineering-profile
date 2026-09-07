/** Global typing for Google reCAPTCHA v3 (loaded at runtime on the contact form). */

export {};

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
