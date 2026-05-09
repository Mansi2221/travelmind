"use client";

import { useInView } from "@/hooks/useIntersectionObserver";

const STACK = [
  { name: "Next.js 14", role: "App Router, server components, streaming" },
  { name: "LangGraph", role: "Stateful agent orchestration" },
  { name: "Groq · Llama 4 Scout", role: "Ultra-fast LLM inference (~800 tok/s)" },
  { name: "Tavily API", role: "Real-time web intelligence" },
  { name: "Vercel", role: "Edge deployment + SSE streaming" },
];

export default function StackSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="stack" className="py-20 px-6" ref={ref}>
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">Stack</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
            Modern AI <span className="italic text-accent-primary">infrastructure.</span>
          </h2>
          <p className="mt-3 text-txt-secondary text-base max-w-lg">
            Built on the production-grade open stack used by leading AI companies.
          </p>
        </div>

        {/* Stack row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {STACK.map((item) => (
            <div
              key={item.name}
              className="group p-5 bg-bg-elevated border border-border-faint
                hover:border-border-accent hover:-translate-y-[2px] transition-all duration-200 text-center"
            >
              <p className="font-body font-semibold text-sm text-txt-primary group-hover:text-accent-primary transition-colors">
                {item.name}
              </p>
              <p className="mt-2 font-mono text-[10px] text-txt-muted leading-relaxed">
                {item.role}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-txt-muted tracking-wider">
          $0 monthly cost &middot; Free tier across all services &middot; Open source
        </p>
      </div>
    </section>
  );
}
