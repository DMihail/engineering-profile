const CV_UA = { file: "/Mykhailo_Dzhezhelo_CV_UK.pdf", label: "Resume (UA)" };
const CV_INTL = { file: "/Mykhailo_Dzhezhelo_CV_Ireland.pdf", label: "Resume" };

export type CvLink = typeof CV_INTL;

export function getClientCvLink(): CvLink {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language?.toLowerCase() ?? "";
    if (tz === "Europe/Kyiv" || tz === "Europe/Kiev" || lang.startsWith("uk")) return CV_UA;
  } catch {
    /* fallback */
  }
  return CV_INTL;
}

export function getServerCvLink(): CvLink {
  return CV_INTL;
}
