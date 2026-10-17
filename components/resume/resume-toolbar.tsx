import Link from "next/link";
import { resumePath, type ResumeVariant } from "@/lib/resume-content";
import { PrintResumeButton } from "@/components/resume/print-resume-button";
import styles from "@/styles/resume/resume-toolbar.module.css";

interface ResumeToolbarProps {
  variant: ResumeVariant;
}

/** Server toolbar — variant links stay in the RSC payload; print is a client island. */
export function ResumeToolbar({ variant }: ResumeToolbarProps) {
  return (
    <nav className={styles.toolbar} aria-label="Resume actions">
      <div className={styles.toolbarGroup}>
        <Link
          href={resumePath("ireland")}
          className={variant === "ireland" ? styles.toolbarLinkActive : styles.toolbarLink}
          aria-current={variant === "ireland" ? "page" : undefined}
        >
          Europe
        </Link>
        <Link
          href={resumePath("ua")}
          className={variant === "ua" ? styles.toolbarLinkActive : styles.toolbarLink}
          aria-current={variant === "ua" ? "page" : undefined}
        >
          Ukraine
        </Link>
        <Link href="/" className={styles.toolbarLink}>
          Portfolio
        </Link>
      </div>

      <div className={styles.toolbarGroup}>
        <p className={styles.toolbarHint}>Use Print → Save as PDF for ATS upload</p>
        <PrintResumeButton />
      </div>
    </nav>
  );
}
