"use client";

import { useState } from "react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const PRESETS = [
  "New York to Tokyo, October, 7 days, $2000 budget",
  "London to Bali, December, 10 days, $1500 budget",
  "San Francisco to Barcelona, June, 5 days, $3000 budget",
];

export default function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  const handlePreset = (preset: string) => {
    if (!isLoading) {
      setQuery(preset);
      onSubmit(preset);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Where do you want to go? e.g. 'NYC to Tokyo, October, 7 days, $2000'"
          disabled={isLoading}
          className="w-full px-5 py-4 pr-32 bg-dark-700 border border-gray-600/50 rounded-xl text-gray-100
            font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50
            focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-blue-600 hover:bg-blue-500
            text-white font-heading font-semibold text-sm rounded-lg transition-all
            disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Scanning
            </span>
          ) : (
            "Analyze"
          )}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePreset(preset)}
            disabled={isLoading}
            className="px-3 py-1.5 text-xs font-mono text-gray-400 bg-dark-700/50 border border-gray-700/50
              rounded-lg hover:border-blue-500/30 hover:text-gray-300 transition-all
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
