"use client";

export default function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 pt-16">
      {/* Background aurora */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full opacity-60"
          style={{
            background: "radial-gradient(ellipse at center, rgba(99,179,255,0.07) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative max-w-[920px] mx-auto text-center">
        {/* Announcement pill */}
        <button
          onClick={scrollToDemo}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-border-default
            bg-bg-glass backdrop-blur-md font-mono text-[11px] text-txt-tertiary
            hover:border-border-accent transition-all duration-200 mb-8
            opacity-0 animate-fade-up stagger-1"
        >
          <span className="text-accent-primary">{"\u2726"}</span>
          NEW &middot; Multi-step agentic AI for travel research
        </button>

        {/* Headline */}
        <h1 className="opacity-0 animate-fade-up stagger-2">
          <span className="block font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-txt-primary leading-[0.95] tracking-[-0.04em]">
            Travel research,
          </span>
          <span className="block font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-accent-primary leading-[0.95] tracking-[-0.04em] mt-1">
            agentic.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-txt-secondary text-base sm:text-lg leading-relaxed max-w-[640px] mx-auto opacity-0 animate-fade-up stagger-3">
          Five autonomous tool calls. Real-time web intelligence. A complete
          travel briefing in under sixty seconds — without a single human
          handoff. The future of travel research, demonstrated.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 opacity-0 animate-fade-up stagger-4">
          <button
            onClick={scrollToDemo}
            className="px-8 py-3.5 bg-accent-primary text-bg-base font-body font-semibold
              text-[13px] uppercase tracking-[0.15em] hover:brightness-110 hover:-translate-y-[1px]
              hover:shadow-lg hover:shadow-accent-glow active:scale-[0.98] transition-all duration-200"
          >
            {"\u25B8"} Try the Live Demo
          </button>
          <a
            href="https://github.com/Mansi2221/travelmind"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 border border-border-default text-txt-secondary font-body font-semibold
              text-[13px] uppercase tracking-[0.15em] hover:border-border-accent hover:text-txt-primary
              transition-all duration-200"
          >
            View Source {"\u2197"}
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12 opacity-0 animate-fade-up stagger-5">
          <span className="font-mono text-[10px] text-txt-muted tracking-wider">Powered by</span>
          {["LangGraph", "Groq", "Tavily", "Vercel"].map((name) => (
            <span
              key={name}
              className="px-2.5 py-1 border border-border-faint font-mono text-[10px] text-txt-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
