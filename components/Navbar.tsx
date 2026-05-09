"use client";

import { useState, useEffect } from "react";
import { useActiveSection } from "@/hooks/useIntersectionObserver";

const NAV_LINKS = [
  { label: "DEMO", href: "#demo" },
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "FEATURES", href: "#features" },
  { label: "STACK", href: "#stack" },
];

const SECTION_IDS = ["demo", "how-it-works", "features", "stack"];

function CompassSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-accent-primary" aria-label="TravelMind logo">
      <polygon points="12 2 15 10 12 8 9 10" />
      <polygon points="12 22 9 14 12 16 15 14" />
      <polygon points="2 12 10 9 8 12 10 15" />
      <polygon points="22 12 14 15 16 12 14 9" />
      <circle cx="12" cy="12" r="3" strokeWidth="1" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-bg-base/90 border-b border-border-default backdrop-blur-xl"
          : "bg-bg-base/60 border-b border-border-faint backdrop-blur-xl"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Left — brand */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
          <CompassSvg />
          <span className="text-txt-primary font-body font-semibold text-[15px] tracking-[0.04em]">
            TRAVELMIND
          </span>
        </button>

        {/* Center — nav links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`relative font-mono text-[12px] tracking-[0.12em] transition-colors duration-200
                ${active === link.href.slice(1) ? "text-txt-primary" : "text-txt-tertiary hover:text-txt-secondary"}`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[1px] bg-accent-primary transition-all duration-300
                  ${active === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Mansi2221/travelmind"
            target="_blank"
            rel="noopener noreferrer"
            className="text-txt-tertiary hover:text-txt-primary transition-colors p-2"
            aria-label="GitHub repository"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={() => handleNavClick("#demo")}
            className="hidden sm:block px-4 py-2 bg-accent-primary text-bg-base font-body font-semibold
              text-[11px] uppercase tracking-[0.15em] hover:brightness-110 transition-all"
          >
            Try Demo
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-txt-tertiary"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-base/95 backdrop-blur-xl border-b border-border-default px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left font-mono text-[12px] text-txt-tertiary tracking-[0.12em] py-2
                hover:text-txt-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
