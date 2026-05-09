"use client";

import { useState, useEffect } from "react";

const PRODUCT_LINKS = ["Live Demo", "Documentation", "API Reference", "Changelog"];
const STACK_LINKS = ["Next.js", "LangGraph", "Groq", "Tavily", "Vercel"];
const CONNECT_LINKS = [
  { label: "GitHub", href: "https://github.com/Mansi2221" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mansi2221/" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "mailto:mansi@example.com" },
];

function CompassSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-accent-primary">
      <polygon points="12 2 15 10 12 8 9 10" />
      <polygon points="12 22 9 14 12 16 15 14" />
      <polygon points="2 12 10 9 8 12 10 15" />
      <polygon points="22 12 14 15 16 12 14 9" />
      <circle cx="12" cy="12" r="3" strokeWidth="1" />
    </svg>
  );
}

export default function Footer() {
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const update = () => setUtcTime(new Date().toISOString().slice(11, 19) + " UTC");
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border-faint bg-bg-base">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CompassSvg />
              <span className="font-body font-semibold text-sm text-txt-primary tracking-[0.04em]">
                TRAVELMIND
              </span>
            </div>
            <p className="font-mono text-[11px] text-txt-muted leading-relaxed">
              AI Travel Intelligence Agent. Autonomous multi-step research
              powered by LangGraph and real-time web search.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="font-mono text-[10px] text-txt-muted tracking-[0.18em] uppercase mb-4">Product</p>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => link === "Live Demo" ? document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" }) : undefined}
                    className="font-mono text-[12px] text-txt-tertiary hover:text-txt-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p className="font-mono text-[10px] text-txt-muted tracking-[0.18em] uppercase mb-4">Built With</p>
            <ul className="space-y-2">
              {STACK_LINKS.map((link) => (
                <li key={link}>
                  <span className="font-mono text-[12px] text-txt-tertiary">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-[10px] text-txt-muted tracking-[0.18em] uppercase mb-4">Connect</p>
            <ul className="space-y-2">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[12px] text-txt-tertiary hover:text-txt-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-border-faint flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-txt-muted">
            &copy; 2026 TravelMind &middot; Open source under MIT
          </p>
          <p className="font-mono text-[10px] text-txt-muted">
            v1.0.0 &middot; Built in 4 days
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
            <span className="font-mono text-[10px] text-txt-muted">
              All systems operational &middot; {utcTime}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
