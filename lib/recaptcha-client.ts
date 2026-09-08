let loadPromise: Promise<void> | null = null;

function ensureRecaptchaPreconnect(): void {
  if (typeof document === "undefined") return;
  const origins = [
    "https://www.google.com",
    "https://www.gstatic.com",
  ] as const;
  for (const href of origins) {
    if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }
}

/** Loads reCAPTCHA v3 script once — call on form focus, not on page load. */
export function ensureRecaptchaLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    return Promise.reject(new Error("reCAPTCHA is not configured"));
  }

  if (loadPromise) return loadPromise;

  ensureRecaptchaPreconnect();

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="google.com/recaptcha/api.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load reCAPTCHA")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
