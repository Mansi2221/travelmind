"use client";

import { useState, useRef, useCallback } from "react";
import QueryInput from "@/components/QueryInput";
import AgentStream, { StreamEvent } from "@/components/AgentStream";
import ReportDisplay from "@/components/ReportDisplay";
import { useInView } from "@/hooks/useIntersectionObserver";

interface TravelReport {
  destination: string;
  travel_month: string;
  total_budget_estimate: string;
  flight_summary: string;
  flight_price_range: string;
  hotel_summary: string;
  hotel_price_range: string;
  weather_summary: string;
  weather_rating: string;
  visa_summary: string;
  visa_required: boolean;
  top_activities: string[];
  insider_tip: string;
  overall_recommendation: string;
}

export default function DemoSection() {
  const { ref: sectionRef, isVisible } = useInView(0.1);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [report, setReport] = useState<TravelReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    const start = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(Date.now() - start);
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleSubmit = useCallback(
    async (query: string) => {
      setEvents([]);
      setReport(null);
      setIsRunning(true);
      setElapsedTime(0);
      startTimer();

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                setEvents((prev) => [...prev, data]);

                if (data.type === "report" && data.data) {
                  setReport(data.data as TravelReport);
                }

                if (data.type === "done") {
                  setIsRunning(false);
                  stopTimer();
                }
              } catch {
                // skip
              }
            }
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Request failed";
        setEvents((prev) => [...prev, { type: "error", message }, { type: "done" }]);
      } finally {
        setIsRunning(false);
        stopTimer();
      }
    },
    [startTimer, stopTimer]
  );

  const hasActivity = events.length > 0 || isRunning;

  return (
    <section id="demo" className="py-20 px-6" ref={sectionRef}>
      <div className={`max-w-[1200px] mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent-primary font-mono text-sm">{"\u25B8"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">
              Live Demo &middot; Interactive
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-txt-primary leading-tight tracking-[-0.03em]">
            Watch it <span className="italic text-accent-primary">think.</span>
          </h2>
          <p className="mt-3 text-txt-secondary text-base max-w-lg">
            Type any travel goal. Watch five tools fire autonomously.
          </p>
        </div>

        {/* Demo container */}
        <div className="bg-bg-elevated border border-border-default rounded-xl p-6 md:p-8
          shadow-[inset_0_1px_0_rgba(148,163,184,0.06)]">
          <QueryInput onSubmit={handleSubmit} isLoading={isRunning} />

          {hasActivity && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Agent stream */}
              <div className="lg:col-span-4">
                <div className="bg-bg-canvas border border-border-default rounded-sm min-h-[400px] max-h-[560px] flex flex-col overflow-hidden">
                  <AgentStream events={events} isRunning={isRunning} elapsedTime={elapsedTime} />
                </div>
              </div>

              {/* Report */}
              <div className="lg:col-span-8">
                {report ? (
                  <ReportDisplay report={report} />
                ) : isRunning ? (
                  <div className="flex items-center justify-center h-[400px] border border-border-faint rounded-sm">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin mx-auto mb-4" />
                      <p className="font-mono text-[11px] text-txt-tertiary tracking-wider uppercase">Building travel briefing</p>
                      <p className="font-mono text-[10px] text-txt-muted mt-1">Agent is researching your destination</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[400px] border border-border-faint rounded-sm">
                    <p className="font-mono text-[11px] text-txt-muted tracking-wider">Briefing will render upon scan completion.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Caption */}
        <p className="mt-4 text-center font-mono text-[10px] text-txt-muted">
          {"\u2139"} Each scan uses ~5 Tavily searches and 1 LLM call. Free tier supports 1000 scans/month.
        </p>
      </div>
    </section>
  );
}
