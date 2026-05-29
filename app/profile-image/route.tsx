import { ImageResponse } from "next/og";
import { SITE_AUTHOR, SITE_ROLE } from "@/lib/config";

export const runtime = "edge";

export async function GET() {
  const initials = SITE_AUTHOR.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0F17",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(145deg, #111827 0%, #0B0F17 100%)",
            border: "4px solid #38BDF8",
            fontSize: 96,
            fontWeight: 800,
            color: "#38BDF8",
            letterSpacing: "-0.04em",
          }}
        >
          {initials}
        </div>
        <p
          style={{
            marginTop: 28,
            fontSize: 28,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_AUTHOR}
        </p>
        <p
          style={{
            marginTop: 8,
            fontSize: 18,
            color: "#94A3B8",
            maxWidth: 420,
            textAlign: "center",
          }}
        >
          {SITE_ROLE}
        </p>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
