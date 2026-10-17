"use client";

import { Printer } from "lucide-react";
import styles from "@/styles/resume/resume-toolbar.module.css";

/** Tiny client island — only `window.print()` needs the browser. */
export function PrintResumeButton() {
  return (
    <button type="button" className={styles.toolbarButtonPrimary} onClick={() => window.print()}>
      <Printer size={14} aria-hidden />
      Print / Save PDF
    </button>
  );
}
