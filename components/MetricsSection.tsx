"use client";

import { useInView } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useState, useRef } from "react";

function CountUpStat({ target, label, prefix, suffix, isVisible, countDown }: {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
  countDown?: boolean;
}) {
  const count = useCountUp(target, 1200, isVisible);
  const display = countDown ? target - count : count;

  return (
    <div className="text-center min-w-[120px]">
      <p className="font-display text-4xl md:text-[56px] text-accent-primary leading-none">
        {prefix || ""}{display}{suffix || ""}
      </p>
      <p className="font-mono text-[10px] text-txt-tertiary tracking-[0.15em] uppercase mt-3">
        {label}
      </p>
    </div>
  );
}

function StaticStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center min-w-[120px]">
      <p className="font-display text-4xl md:text-[56px] text-accent-primary leading-none">
        {value}
      </p>
      <p className="font-mono text-[10px] text-txt-tertiary tracking-[0.15em] uppercase mt-3">
        {label}
      </p>
    </div>
  );
}

export default function MetricsSection() {
  const { ref, isVisible } = useInView(0.3);
  const [forcedVisible, setForcedVisible] = useState(false);
  const fallbackFired = useRef(false);

  // Fallback: force visibility after 3 seconds even if observer hasn't fired
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fallbackFired.current) {
        fallbackFired.current = true;
        setForcedVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const triggered = isVisible || forcedVisible;

  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at center, rgba(99,179,255,0.03) 0%, transparent 60%)" }}
      />

      <div className={`max-w-[1100px] mx-auto relative transition-all duration-700 ${triggered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex flex-wrap items-start justify-center gap-10 md:gap-0 md:justify-between">
          {/* Stat 1: 0 → 47 */}
          <div className="flex items-center gap-10 md:gap-12">
            <CountUpStat target={47} label="Avg sources per scan" isVisible={triggered} />
            <div className="hidden md:block w-[1px] h-16 bg-border-default" />
          </div>

          {/* Stat 2: 60 → 0 (descending), displays as "<Ns" */}
          <div className="flex items-center gap-10 md:gap-12">
            <CountUpStat target={60} label="Seconds end-to-end" prefix="<" suffix="s" isVisible={triggered} countDown />
            <div className="hidden md:block w-[1px] h-16 bg-border-default" />
          </div>

          {/* Stat 3: 0 → 5 */}
          <div className="flex items-center gap-10 md:gap-12">
            <CountUpStat target={5} label="Autonomous tool calls" isVisible={triggered} />
            <div className="hidden md:block w-[1px] h-16 bg-border-default" />
          </div>

          {/* Stat 4: static $0 */}
          <div className="flex items-center gap-10 md:gap-12">
            <StaticStat value="$0" label="Monthly infra cost" />
          </div>
        </div>
      </div>
    </section>
  );
}
