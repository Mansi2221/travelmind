"use client";

export default function ArchitectureDiagram() {
  return (
    <div className="relative max-w-[700px] mx-auto py-8">
      <svg viewBox="0 0 700 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Glow filter for animated dots */}
        <defs>
          <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* User Query Box */}
        <rect x="250" y="10" width="200" height="44" rx="4" fill="#11151f" stroke="#63b3ff" strokeWidth="1" strokeOpacity="0.4"
          className="hover:stroke-[#63b3ff] hover:stroke-opacity-80 transition-all" />
        <text x="350" y="37" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono, monospace">USER QUERY</text>

        {/* Arrow down: query → agent */}
        <path id="path-query-agent" d="M 350 54 L 350 96" stroke="#63b3ff" strokeWidth="1" strokeOpacity="0.5" />
        <polygon points="345,88 350,96 355,88" fill="#63b3ff" fillOpacity="0.5" />
        <circle r="3" fill="#63b3ff" filter="url(#dotGlow)">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
            <mpath xlinkHref="#path-query-agent" />
          </animateMotion>
        </circle>

        {/* Agent Node */}
        <rect x="200" y="96" width="300" height="64" rx="4" fill="#11151f" stroke="#63b3ff" strokeWidth="1.5" strokeOpacity="0.6"
          className="hover:stroke-opacity-100 transition-all" />
        <text x="350" y="122" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="JetBrains Mono, monospace" fontWeight="600">AGENT NODE</text>
        <text x="350" y="142" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="JetBrains Mono, monospace">LLM reasoning + tool selection</text>

        {/* Conditional Edge Label */}
        <text x="350" y="180" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="JetBrains Mono, monospace">conditional edge</text>

        {/* Arrow down: agent → tools */}
        <path id="path-agent-tools" d="M 350 186 L 350 216" stroke="#63b3ff" strokeWidth="1" strokeOpacity="0.5" />
        <polygon points="345,208 350,216 355,208" fill="#63b3ff" fillOpacity="0.5" />
        <circle r="3" fill="#63b3ff" filter="url(#dotGlow)">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.3s">
            <mpath xlinkHref="#path-agent-tools" />
          </animateMotion>
        </circle>

        {/* Tool Node */}
        <rect x="200" y="216" width="300" height="50" rx="4" fill="#11151f" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.3"
          className="hover:stroke-[#63b3ff] hover:stroke-opacity-60 transition-all" />
        <text x="350" y="245" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="JetBrains Mono, monospace">TOOL NODE</text>

        {/* Fan out arrows with animated dots */}
        {[0, 1, 2, 3, 4].map((i) => {
          const startX = 250 + i * 50;
          const endX = 90 + i * 130;
          const endY = 330;
          const pathId = `path-fan-${i}`;
          return (
            <g key={i}>
              <path id={pathId} d={`M ${startX} 266 L ${endX} ${endY}`} stroke="#63b3ff" strokeWidth="1" strokeOpacity="0.3" />
              <circle cx={endX} cy={endY} r="3" fill="#63b3ff" fillOpacity="0.4" />
              <circle r="2.5" fill="#63b3ff" filter="url(#dotGlow)">
                <animateMotion dur="2s" repeatCount="indefinite" begin={`${0.6 + i * 0.3}s`}>
                  <mpath xlinkHref={`#path-fan-${i}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* 5 Tool boxes */}
        {[
          { x: 40, icon: "\u2708", label: "Flights", color: "#63b3ff" },
          { x: 170, icon: "\u2302", label: "Hotels", color: "#a855f7" },
          { x: 300, icon: "\u2601", label: "Weather", color: "#06b6d4" },
          { x: 430, icon: "\u2637", label: "Visa", color: "#f87171" },
          { x: 560, icon: "\u25CE", label: "Activities", color: "#fbbf24" },
        ].map((tool) => (
          <g key={tool.label}>
            <rect x={tool.x} y="340" width="100" height="50" rx="4" fill="#11151f"
              stroke={tool.color} strokeWidth="1" strokeOpacity="0.4"
              className="hover:stroke-opacity-80 transition-all" />
            <text x={tool.x + 50} y="362" textAnchor="middle" fill={tool.color} fontSize="14">
              {tool.icon}
            </text>
            <text x={tool.x + 50} y="380" textAnchor="middle" fill="#94a3b8" fontSize="9"
              fontFamily="JetBrains Mono, monospace">{tool.label}</text>
          </g>
        ))}

        {/* Loop back arrow */}
        <path id="path-loop" d="M 650 365 Q 680 365 680 250 Q 680 130 520 128"
          stroke="#63b3ff" strokeWidth="1" strokeOpacity="0.3" fill="none" strokeDasharray="4 4" />
        <polygon points="522,124 516,128 522,132" fill="#63b3ff" fillOpacity="0.4" />
        <text x="690" y="250" fill="#475569" fontSize="9" fontFamily="JetBrains Mono, monospace"
          transform="rotate(90, 690, 250)" textAnchor="middle">loop until done</text>
        <circle r="2.5" fill="#63b3ff" fillOpacity="0.6" filter="url(#dotGlow)">
          <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
            <mpath xlinkHref="#path-loop" />
          </animateMotion>
        </circle>

        {/* Arrow to output */}
        <path id="path-output" d="M 350 390 L 350 446" stroke="#34d399" strokeWidth="1" strokeOpacity="0.5" />
        <polygon points="345,438 350,446 355,438" fill="#34d399" fillOpacity="0.5" />
        <circle r="3" fill="#34d399" filter="url(#dotGlow)">
          <animateMotion dur="2s" repeatCount="indefinite" begin="2.5s">
            <mpath xlinkHref="#path-output" />
          </animateMotion>
        </circle>

        {/* Output box */}
        <rect x="220" y="450" width="260" height="50" rx="4" fill="#11151f"
          stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.5"
          className="hover:stroke-opacity-80 transition-all" />
        <text x="350" y="480" textAnchor="middle" fill="#34d399" fontSize="12"
          fontFamily="JetBrains Mono, monospace" fontWeight="600">STRUCTURED REPORT (JSON)</text>
      </svg>
    </div>
  );
}
