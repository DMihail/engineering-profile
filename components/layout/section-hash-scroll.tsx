"use client";

import { useLayoutEffect } from "react";
import { isPageSectionId } from "@/lib/section-ids";
import {
  getSectionIdFromHash,
  scrollToSectionWhenReady,
} from "@/lib/section-navigation";

/** Scrolls to the current hash once home sections exist in the DOM (e.g. after /privacy → /#contact). */
export function SectionHashScroll() {
  useLayoutEffect(() => {
    const sync = () => {
      const hashId = getSectionIdFromHash();
      if (!hashId || !isPageSectionId(hashId)) return;
      void scrollToSectionWhenReady(hashId, { behavior: "auto" });
    };

    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("pageshow", sync);

    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, []);

  return null;
}
