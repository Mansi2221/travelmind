"use client";

import ArchitectureDiagram from "./ArchitectureDiagram";
import { useInView } from "@/hooks/useIntersectionObserver";

const CONCEPTS = [
  {
    title: "AUTONOMOUS",
    description:
      "The agent decides which tools to call and in what order, based on the query. No hardcoded pipeline.",
    icon: "\u2699",
  },
  {
    title: "ITERATIVE",
    description:
      "Tool results feed back into the agent's reasoning. It can call additional tools if needed before producing output.",
    icon: "\u21BB",
  },
  {
    title: "STRUCTURED",
    description:
      "Final output is a typed JSON object — directly consumable by booking flows, CRMs, or downstream agents.",
    icon: "\u25A8",
  },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="how-it-works" className="py-20 px-6" ref={ref}>
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">
              Architecture &middot; LangGraph Orchestration
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
            An <span className="italic text-accent-primary">agent,</span> not a chatbot.
          </h2>
          <p className="mt-3 text-txt-secondary text-base max-w-xl">
            The difference: autonomous decisions, multi-step tool use, and structured output.
            Not a single prompt — an actual graph.
          </p>
        </div>

        {/* Diagram */}
        <div className="mb-16">
          <ArchitectureDiagram />
        </div>

        {/* 3 Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONCEPTS.map((concept) => (
            <div key={concept.title} className="group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg text-accent-primary">{concept.icon}</span>
                <h3 className="font-mono text-[12px] text-txt-primary tracking-[0.15em] font-semibold">
                  {concept.title}
                </h3>
              </div>
              <p className="text-sm text-txt-tertiary leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
