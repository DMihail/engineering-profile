"use client";

import { useLayoutEffect, useEffectEvent } from "react";
import { isHomeScrollTargetId } from "@/lib/section-ids";
import {
  getSectionIdFromHash,
  scrollToSectionWhenReady,
} from "@/lib/section-navigation";

/** Scrolls to the current hash once layout is stable (e.g. after /privacy → /#contact). */
export function SectionHashScroll() {
  const sync = useEffectEvent(() => {
    const hashId = getSectionIdFromHash();
    if (!hashId || !isHomeScrollTargetId(hashId)) return;
    void scrollToSectionWhenReady(hashId, { behavior: "auto" });
  });

  useLayoutEffect(() => {
    let resizeTimer = 0;

    const onResize = () => {
      if (!getSectionIdFromHash()) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => sync(), 150);
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
