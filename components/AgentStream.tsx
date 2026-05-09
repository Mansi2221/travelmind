"use client";

import { useRef, useEffect } from "react";

export interface StreamEvent {
  type: "tool_start" | "tool_end" | "token" | "report" | "done" | "error";
  tool?: string;
  input?: string;
  content?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface AgentStreamProps {
  events: StreamEvent[];
  isRunning: boolean;
  elapsedTime: number;
}

const TOOL_META: Record<string, { icon: string; label: string; queryPrefix: string }> = {
  search_flights: { icon: "\u2708", label: "Flight Intelligence", queryPrefix: "flights" },
  search_hotels: { icon: "\u2302", label: "Hotel Discovery", queryPrefix: "hotels" },
  check_weather: { icon: "\u2601", label: "Weather Forecast", queryPrefix: "weather" },
  check_visa_requirements: { icon: "\u2637", label: "Visa Requirements", queryPrefix: "visa" },
  search_activities: { icon: "\u25CE", label: "Activity Curation", queryPrefix: "activities" },
};

const TOOL_ORDER = [
  "search_flights",
  "search_hotels",
  "check_weather",
  "check_visa_requirements",
  "search_activities",
];

type ToolStatus = "pending" | "active" | "complete" | "failed";

export default function AgentStream({
  events,
  isRunning,
  elapsedTime,
}: AgentStreamProps) {
  const tokenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tokenRef.current) {
      tokenRef.current.scrollTop = tokenRef.current.scrollHeight;
    }
  }, [events]);

  // Compute tool statuses
  const toolStatuses = new Map<string, ToolStatus>();
  const toolInputs = new Map<string, string>();

  for (const event of events) {
    if (event.type === "tool_start" && event.tool) {
      toolStatuses.set(event.tool, "active");
      if (event.input) {
        try {
          const parsed = JSON.parse(event.input);
          const inner = parsed.input ? JSON.parse(parsed.input) : parsed;
          const vals = Object.values(inner).join(", ");
          toolInputs.set(event.tool, vals);
        } catch {
          toolInputs.set(event.tool, "searching...");
        }
      }
    }
    if (event.type === "tool_end" && event.tool) {
      toolStatuses.set(event.tool, "complete");
    }
  }

  // If scanning has started, mark tools that haven't been seen as pending
  const hasStarted = events.length > 0;

  const tokens = events
    .filter((e) => e.type === "token" && e.content)
    .map((e) => e.content)
    .join("");

  const hasError = events.some((e) => e.type === "error");
  const errorMessage = events.find((e) => e.type === "error")?.message;

  const completedCount = Array.from(toolStatuses.values()).filter(
    (s) => s === "complete"
  ).length;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const tenths = Math.floor((ms % 1000) / 100);
    return `${String(seconds).padStart(2, "0")}:${tenths}s`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-faint">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isRunning ? "bg-accent-alert animate-pulse-dot" : "bg-txt-muted"
            }`}
          />
          <h3 className="font-mono text-[11px] font-medium text-txt-tertiary tracking-[0.18em] uppercase">
            Agent Activity
          </h3>
          {isRunning && (
            <span className="font-mono text-[10px] text-accent-alert tracking-wider ml-1">
              LIVE
            </span>
          )}
        </div>
        {(isRunning || elapsedTime > 0) && (
          <span className="font-mono text-base text-accent-primary tabular-nums">
            {formatTime(elapsedTime)}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {hasStarted && (
        <div className="h-[1px] bg-border-faint relative">
          <div
            className="absolute top-0 left-0 h-full bg-accent-primary transition-all duration-500"
            style={{ width: `${(completedCount / 5) * 100}%` }}
          />
        </div>
      )}

      {/* Tool rows */}
      <div className="flex-1 overflow-y-auto p-5 space-y-1">
        {!hasStarted && !isRunning && (
          <div className="flex items-center justify-center h-full">
            <p className="font-mono text-[11px] text-txt-muted tracking-wider uppercase">
              Awaiting query...
            </p>
          </div>
        )}

        {hasStarted &&
          TOOL_ORDER.map((toolName) => {
            const status: ToolStatus =
              toolStatuses.get(toolName) || (hasStarted ? "pending" : "pending");
            const meta = TOOL_META[toolName];
            const inputText = toolInputs.get(toolName);

            return (
              <div
                key={toolName}
                className={`flex flex-col rounded-md px-4 py-3 transition-all duration-300 ${
                  status === "active"
                    ? "bg-bg-elevated border-l-2 border-l-accent-primary"
                    : status === "complete"
                      ? "bg-transparent"
                      : "opacity-40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Status icon */}
                    {status === "pending" && (
                      <span className="w-4 h-4 rounded-full border border-txt-muted/40 flex items-center justify-center text-[8px] text-txt-muted">
                        {"\u25CB"}
                      </span>
                    )}
                    {status === "active" && (
                      <span className="w-4 h-4 rounded-full border border-accent-primary flex items-center justify-center animate-spin-slow">
                        <span className="w-2 h-2 rounded-full bg-accent-primary/60" />
                      </span>
                    )}
                    {status === "complete" && (
                      <span className="w-4 h-4 rounded-full bg-accent-success flex items-center justify-center text-[10px] text-bg-base font-bold">
                        {"\u2713"}
                      </span>
                    )}
                    {status === "failed" && (
                      <span className="w-4 h-4 rounded-full bg-accent-alert flex items-center justify-center text-[10px] text-bg-base font-bold">
                        {"\u2717"}
                      </span>
                    )}

                    {/* Icon + name */}
                    <span className="text-sm">{meta.icon}</span>
                    <span
                      className={`font-mono text-xs font-medium ${
                        status === "pending" ? "text-txt-tertiary" : "text-txt-primary"
                      }`}
                    >
                      {meta.label}
                    </span>
                  </div>

                  {/* Status label */}
                  <span
                    className={`font-mono text-[10px] tracking-wider ${
                      status === "pending"
                        ? "text-txt-muted"
                        : status === "active"
                          ? "text-accent-primary"
                          : status === "complete"
                            ? "text-accent-success"
                            : "text-accent-alert"
                    }`}
                  >
                    {status === "pending" && "PENDING"}
                    {status === "active" && (
                      <span>
                        QUERYING
                        <span className="animate-pulse">...</span>
                      </span>
                    )}
                    {status === "complete" && "\u2713 COMPLETE"}
                    {status === "failed" && "FALLBACK"}
                  </span>
                </div>

                {/* Active query preview */}
                {(status === "active" || status === "complete") && inputText && (
                  <p className="mt-1.5 ml-7 font-mono text-[10px] text-txt-muted truncate">
                    {"\u21B3"} {inputText}
                  </p>
                )}
              </div>
            );
          })}

        {/* Token stream */}
        {tokens && (
          <div className="mt-4 pt-4 border-t border-border-faint">
            <p className="font-mono text-[10px] text-txt-muted tracking-[0.18em] uppercase mb-2">
              Agent Reasoning
            </p>
            <div
              ref={tokenRef}
              className="max-h-[160px] overflow-y-auto bg-bg-base rounded p-3 terminal-fade"
            >
              <p className="font-mono text-[11px] text-txt-tertiary leading-relaxed whitespace-pre-wrap break-words">
                {tokens.length > 400 ? tokens.slice(0, 400) + "..." : tokens}
                {isRunning && (
                  <span className="inline-block w-[6px] h-[14px] bg-accent-primary ml-0.5 animate-typewriter-cursor" />
                )}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {hasError && (
          <div className="mt-3 p-4 bg-accent-alert/5 border border-accent-alert/20 rounded">
            <p className="font-mono text-[11px] text-accent-alert">
              {errorMessage || "An error occurred during the scan."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
