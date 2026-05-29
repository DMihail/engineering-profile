import { HERO_ID } from "@/lib/section-ids";

export function getSectionIdFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return hash || null;
}

/** Offset from viewport top where the active section is measured (nav + scroll-padding). */
export function getSectionScrollAnchor(): number {
  if (typeof window === "undefined") return 0;

  const styles = getComputedStyle(document.documentElement);
  const scrollPadding = parseFloat(styles.scrollPaddingTop);
  if (Number.isFinite(scrollPadding) && scrollPadding > 0) {
    return scrollPadding + 8;
  }

  const navHeight = parseFloat(styles.getPropertyValue("--nav-h"));
  const safeArea = parseFloat(styles.getPropertyValue("env(safe-area-inset-top)")) || 0;
  return (Number.isFinite(navHeight) ? navHeight : 56) + safeArea + 8;
}

function isNearPageBottom(): boolean {
  const docEl = document.documentElement;
  const scrollRange = docEl.scrollHeight - window.innerHeight;
  if (scrollRange <= 24) return false;
  return window.scrollY + window.innerHeight >= docEl.scrollHeight - 24;
}

/**
 * Last section whose top has crossed the scroll anchor — stable for long pages and #hash links.
 */
export function getActiveSectionFromScroll(
  sectionIds: readonly string[],
  anchor = getSectionScrollAnchor(),
): string {
  if (typeof window !== "undefined" && isNearPageBottom()) {
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      if (!id) continue;

      const el = document.getElementById(id);
      if (!el) continue;

      const { top, bottom } = el.getBoundingClientRect();
      if (bottom > 0 && top < window.innerHeight) {
        return id;
      }
    }
  }

  let active = sectionIds[0] ?? HERO_ID;

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;

    if (el.getBoundingClientRect().top <= anchor) {
      active = id;
      continue;
    }

    break;
  }

  return active;
}

export function scrollToSection(id: string, behavior: ScrollBehavior = "auto"): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: "start" });
}

export function scrollToSectionWhenReady(
  id: string,
  options: { behavior?: ScrollBehavior; maxAttempts?: number } = {},
): Promise<boolean> {
  const { behavior = "auto", maxAttempts = 32 } = options;

  return new Promise((resolve) => {
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollToSection(id, behavior);
        resolve(true);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        resolve(false);
        return;
      }

      requestAnimationFrame(tryScroll);
    };

    tryScroll();
  });
}
