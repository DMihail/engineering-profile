import { UI_LABELS } from "@/lib/content/ui-labels";
import { MAIN_CONTENT_ID, sectionHref } from "@/lib/section-ids";

interface SkipLinkProps {
  /** Defaults to in-page `#main-content`; use on the homepage for `/#main-content`. */
  targetId?: string;
  home?: boolean;
}

export function SkipLink({ targetId = MAIN_CONTENT_ID, home = false }: SkipLinkProps) {
  const href = home ? sectionHref(targetId) : `#${targetId}`;

  return (
    <a href={href} className="skip-link">
      {UI_LABELS.skipToContent}
    </a>
  );
}
