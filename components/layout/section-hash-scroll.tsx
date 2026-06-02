"use client";

import { useLayoutEffect } from "react";
import { isPageSectionId } from "@/lib/section-ids";
import {
  getSectionIdFromHash,
  scrollToSectionWhenReady,
} from "@/lib/section-navigation";

/** Scrolls to the current hash once layout is stable (e.g. after /privacy → /#contact). */
export function SectionHashScroll() {
  useLayoutEffect(() => {
    let resizeTimer = 0;

    const sync = () => {
      const hashId = getSectionIdFromHash();
      if (!hashId || !isPageSectionId(hashId)) return;
      void scrollToSectionWhenReady(hashId, { behavior: "auto" });
    };

    const onResize = () => {
      if (!getSectionIdFromHash()) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(sync, 150);
    };

    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("pageshow", sync);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("pageshow", sync);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
