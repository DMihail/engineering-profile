import { MAIN_CONTENT_ID } from "@/lib/section-ids";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/layout/skip-link.module.css";

/** First focusable control — jumps past chrome to `#main-content`. */
export function SkipLink() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipLink}>
      {UI_LABELS.a11y.skipToContent}
    </a>
  );
}
