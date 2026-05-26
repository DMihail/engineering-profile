import type { MetadataRoute } from "next";
import { SITE_AUTHOR, SITE_SHORT_DESCRIPTION } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_AUTHOR} — Portfolio`,
    short_name: "MD Portfolio",
    description: SITE_SHORT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F17",
    theme_color: "#0B0F17",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
    ],
  };
}
