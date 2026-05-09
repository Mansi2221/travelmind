"use client";

import { useState, useEffect } from "react";

interface HeaderProps {
  isScanning: boolean;
  toolsCompleted: number;
  totalTools: number;
}

function CompassSvg() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent-primary"
      aria-label="TravelMind compass logo"
    >
      <polygon points="12 2 15 10 12 8 9 10" />
      <polygon points="12 22 9 14 12 16 15 14" />
      <polygon points="2 12 10 9 8 12 10 15" />
      <polygon points="22 12 14 15 16 12 14 9" />
      <circle cx="12" cy="12" r="3" strokeWidth="1" />
    </svg>
  );
}

export default function Header({
  isScanning,
  toolsCompleted,
  totalTools,
}: HeaderProps) {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().slice(11, 19) + " UTC"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border-faint bg-bg-base/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Left — brand */}
        <div className="flex items-center gap-3">
          <CompassSvg />
          <div>
            <span className="text-txt-primary font-body font-semibold text-base tracking-[0.04em]">
              TRAVELMIND
            </span>
            <p className="font-mono text-[10px] text-txt-muted tracking-wider">
              INTELLIGENCE &middot; VERSION 1.0
            </p>
          </div>
        </div>

        {/* Center — progress dots (visible during scan) */}
        {isScanning && (
          <div className="hidden md:flex items-center gap-2" aria-label={`${toolsCompleted} of ${totalTools} tools complete`}>
            {Array.from({ length: totalTools }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i < toolsCompleted
                    ? "bg-accent-primary scale-110"
                    : "bg-txt-muted/30"
                }`}
              />
            ))}
          </div>
        )}

        {/* Right — status + clock */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-faint bg-bg-glass backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse-dot" />
            <span className="font-mono text-[11px] text-txt-tertiary">
              OPERATIONAL
            </span>
          </div>
          <span className="hidden lg:block font-mono text-[11px] text-txt-muted">
            {utcTime}
          </span>
        </div>
      </div>

      {/* Loading bar */}
      {isScanning && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent-primary/60 animate-progress-bar" />
      )}
    </header>
  );
}
