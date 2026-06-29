"use client";

import type { MouseEvent } from "react";
import { UI_LABELS } from "@/lib/content/ui-labels";
import { focusMainContent, isModifiedNavigation } from "@/lib/focus-main-content";
import { MAIN_CONTENT_ID, sectionHref } from "@/lib/section-ids";

interface SkipLinkProps {
  /** Defaults to in-page `#main-content`; use on the homepage for `/#main-content`. */
  targetId?: string;
  home?: boolean;
}

export function SkipLink({ targetId = MAIN_CONTENT_ID, home = false }: SkipLinkProps) {
  const href = home ? sectionHref(targetId) : `#${targetId}`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isModifiedNavigation(event)) return;
    event.preventDefault();
    focusMainContent(targetId);
  }

  return (
    <a href={href} className="skip-link" onClick={handleClick}>
      {UI_LABELS.skipToContent}
    </a>
  );
}
