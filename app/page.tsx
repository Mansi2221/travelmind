"use client";

import { useState, useRef, useCallback } from "react";
import QueryInput from "@/components/QueryInput";
import AgentStream, { StreamEvent } from "@/components/AgentStream";
import ReportCard from "@/components/ReportCard";

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

export default function Home() {
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

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

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
                // skip malformed JSON
              }
            }
          }
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Request failed";
        setEvents((prev) => [
          ...prev,
          { type: "error", message },
          { type: "done" },
        ]);
      } finally {
        setIsRunning(false);
        stopTimer();
      }
    },
    [startTimer, stopTimer]
  );

  const hasActivity = events.length > 0 || isRunning;

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-dark-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-400">{"\u2726"}</span>
              TRAVELMIND
            </h1>
            <p className="text-gray-500 text-xs font-mono mt-0.5">
              AI Travel Intelligence Agent
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-700 border border-gray-700/50">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs font-mono text-gray-400">
              Gemini 2.0 + LangGraph
            </span>
          </div>
        </div>
      </header>

      {/* Query Section */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Where are you going?
          </h2>
          <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
            Our AI agent searches flights, hotels, weather, visa requirements, and
            activities in real-time to build your travel intelligence report.
          </p>
        </div>
        <QueryInput onSubmit={handleSubmit} isLoading={isRunning} />
      </section>

      {/* Results Section */}
      {hasActivity && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Agent Activity Panel */}
            <div className="lg:col-span-2 bg-dark-800 rounded-xl border border-gray-700/50 min-h-[400px] max-h-[600px] flex flex-col overflow-hidden">
              <AgentStream
                events={events}
                isRunning={isRunning}
                elapsedTime={elapsedTime}
              />
            </div>

            {/* Report Panel */}
            <div className="lg:col-span-3">
              {report ? (
                <ReportCard report={report} />
              ) : isRunning ? (
                <div className="flex items-center justify-center h-[400px] bg-dark-800 rounded-xl border border-gray-700/50">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-400 font-mono text-sm">
                      Building your travel report...
                    </p>
                    <p className="text-gray-500 font-mono text-xs mt-1">
                      The agent is researching your destination
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] bg-dark-800 rounded-xl border border-gray-700/50">
                  <p className="text-gray-500 font-mono text-sm">
                    Report will appear here once the agent completes its analysis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <p className="text-gray-600 font-mono text-xs">
            Built with Next.js, LangGraph, Gemini 2.0 Flash, and Tavily Search
          </p>
        </div>
      </footer>
    </main>
  );
}
