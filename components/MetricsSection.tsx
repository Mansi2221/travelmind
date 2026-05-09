"use client";

import { useInView } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";

function CountStat({ target, label, prefix, isVisible }: {
  target: number;
  label: string;
  prefix?: string;
  isVisible: boolean;
}) {
  const count = useCountUp(target, 1200, isVisible);

  return (
    <div className="text-center min-w-[120px]">
      <p className="font-display text-4xl md:text-[56px] text-accent-primary leading-none">
        {prefix || ""}{target === 0 ? "0" : count}
      </p>
      <p className="font-mono text-[10px] text-txt-tertiary tracking-[0.15em] uppercase mt-3">
        {label}
      </p>
    </div>
  );
}

export default function MetricsSection() {
  const { ref, isVisible } = useInView(0.3);

  const stats = [
    { target: 47, label: "Avg sources per scan" },
    { target: 60, label: "Seconds end-to-end", prefix: "<" },
    { target: 5, label: "Autonomous tool calls" },
    { target: 0, label: "Monthly infra cost", prefix: "$" },
  ];

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at center, rgba(99,179,255,0.03) 0%, transparent 60%)" }}
      />

      <div className={`max-w-[1100px] mx-auto relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex flex-wrap items-start justify-center gap-10 md:gap-0 md:justify-between">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-10 md:gap-12">
              <CountStat
                target={stat.target}
                label={stat.label}
                prefix={stat.prefix}
                isVisible={isVisible}
              />
              {i < stats.length - 1 && (
                <div className="hidden md:block w-[1px] h-16 bg-border-default" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
