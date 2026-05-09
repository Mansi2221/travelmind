"use client";

export default function AtmosphericBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Aurora 1 — top right, ice blue */}
      <div className="absolute -top-[200px] -right-[100px] w-[800px] h-[800px] animate-aurora-1">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 179, 255, 0.08) 0%, transparent 70%)",
            filter: "blur(120px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Aurora 2 — bottom left, warm amber */}
      <div className="absolute -bottom-[100px] -left-[100px] w-[600px] h-[600px] animate-aurora-2">
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251, 191, 36, 0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
