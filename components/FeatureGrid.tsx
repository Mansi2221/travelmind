"use client";

import { useInView } from "@/hooks/useIntersectionObserver";

const FEATURES = [
  {
    title: "Real-Time Flight Pricing",
    body: "Live web search across travel sites for current fares, route options, and money-saving tips. Not stale training data.",
    stat: "AVG: 12 sources analyzed",
    icon: "\u2708",
    border: "border-t-accent-primary",
  },
  {
    title: "Curated Accommodation",
    body: "Filters real hotel reviews and listings by your budget tier and travel style — boutique, luxury, business, hostel.",
    stat: "AVG: 8 properties surfaced",
    icon: "\u2302",
    border: "border-t-[#a855f7]",
  },
  {
    title: "Visa Requirement Detection",
    body: "Cross-references your nationality and destination to flag visa requirements, processing times, and embassy contacts.",
    stat: "200+ nationalities supported",
    icon: "\u2637",
    border: "border-t-accent-alert",
  },
  {
    title: "Climate Awareness",
    body: "Synthesizes seasonal weather patterns, packing recommendations, and travel advisability for your specific dates.",
    stat: "AVG: 5 climate sources",
    icon: "\u2601",
    border: "border-t-[#06b6d4]",
  },
  {
    title: "Hidden Gem Discovery",
    body: "Beyond TripAdvisor\u2019s top 10 — pulls insider tips, off-the-beaten-path experiences, and locally-loved spots.",
    stat: "AVG: 5 activities + 1 hidden gem",
    icon: "\u25CE",
    border: "border-t-accent-warm",
  },
  {
    title: "Typed Output",
    body: "All findings synthesized into a typed JSON briefing — directly consumable by booking flows, CRMs, or downstream agents.",
    stat: "20+ structured fields",
    icon: "\u25C8",
    border: "border-t-accent-success",
  },
];

export default function FeatureGrid() {
  const { ref, isVisible } = useInView();

  return (
    <section id="features" className="py-20 px-6" ref={ref}>
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">
              Capabilities
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
            Six dimensions of travel <span className="italic text-accent-primary">intelligence.</span>
          </h2>
          <p className="mt-3 text-txt-secondary text-base max-w-lg">
            Each tool is a specialized search agent feeding the central reasoning loop.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`group p-6 bg-bg-elevated border border-border-faint border-t-[3px] ${feature.border}
                hover:border-border-accent hover:-translate-y-[2px] hover:shadow-lg hover:shadow-accent-glow/5
                transition-all duration-300`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl text-txt-tertiary group-hover:text-accent-primary transition-colors">
                  {feature.icon}
                </span>
                <h3 className="font-body font-semibold text-base text-txt-primary">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-txt-tertiary leading-relaxed mb-4">
                {feature.body}
              </p>
              <p className="font-mono text-[10px] text-txt-muted tracking-wider uppercase">
                {feature.stat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
