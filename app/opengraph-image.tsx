import { ImageResponse } from "next/og";
import { SITE_AUTHOR, SITE_OG, SITE_ROLE } from "@/lib/config";
import { OG_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og/constants";
import { OgShell, OgStatusBadge, OgTechTags } from "@/lib/og/primitives";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${SITE_AUTHOR} — ${SITE_ROLE}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <OgShell>
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "#4B5563",
            letterSpacing: "0.05em",
          }}
        >
          <span>SYS</span>
          <span style={{ color: "#22C55E" }}>●</span>
          <span>ONLINE</span>
          <span style={{ margin: "0 8px", color: "#374151" }}>|</span>
          <span>{SITE_OG.regionLine}</span>
        </div>

        <OgStatusBadge label={SITE_OG.statusBadge} />

        <div
          style={{
            fontSize: "3.5rem",
            fontWeight: 800,
            color: "#E5E7EB",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          {SITE_AUTHOR}
        </div>

        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#38BDF8",
            letterSpacing: "-0.01em",
            marginBottom: 32,
          }}
        >
          {SITE_ROLE}
        </div>

        <OgTechTags tags={SITE_OG.techTags} />
      </OgShell>
    ),
    { ...size },
  );
}
