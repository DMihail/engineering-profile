import { ImageResponse } from "next/og";
import { SITE_AUTHOR } from "@/lib/config";
import { RESUME_OG, RESUME_ROLE } from "@/lib/content/career/resume-meta";
import { OG_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og/constants";
import { OgShell, OgStatusBadge, OgTechTags } from "@/lib/og/primitives";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `Resume — ${SITE_AUTHOR} · ${RESUME_ROLE}`;

export default function ResumeOgImage() {
  return new ImageResponse(
    (
      <OgShell>
        <OgStatusBadge label={RESUME_OG.badge} />

        <div
          style={{
            fontSize: "0.875rem",
            color: "#9CA3AF",
            fontFamily: "monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Resume
        </div>

        <div
          style={{
            fontSize: "3.25rem",
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
            fontSize: "1.375rem",
            fontWeight: 600,
            color: "#38BDF8",
            letterSpacing: "-0.01em",
            marginBottom: 28,
            maxWidth: "920px",
          }}
        >
          {RESUME_ROLE}
        </div>

        <div
          style={{
            fontSize: "1rem",
            color: "#A8B2C0",
            lineHeight: 1.5,
            marginBottom: 32,
            maxWidth: "880px",
          }}
        >
          ATS-friendly resume · Print or save as PDF · Dublin, Ireland
        </div>

        <OgTechTags tags={RESUME_OG.highlights} />
      </OgShell>
    ),
    { ...size },
  );
}
