"use client";

import { useEffect, useEffectEvent, useRef, useState, startTransition } from "react";
import {
  getActiveSectionFromScroll,
  getSectionIdFromHash,
} from "@/lib/section-navigation";
import {
  HERO_ID,
  PAGE_SECTION_IDS,
  isPageSectionId,
} from "@/lib/section-ids";

/** Fallback when `scrollend` is unavailable (Safari < 17.4, etc.). */
export const SCROLL_LOCK_MS = 2000;
export const HASH_SCROLL_LOCK_MS = 3500;

/**
 * Tracks the in-view page section for nav highlighting.
 * Always SSR/hydrate with HERO_ID, then sync hash/scroll after mount
 * to avoid hydration mismatches on deep links like `/#contact`.
 *
 * After programmatic navigation, scroll updates stay locked until
 * `scrollend` (with a time-based fallback).
 */
export function useActiveSection() {
  const lockUntilRef = useRef(0);
  const [active, setActive] = useState(HERO_ID);

  const clearScrollLock = useEffectEvent(() => {
    lockUntilRef.current = 0;
  });

  const lockActiveSection = (id: string, duration = SCROLL_LOCK_MS) => {
    startTransition(() => {
      setActive(id);
    });
    lockUntilRef.current = Date.now() + duration;
  };

  const onHashChange = useEffectEvent(() => {
    const hashId = getSectionIdFromHash();
    if (!hashId || !isPageSectionId(hashId)) return;
    lockActiveSection(hashId, HASH_SCROLL_LOCK_MS);
  });

  const onScrollEnd = useEffectEvent(() => {
    if (lockUntilRef.current === 0) return;
    clearScrollLock();
    startTransition(() => {
      setActive(getActiveSectionFromScroll(PAGE_SECTION_IDS));
    });
  });

  useEffect(() => {
    let ticking = false;
    let frame = 0;

    const updateActiveFromScroll = () => {
      if (Date.now() < lockUntilRef.current) return;
      startTransition(() => {
        setActive(getActiveSectionFromScroll(PAGE_SECTION_IDS));
      });
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    // Defer past hydration so the first client paint matches SSR (hero).
    frame = requestAnimationFrame(() => {
      const hashId = getSectionIdFromHash();
      if (hashId && isPageSectionId(hashId)) {
        lockActiveSection(hashId, HASH_SCROLL_LOCK_MS);
      } else {
        updateActiveFromScroll();
      }
    });

    const supportsScrollEnd = "onscrollend" in window;
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onHashChange);
    if (supportsScrollEnd) {
      window.addEventListener("scrollend", onScrollEnd, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onHashChange);
      if (supportsScrollEnd) {
        window.removeEventListener("scrollend", onScrollEnd);
      }
    };
  }, []);

  return { active, lockActiveSection } as const;
}
