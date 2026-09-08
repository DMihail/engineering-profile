import type { ContactRegion } from "@/lib/contact-region";

/**
 * Downloadable PDF resumes for ATS / applications.
 *
 * **Source of truth:** HTML `/resume` (and `/resume?variant=ua`), generated from
 * `lib/content/career/*`. After content changes, re-export PDFs via the resume
 * page (Print → Save as PDF) and refresh `CV_PDF_EXPORTED_AT`.
 *
 * Note: `ua` file keeps the historical `*_CV_UK.pdf` filename (outbound links).
 */
export const CV_DOWNLOADS = {
  intl: {
    region: "intl" as const satisfies ContactRegion,
    file: "/Mykhailo_Dzhezhelo_CV_Ireland.pdf",
    label: "Resume",
  },
  ua: {
    region: "ua" as const satisfies ContactRegion,
    file: "/Mykhailo_Dzhezhelo_CV_UK.pdf",
    label: "Resume (UA)",
  },
} as const;

/**
 * Last manual PDF export date (ISO). Bump when regenerating files in `public/`.
 * Used for docs / drift awareness — HTML `/resume` is always newer for web.
 */
export const CV_PDF_EXPORTED_AT = "2026-06-08";

export type CvDownload = (typeof CV_DOWNLOADS)[keyof typeof CV_DOWNLOADS];

/** All PDF paths (proxy allowlist, public assets). */
export const CV_FILES = [CV_DOWNLOADS.intl.file, CV_DOWNLOADS.ua.file] as const;

/** Canonical HTML resume (indexed Ireland variant). */
export const RESUME_HREF = "/resume";

export function cvDownloadForRegion(region: ContactRegion): CvDownload {
  return region === "ua" ? CV_DOWNLOADS.ua : CV_DOWNLOADS.intl;
}
