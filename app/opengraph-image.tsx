import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TravelMind — Agentic AI Travel Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #06080d 0%, #0a0e16 50%, #11151f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Aurora glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,179,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            color: "#94a3b8",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          AI TRAVEL INTELLIGENCE · LIVE AGENT
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#f8fafc",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
            marginTop: 60,
            display: "flex",
          }}
        >
          Travel research,
        </div>
        <div
          style={{
            color: "#63b3ff",
            fontSize: 96,
            fontWeight: 700,
            fontStyle: "italic",
            letterSpacing: -3,
            lineHeight: 1,
            display: "flex",
          }}
        >
          agentic.
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#cbd5e1",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span>5 TOOLS</span>
            <span>·</span>
            <span>{"<60s"}</span>
            <span>·</span>
            <span>0 HUMAN INPUT</span>
          </div>
          <div
            style={{ color: "#63b3ff", fontSize: 20, letterSpacing: 2 }}
          >
            TRAVELMIND
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
