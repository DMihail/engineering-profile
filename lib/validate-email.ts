const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.de", "tempmail.com",
  "throwaway.email", "temp-mail.org", "fakeinbox.com", "sharklasers.com",
  "guerrillamailblock.com", "grr.la", "dispostable.com", "yopmail.com",
  "trashmail.com", "trashmail.me", "trashmail.net", "mailnesia.com",
  "maildrop.cc", "discard.email", "mailcatch.com", "tempail.com",
  "tempr.email", "10minutemail.com", "minutemail.com", "emailondeck.com",
  "mohmal.com", "burnermail.io", "inboxkitten.com", "getnada.com",
  "mailsac.com", "harakirimail.com", "tmail.ws", "temp-mail.io",
  "crazymailing.com", "mailtemp.net", "tmpmail.net", "tmpmail.org",
  "bupmail.com", "classicmail.co", "flurred.com", "jetable.org",
  "mytemp.email", "throwam.com", "trashmail.org", "20minutemail.com",
]);

export function validateEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Please enter a valid email address";
  }

  const domain = trimmed.split("@")[1];

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return "Disposable email addresses are not accepted. Please use a real email.";
  }

  const parts = domain.split(".");
  const tld = parts[parts.length - 1];
  if (tld.length < 2 || /^\d+$/.test(tld)) {
    return "Please enter a valid email address";
  }

  if (domain.length < 4) {
    return "Please enter a valid email address";
  }

  return null;
}
