"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  getActiveSectionFromScroll,
  getSectionIdFromHash,
} from "@/lib/section-navigation";
import {
  HERO_ID,
  PAGE_SECTION_IDS,
  isPageSectionId,
} from "@/lib/section-ids";

export const SCROLL_LOCK_MS = 2000;
export const HASH_SCROLL_LOCK_MS = 3500;

/**
 * Tracks the in-view page section for nav highlighting.
 * Always SSR/hydrate with HERO_ID, then sync hash/scroll after mount
 * to avoid hydration mismatches on deep links like `/#contact`.
 */
export function useActiveSection() {
  const lockUntilRef = useRef(0);
  const [active, setActive] = useState(HERO_ID);

  const lockActiveSection = (id: string, duration = SCROLL_LOCK_MS) => {
    setActive(id);
    lockUntilRef.current = Date.now() + duration;
  };

  const onHashChange = useEffectEvent(() => {
    const hashId = getSectionIdFromHash();
    if (!hashId || !isPageSectionId(hashId)) return;
    lockActiveSection(hashId, HASH_SCROLL_LOCK_MS);
  });

  useEffect(() => {
    let ticking = false;
    let frame = 0;

    const updateActiveFromScroll = () => {
      if (Date.now() < lockUntilRef.current) return;
      setActive(getActiveSectionFromScroll(PAGE_SECTION_IDS));
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

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pageshow", onHashChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pageshow", onHashChange);
    };
  }, []);

  return { active, lockActiveSection } as const;
}
