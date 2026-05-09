"use client";

import { useInView } from "@/hooks/useIntersectionObserver";

type CellValue = "yes" | "no" | "partial";

const ROWS: { feature: string; travelmind: CellValue; chatgpt: CellValue; google: CellValue; ota: CellValue }[] = [
  { feature: "Real-time prices", travelmind: "yes", chatgpt: "no", google: "yes", ota: "yes" },
  { feature: "Multi-source synthesis", travelmind: "yes", chatgpt: "no", google: "no", ota: "no" },
  { feature: "Visa intelligence", travelmind: "yes", chatgpt: "partial", google: "no", ota: "no" },
  { feature: "Structured JSON output", travelmind: "yes", chatgpt: "no", google: "no", ota: "no" },
  { feature: "Sub-60s end-to-end", travelmind: "yes", chatgpt: "partial", google: "yes", ota: "yes" },
  { feature: "Conversational refinement", travelmind: "yes", chatgpt: "yes", google: "no", ota: "no" },
  { feature: "Open source", travelmind: "yes", chatgpt: "no", google: "no", ota: "no" },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") return <span className="text-accent-success">{"\u2713"}</span>;
  if (value === "partial") return <span className="text-accent-warm text-[10px] font-mono">partial</span>;
  return <span className="text-txt-muted">{"\u2717"}</span>;
}

export default function ComparisonTable() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">Comparison</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
            Why <span className="italic text-accent-primary">agents</span> beat chatbots.
          </h2>
          <p className="mt-3 text-txt-secondary text-base max-w-lg">
            Same input. Drastically different output.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[640px] font-mono text-[12px]">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-3 pr-4 text-txt-muted tracking-wider uppercase font-medium">Feature</th>
                <th className="py-3 px-4 text-center bg-accent-primary/[0.06] text-accent-primary tracking-wider uppercase font-semibold">TravelMind</th>
                <th className="py-3 px-4 text-center text-txt-muted tracking-wider uppercase font-medium">ChatGPT</th>
                <th className="py-3 px-4 text-center text-txt-muted tracking-wider uppercase font-medium">Google Travel</th>
                <th className="py-3 px-4 text-center text-txt-muted tracking-wider uppercase font-medium">Traditional OTA</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-border-faint hover:bg-bg-elevated/50 transition-colors">
                  <td className="py-3 pr-4 text-txt-secondary">{row.feature}</td>
                  <td className="py-3 px-4 text-center bg-accent-primary/[0.03]"><CellIcon value={row.travelmind} /></td>
                  <td className="py-3 px-4 text-center"><CellIcon value={row.chatgpt} /></td>
                  <td className="py-3 px-4 text-center"><CellIcon value={row.google} /></td>
                  <td className="py-3 px-4 text-center"><CellIcon value={row.ota} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
