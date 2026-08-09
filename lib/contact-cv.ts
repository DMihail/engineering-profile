import { cvDownloadForRegion, type CvDownload } from "@/lib/content/cv";
import { getContactRegionFromClient } from "@/lib/contact-region";

export type CvLink = CvDownload;

/** Same region signal as phone (cookie → timezone/lang fallback). */
export function getClientCvLink(): CvLink {
  return cvDownloadForRegion(getContactRegionFromClient());
}

export function getServerCvLink(): CvLink {
  return cvDownloadForRegion("intl");
}
