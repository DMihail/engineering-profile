"use client";

import Link from "next/link";
import { Printer } from "lucide-react";
import { resumePath, type ResumeVariant } from "@/lib/resume-content";
import styles from "@/styles/resume.module.css";

interface ResumeToolbarProps {
  variant: ResumeVariant;
}

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
        <button type="button" className={styles.toolbarButtonPrimary} onClick={() => window.print()}>
          <Printer size={14} aria-hidden />
          Print / Save PDF
        </button>
      </div>
    </nav>
  );
}
