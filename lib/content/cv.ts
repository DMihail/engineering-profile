import type { ContactRegion } from "@/lib/contact-region";

/**
 * Downloadable PDF resumes for ATS / applications.
 * Canonical web resume is HTML `/resume` (see sitemap — PDFs are not indexed).
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

export type CvDownload = (typeof CV_DOWNLOADS)[keyof typeof CV_DOWNLOADS];

/** All PDF paths (proxy allowlist, public assets). */
export const CV_FILES = [CV_DOWNLOADS.intl.file, CV_DOWNLOADS.ua.file] as const;

export function cvDownloadForRegion(region: ContactRegion): CvDownload {
  return region === "ua" ? CV_DOWNLOADS.ua : CV_DOWNLOADS.intl;
}
