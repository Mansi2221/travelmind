"use client";

import { useState } from "react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const PRESETS = [
  { label: "Tokyo in autumn \u2014 food, temples, $2k", query: "New York to Tokyo, October, 7 days, $2000 budget, interested in food and temples" },
  { label: "Bali escape from London \u2014 December reset", query: "London to Bali, December, 10 days, $1500 budget, relaxation and beaches" },
  { label: "Barcelona long weekend \u2014 architecture & tapas", query: "San Francisco to Barcelona, June, 5 days, $3000 budget, architecture and food" },
];

export default function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    if (!isLoading) {
      setQuery(preset.query);
      onSubmit(preset.query);
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto">
      {/* Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-accent-primary font-mono text-sm">[</span>
        <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.18em] uppercase">
          Initiate Scan
        </span>
      </div>

      {/* Input + Button */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1 group">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-accent-primary text-sm">
            {"\u25B8"}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your travel goal — origin, destination, dates, budget, vibe..."
            disabled={isLoading}
            aria-label="Travel query input"
            className="w-full h-16 pl-10 pr-12 bg-bg-elevated border border-border-default
              text-txt-primary font-body text-base placeholder:text-txt-muted placeholder:italic
              focus:outline-none focus:border-accent-primary focus:shadow-[0_0_20px_var(--accent-glow)]
              transition-all duration-200 disabled:opacity-50"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[11px] text-txt-muted">
            {"\u21B5"}
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="h-16 px-8 bg-accent-primary text-bg-base font-body font-semibold text-[13px]
            uppercase tracking-[0.18em] transition-all duration-200
            hover:brightness-110 hover:-translate-y-[1px] hover:shadow-lg
            active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
            whitespace-nowrap"
        >
          {isLoading ? (
            <span className="flex items-center gap-1">
              ANALYZING
              <span className="animate-pulse">...</span>
            </span>
          ) : (
            "ANALYZE"
          )}
        </button>
      </form>

      {/* Presets */}
      <div className="mt-6">
        <p className="font-mono text-[10px] text-txt-muted tracking-[0.18em] uppercase mb-3">
          Or try one of these
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePreset(preset)}
              disabled={isLoading}
              className="group/preset flex items-center gap-2 px-4 py-3 border border-border-faint
                bg-transparent text-txt-secondary font-mono text-xs
                hover:border-border-accent hover:bg-bg-elevated
                transition-all duration-200
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>{preset.label}</span>
              <span className="text-txt-muted group-hover/preset:text-accent-primary group-hover/preset:translate-x-1 transition-all duration-200">
                {"\u2197"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
