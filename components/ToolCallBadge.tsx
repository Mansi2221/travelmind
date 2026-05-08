"use client";

const TOOL_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  search_flights: {
    label: "Flight Search",
    icon: "\u2708",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  search_hotels: {
    label: "Hotel Search",
    icon: "\u{1F3E8}",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  check_visa_requirements: {
    label: "Visa Check",
    icon: "\u{1F4C4}",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  },
  check_weather: {
    label: "Weather Check",
    icon: "\u2600\uFE0F",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  search_activities: {
    label: "Activity Search",
    icon: "\u{1F3AF}",
    color: "text-green-400 border-green-500/30 bg-green-500/10",
  },
};

interface ToolCallBadgeProps {
  tool: string;
  status: "running" | "complete";
}

export default function ToolCallBadge({ tool, status }: ToolCallBadgeProps) {
  const config = TOOL_CONFIG[tool] || {
    label: tool,
    icon: "\u{1F527}",
    color: "text-gray-400 border-gray-500/30 bg-gray-500/10",
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${config.color} animate-fade-in`}
    >
      <span className="text-base">{config.icon}</span>
      <span className="font-mono text-sm font-medium">{config.label}</span>
      {status === "running" ? (
        <span className="flex items-center gap-1 ml-auto">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400 font-mono">searching...</span>
        </span>
      ) : (
        <span className="flex items-center gap-1 ml-auto">
          <span className="text-green-400 text-sm">{"\u2713"}</span>
          <span className="text-xs text-green-400 font-mono">complete</span>
        </span>
      )}
    </div>
  );
}
