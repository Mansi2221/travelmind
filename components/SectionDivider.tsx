"use client";

export default function SectionDivider({ number, label }: { number?: string; label?: string }) {
  return (
    <div className="relative py-12">
      <div className="boarding-divider" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-canvas px-4">
        <span className="text-txt-muted text-xs">{"\u25C7"}</span>
      </div>
      {(number || label) && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-3 bg-bg-canvas px-3">
          <span className="font-mono text-[10px] text-txt-muted tracking-[0.15em] uppercase">
            {number && `Section ${number}`}
            {number && label && " \u00B7 "}
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
