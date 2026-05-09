"use client";

import { useEffect, useState } from "react";

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

interface ReportDisplayProps {
  report: TravelReport;
}

function ScanId() {
  const id = `TM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  return (
    <span className="font-mono text-[10px] text-txt-muted tracking-wider">
      REF: {id}
    </span>
  );
}

function BoardingDivider({ label }: { label?: string }) {
  return (
    <div className="relative my-8">
      <div className="boarding-divider" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-canvas px-4">
        <span className="text-txt-muted text-xs">{"\u25C7"}</span>
      </div>
      {label && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-bg-canvas pr-3">
          <span className="font-mono text-[10px] text-txt-muted tracking-[0.15em] uppercase">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

function ConfidenceDots({ level = 3 }: { level?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Confidence: ${level} of 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`w-1 h-1 rounded-full ${
            i <= level ? "bg-accent-primary" : "bg-txt-muted/30"
          }`}
        />
      ))}
    </div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  return <span>{display}</span>;
}

export default function ReportDisplay({ report }: ReportDisplayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const weatherConfig =
    report.weather_rating === "Great" || report.weather_rating === "Excellent"
      ? { icon: "\u{1F31F}", color: "text-accent-success", bg: "bg-accent-success/5" }
      : report.weather_rating === "Good"
        ? { icon: "\u2600\uFE0F", color: "text-accent-primary", bg: "bg-accent-primary/5" }
        : report.weather_rating === "Fair"
          ? { icon: "\u26C5", color: "text-accent-warm", bg: "bg-accent-warm/5" }
          : { icon: "\u2614", color: "text-accent-alert", bg: "bg-accent-alert/5" };

  const destParts = report.destination.split(",");
  const city = destParts[0]?.trim() || report.destination;
  const country = destParts[1]?.trim() || "";

  return (
    <div className="space-y-4">
      <BoardingDivider label="Briefing Start" />

      {/* CARD 1 — Destination Hero */}
      <div
        className="p-6 md:p-8 bg-gradient-to-br from-bg-elevated to-bg-canvas border border-border-default
          border-l-[3px] border-l-accent-primary relative overflow-hidden
          opacity-0 animate-fade-up stagger-1"
      >
        <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(99,179,255,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <p className="font-mono text-[10px] text-txt-muted tracking-[0.15em] uppercase">
                Destination Analysis &middot; Scan Complete
              </p>
              <ConfidenceDots level={4} />
            </div>
            <div className="w-6 h-[2px] bg-accent-primary mb-4" />

            <h2 className="font-display text-4xl md:text-[56px] leading-[0.95] tracking-[-0.04em] text-txt-primary mb-1">
              {city}
              {country && <span className="italic text-accent-primary">, {country}</span>}
            </h2>

            <p className="font-mono text-xs text-txt-tertiary mt-3 tracking-wider uppercase">
              {report.travel_month} &middot; 7 Nights
            </p>

            <p className="mt-4 text-sm text-txt-secondary leading-relaxed max-w-md">
              {report.overall_recommendation.split(".")[0]}.
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-mono text-[10px] text-txt-muted tracking-[0.15em] uppercase mb-2">
              Est. Total Budget
            </p>
            <p className="font-mono text-4xl md:text-5xl text-accent-primary leading-none">
              <AnimatedNumber value={report.total_budget_estimate} />
            </p>
            <p className="font-mono text-[10px] text-txt-muted mt-2 tracking-wider uppercase">
              Flights + Hotels + Activities
            </p>
            <ScanId />
          </div>
        </div>
      </div>

      {/* CARDS 2+3 — Flights + Visa */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
        {/* Flights */}
        <div className="p-5 bg-bg-elevated border border-border-faint hover:border-border-accent
          transition-all duration-200 hover:-translate-y-[1px]
          opacity-0 animate-fade-up stagger-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">{"\u2708\uFE0F"}</span>
              <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.15em] uppercase">
                Flights
              </span>
            </div>
            <ConfidenceDots level={3} />
          </div>
          <p className="text-sm text-txt-secondary leading-relaxed mb-4">
            {report.flight_summary}
          </p>
          <p className="font-mono text-2xl text-txt-primary">
            {report.flight_price_range}
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-txt-muted font-mono text-[11px]">
            <span className="text-accent-primary">{"\u25B8"}</span>
            View airline breakdown
          </div>
        </div>

        {/* Visa */}
        <div
          className={`p-5 border transition-all duration-200 hover:-translate-y-[1px]
            opacity-0 animate-fade-up stagger-3 ${
            report.visa_required
              ? "bg-accent-alert/[0.03] border-border-faint border-l-[3px] border-l-accent-alert"
              : "bg-accent-success/[0.03] border-border-faint border-l-[3px] border-l-accent-success"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {report.visa_required ? (
              <>
                <span className="text-accent-alert text-lg">{"\u26A0"}</span>
                <span className="font-mono text-[11px] text-accent-alert tracking-[0.15em] uppercase font-semibold">
                  Visa Required
                </span>
              </>
            ) : (
              <>
                <span className="text-accent-success text-lg">{"\u2713"}</span>
                <span className="font-mono text-[11px] text-accent-success tracking-[0.15em] uppercase font-semibold">
                  Visa-Free Travel
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-txt-secondary leading-relaxed mb-3">
            {report.visa_summary}
          </p>
          <p className={`font-mono text-xs font-medium ${
            report.visa_required ? "text-accent-alert" : "text-accent-success"
          }`}>
            {report.visa_required
              ? "\u25B8 START APPLICATION"
              : "\u2713 READY TO BOOK"}
          </p>
        </div>
      </div>

      {/* CARDS 4+5 — Hotels + Weather */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
        {/* Hotels */}
        <div className="p-5 bg-bg-elevated border border-border-faint hover:border-border-accent
          transition-all duration-200 hover:-translate-y-[1px]
          opacity-0 animate-fade-up stagger-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">{"\u{1F3E8}"}</span>
              <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.15em] uppercase">
                Accommodation
              </span>
            </div>
            <ConfidenceDots level={3} />
          </div>
          <p className="text-sm text-txt-secondary leading-relaxed mb-4">
            {report.hotel_summary}
          </p>
          <p className="font-mono text-2xl text-txt-primary">
            {report.hotel_price_range}
          </p>
        </div>

        {/* Weather */}
        <div
          className={`p-5 border border-border-faint ${weatherConfig.bg}
            hover:border-border-accent transition-all duration-200 hover:-translate-y-[1px]
            opacity-0 animate-fade-up stagger-4`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{weatherConfig.icon}</span>
            <span className={`font-mono text-[11px] tracking-[0.15em] uppercase font-semibold ${weatherConfig.color}`}>
              {report.weather_rating}
            </span>
          </div>
          <p className="text-sm text-txt-secondary leading-relaxed">
            {report.weather_summary}
          </p>
        </div>
      </div>

      {/* CARD 6 — Activities */}
      <div className="p-5 bg-bg-elevated border border-border-faint
        opacity-0 animate-fade-up stagger-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-sm">{"\u25CE"}</span>
            <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.15em] uppercase">
              5 Experiences to Book
            </span>
          </div>
          <ConfidenceDots level={4} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
          {report.top_activities.map((activity, i) => (
            <div key={i} className="group py-3 border-b border-border-faint last:border-0">
              <div className="flex items-start gap-3">
                <span className="font-mono text-lg text-accent-primary/40 leading-none shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-txt-secondary group-hover:text-txt-primary transition-colors">
                  {activity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 7 — Insider Gem */}
      <div
        className="relative p-6 md:p-8 border border-border-faint overflow-hidden
          opacity-0 animate-fade-up stagger-6"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.03) 0%, rgba(17,21,31,1) 60%)",
        }}
      >
        {/* Decorative quote mark */}
        <span
          className="absolute -top-4 -left-2 font-display text-[120px] leading-none text-accent-warm/[0.06] pointer-events-none select-none"
          aria-hidden="true"
        >
          {"\u201C"}
        </span>

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-accent-warm" />
            <p className="font-mono text-[10px] text-txt-muted tracking-[0.18em] uppercase">
              Insider Intelligence
            </p>
          </div>
          <blockquote className="font-display italic text-xl md:text-2xl text-txt-primary leading-snug max-w-2xl">
            {report.insider_tip}
          </blockquote>
          <p className="mt-4 font-mono text-[10px] text-txt-muted">
            &mdash; TravelMind Agent &middot; synthesized from live sources
          </p>
        </div>
      </div>

      {/* CARD 8 — Verdict */}
      <div className="p-5 bg-bg-elevated border border-border-faint
        opacity-0 animate-fade-up stagger-7">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-accent-success">{"\u2713"}</span>
          <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.15em] uppercase">
            Agent Verdict
          </span>
        </div>
        <p className="text-lg text-txt-secondary leading-relaxed mb-6">
          {report.overall_recommendation}
        </p>
        <div className="flex flex-wrap gap-3">
          {["\u25B8 EXPORT BRIEFING", "\u25B8 SHARE", "\u25B8 NEW SCAN"].map((cta) => (
            <button
              key={cta}
              className="px-4 py-2 border border-border-default font-mono text-[11px] text-txt-tertiary
                tracking-wider hover:border-accent-primary hover:text-accent-primary
                transition-all duration-200"
            >
              {cta}
            </button>
          ))}
        </div>
      </div>

      {/* Footer divider */}
      <BoardingDivider label="Briefing End" />
    </div>
  );
}
