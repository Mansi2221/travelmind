"use client";

import { useRef, useEffect } from "react";
import ToolCallBadge from "./ToolCallBadge";

export interface StreamEvent {
  type: "tool_start" | "tool_end" | "token" | "report" | "done" | "error";
  tool?: string;
  input?: string;
  content?: string;
  message?: string;
  data?: Record<string, unknown>;
}

interface AgentStreamProps {
  events: StreamEvent[];
  isRunning: boolean;
  elapsedTime: number;
}

export default function AgentStream({
  events,
  isRunning,
  elapsedTime,
}: AgentStreamProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const toolStatuses = new Map<string, "running" | "complete">();
  const tokens: string[] = [];

  for (const event of events) {
    if (event.type === "tool_start" && event.tool) {
      toolStatuses.set(event.tool, "running");
    }
    if (event.type === "tool_end" && event.tool) {
      toolStatuses.set(event.tool, "complete");
    }
    if (event.type === "token" && event.content) {
      tokens.push(event.content);
    }
  }

  const tokenText = tokens.join("");
  const hasError = events.some((e) => e.type === "error");
  const errorMessage = events.find((e) => e.type === "error")?.message;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${isRunning ? "bg-blue-400 animate-pulse" : "bg-gray-500"}`}
          />
          <h3 className="font-heading text-sm font-semibold text-gray-200 uppercase tracking-wider">
            Agent Activity
          </h3>
        </div>
        {(isRunning || elapsedTime > 0) && (
          <span className="font-mono text-xs text-gray-400">
            {(elapsedTime / 1000).toFixed(1)}s
          </span>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin"
      >
        {events.length === 0 && !isRunning && (
          <div className="flex items-center justify-center h-full text-gray-500 font-mono text-sm">
            Waiting for query...
          </div>
        )}

        {isRunning && events.length === 0 && (
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm animate-pulse">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Initializing agent...
          </div>
        )}

        {Array.from(toolStatuses.entries()).map(([tool, status]) => (
          <ToolCallBadge key={tool} tool={tool} status={status} />
        ))}

        {tokenText && (
          <div className="mt-3 pt-3 border-t border-gray-700/30">
            <p className="text-xs text-gray-500 font-mono mb-1 uppercase tracking-wider">
              Agent Response
            </p>
            <p className="text-gray-400 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
              {tokenText.length > 500
                ? tokenText.slice(0, 500) + "..."
                : tokenText}
            </p>
          </div>
        )}

        {hasError && (
          <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
            Error: {errorMessage || "Something went wrong"}
          </div>
        )}
      </div>
    </div>
  );
}
