export type ContactRegion = "ua" | "intl";

export const CONTACT_REGION_COOKIE = "contact-region";

export const PHONE_UA = {
  e164: "+380951266683",
  display: "+380 95 126 66 83",
} as const;

export const PHONE_INTL = {
  e164: "+353857842470",
  display: "+353 85 784 2470",
} as const;

export const TELEGRAM = {
  username: "DzMikhail",
  href: "https://t.me/DzMikhail",
  hint: "@DzMikhail",
} as const;

export function phoneForRegion(region: ContactRegion) {
  return region === "ua" ? PHONE_UA : PHONE_INTL;
}

/** Client-only: cookie from middleware, then timezone / language fallback. */
export function getContactRegionFromClient(): ContactRegion {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${CONTACT_REGION_COOKIE}=(ua|intl)(?:;|$)`),
    );
    if (match?.[1] === "ua" || match?.[1] === "intl") {
      return match[1];
    }
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language?.toLowerCase() ?? "";
    if (tz === "Europe/Kyiv" || tz === "Europe/Kiev" || lang.startsWith("uk")) {
      return "ua";
    }
  } catch {
    /* ignore */
  }

  return "intl";
}

export function getServerContactRegion(): ContactRegion {
  return "intl";
}
