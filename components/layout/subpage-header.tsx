import Link from "next/link";
import { MDLogo } from "@/components/ui/icons";
import { UI_LABELS } from "@/lib/content/ui-labels";
import styles from "@/styles/layout/subpage-header.module.css";

export function SubpageHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label={UI_LABELS.subpage.backToPortfolio}>
        <MDLogo size={20} aria-hidden />
        <span className={styles.brandText}>{UI_LABELS.nav.portfolio}</span>
      </Link>
      <Link href="/" className={styles.backLink}>
        {UI_LABELS.subpage.backToPortfolio}
      </Link>
    </header>
  );
}
