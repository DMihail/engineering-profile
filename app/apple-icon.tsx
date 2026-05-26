import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0F17",
          borderRadius: 40,
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M 50,16 A 40,40 0 1 1 11,46 C 13,38 14,17 14,16 C 14,17 25,57 34,64 C 38,68 50,29 50,16"
            stroke="#38BDF8"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1="50" y1="16"
            x2="50" y2="96"
            stroke="#38BDF8"
            strokeWidth={6}
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
