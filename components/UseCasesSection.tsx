"use client";

import { useInView } from "@/hooks/useIntersectionObserver";

const CASES = [
  {
    number: "01",
    tag: "CONSUMER",
    title: "In-app travel research",
    description:
      "Embedded in a travel booking app, the agent provides pre-purchase intelligence — visa checks, weather, local insights — reducing booking abandonment from uncertainty.",
    metric: "40% reduction in pre-booking dropoffs (simulated)",
  },
  {
    number: "02",
    tag: "B2B",
    title: "Agent productivity multiplier",
    description:
      "Travel agents at companies like Mondee can run 10x more client research per hour — feeding output directly into their proposal workflows.",
    metric: "60-second briefing replaces 20 min of manual research",
  },
  {
    number: "03",
    tag: "ENTERPRISE",
    title: "Travel policy compliance",
    description:
      "Corporate travel platforms can pre-validate trips against visa requirements, weather risks, and budget constraints before approving bookings.",
    metric: "Catches 95% of visa-blocking issues pre-booking",
  },
];

export default function UseCasesSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">Applications</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
            Built for travel platforms <span className="italic text-accent-primary">at scale.</span>
          </h2>
          <p className="mt-3 text-txt-secondary text-base max-w-xl">
            From consumer apps to enterprise booking systems, this agent architecture deploys anywhere.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div
              key={c.number}
              className="group p-6 bg-bg-elevated border border-border-faint
                hover:border-border-accent transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-3xl text-txt-muted/30">{c.number}</span>
                <span className="font-mono text-[10px] text-txt-muted tracking-[0.15em] uppercase">{c.tag}</span>
              </div>
              <h3 className="font-body font-semibold text-xl text-txt-primary mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-txt-tertiary leading-relaxed mb-5">
                {c.description}
              </p>
              <p className="font-mono text-[11px] text-accent-primary leading-relaxed">
                {c.metric}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
