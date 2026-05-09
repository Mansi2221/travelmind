"use client";

import { useInView } from "@/hooks/useIntersectionObserver";

export default function CTASection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 px-6 border-y border-border-default relative overflow-hidden" ref={ref}>
      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 60% 50%, rgba(99,179,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 30% 50%, rgba(251,191,36,0.03) 0%, transparent 50%)",
        }}
      />

      <div className={`max-w-[800px] mx-auto text-center relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
          <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">
            Available for Building
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
          Want one of these for{" "}
          <span className="italic text-accent-primary">your</span> platform?
        </h2>

        <p className="mt-6 text-txt-secondary text-base leading-relaxed max-w-[600px] mx-auto">
          I built this as a demonstration of what&apos;s possible with agentic AI for travel.
          Open to collaborations, internships, and shipping the next version with your team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <a
            href="https://www.linkedin.com/in/mansi2221/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-accent-primary text-bg-base font-body font-semibold
              text-[13px] uppercase tracking-[0.15em] hover:brightness-110 hover:-translate-y-[1px]
              hover:shadow-lg hover:shadow-accent-glow active:scale-[0.98] transition-all duration-200"
          >
            {"\u25B8"} Hire Me &middot; LinkedIn
          </a>
          <a
            href="https://github.com/Mansi2221/travelmind"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-border-default text-txt-secondary font-body font-semibold
              text-[13px] uppercase tracking-[0.15em] hover:border-border-accent hover:text-txt-primary
              transition-all duration-200"
          >
            Fork on GitHub {"\u2197"}
          </a>
          <a
            href="mailto:mansi@example.com"
            className="px-8 py-3.5 border border-border-default text-txt-secondary font-body font-semibold
              text-[13px] uppercase tracking-[0.15em] hover:border-border-accent hover:text-txt-primary
              transition-all duration-200"
          >
            Email Me {"\u2197"}
          </a>
        </div>

        <p className="mt-8 font-mono text-[10px] text-txt-muted tracking-wider">
          Built by Mansi &middot; Available May 2026
        </p>
      </div>
    </section>
  );
}
