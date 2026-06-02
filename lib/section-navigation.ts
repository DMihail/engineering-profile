import { HERO_ID } from "@/lib/section-ids";

const ALIGN_TOLERANCE_PX = 12;

export function getSectionIdFromHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return hash || null;
}

/** Offset from viewport top where sections align (nav + scroll-padding + safe area). */
function getSectionScrollAnchor(): number {
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

export function unlockPageScroll(): void {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
}

export function getSectionScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function getMaxScrollY(): number {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function isNearPageBottom(): boolean {
  const scrollRange = getMaxScrollY();
  if (scrollRange <= 24) return false;
  return window.scrollY >= scrollRange - 24;
}

function revealAllSections(): void {
  document.querySelectorAll(".section-cv-auto").forEach((node) => {
    (node as HTMLElement).style.contentVisibility = "visible";
  });
}

function isSectionAligned(id: string, anchor: number): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const { top, bottom } = el.getBoundingClientRect();
  if (Math.abs(top - anchor) <= ALIGN_TOLERANCE_PX) return true;

  if (isNearPageBottom()) {
    return top <= anchor + ALIGN_TOLERANCE_PX && bottom > anchor;
  }

  return false;
}

function scrollToSection(id: string, behavior: ScrollBehavior = "auto"): void {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });

  const maxScrollY = getMaxScrollY();
  if (window.scrollY > maxScrollY) {
    window.scrollTo({ top: maxScrollY, behavior });
  }
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

export function scrollToSectionWhenReady(
  id: string,
  options: { behavior?: ScrollBehavior; maxAttempts?: number } = {},
): Promise<boolean> {
  const { behavior = "auto", maxAttempts = 60 } = options;

  return new Promise((resolve) => {
    let attempts = 0;
    let lastHeight = 0;
    let stableFrames = 0;

    revealAllSections();

    const tick = () => {
      const anchor = getSectionScrollAnchor();
      const el = document.getElementById(id);
      const height = document.documentElement.scrollHeight;

      if (height === lastHeight) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastHeight = height;
      }

      if (!el) {
        attempts += 1;
        if (attempts >= maxAttempts) {
          resolve(false);
          return;
        }
        requestAnimationFrame(tick);
        return;
      }

      if (stableFrames >= 2) {
        scrollToSection(id, behavior);

        if (isSectionAligned(id, anchor)) {
          resolve(true);
          return;
        }
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        scrollToSection(id, behavior);
        resolve(true);
        return;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

export function navigateToSection(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    window.history.pushState(null, "", `/#${id}`);
  }

  unlockPageScroll();
  return scrollToSectionWhenReady(id, { behavior: getSectionScrollBehavior() });
}
