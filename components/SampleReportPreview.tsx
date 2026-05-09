"use client";

import { useState } from "react";
import ReportDisplay from "@/components/ReportDisplay";

const SAMPLE_REPORT = {
  destination: "Tokyo, Japan",
  travel_month: "October 2025",
  duration_days: 7,
  total_budget_estimate: "$1,500 - $2,000",
  flight_summary:
    "Flights from New York to Tokyo can be found for around $414-$2000, with multiple airlines offering layovers or non-stop options through JFK and Haneda.",
  flight_price_range: "$414 - $2,000",
  best_flight_tip:
    "Book Tuesday departures to save up to 35% versus weekend pricing.",
  hotel_summary:
    "Tokyo offers everything from budget capsule hotels at $29/night to luxury options like the Palace Hotel Tokyo at $300+/night. Mid-range boutique stays in Shibuya average $134.",
  hotel_price_range: "$29 - $300 per night",
  best_hotel_tip:
    "Stay near a JR Yamanote line station — saves hours on transit over the trip.",
  weather_summary:
    "October is one of Tokyo's best months: mild temperatures around 15-22°C, low rainfall, and the early stages of autumn foliage.",
  weather_rating: "Excellent",
  packing_tip:
    "Layered light clothing — mornings are cool, afternoons warm. A light rain jacket for unexpected showers.",
  visa_summary:
    "US passport holders can enter Japan visa-free for stays up to 90 days for tourism purposes. No advance application required.",
  visa_required: false,
  visa_processing_days: null,
  top_activities: [
    "Tsukiji Outer Market early morning food crawl",
    "TeamLab Planets immersive digital art experience",
    "Day trip to Hakone for hot springs and Mt. Fuji views",
    "Shimokitazawa neighborhood vintage shopping + jazz cafés",
    "Cooking class with a local chef in a private home",
  ],
  hidden_gem:
    "Skip the famous Shibuya Crossing photo and take the elevator inside Magnet by Shibuya109 instead — same view, no crowds, free observation deck most tourists don't know exists.",
  insider_tip:
    "Skip the famous Shibuya Crossing photo and take the elevator inside Magnet by Shibuya109 instead — same view, no crowds, free observation deck most tourists don't know exists.",
  safety_rating: "Very Safe",
  best_time_to_book: "8-12 weeks in advance for best fares",
  overall_recommendation:
    "October is the ideal window for first-time Tokyo visitors — perfect weather, no visa hassle, and ¥-USD favorable for American travelers. With the budget given, you can comfortably afford boutique accommodation and several premium experiences without compromise.",
};

export default function SampleReportPreview() {
  const [expanded, setExpanded] = useState(false);

  const focusInput = () => {
    const input = document.querySelector<HTMLInputElement>(
      'input[aria-label="Travel query input"]'
    );
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => input.focus(), 400);
    }
  };

  return (
    <div className="mt-8">
      {/* Accordion toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 border border-border-faint
          bg-bg-elevated hover:border-border-accent transition-all duration-200 group"
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-accent-primary text-xs transition-transform duration-200 ${
              expanded ? "rotate-90" : ""
            }`}
          >
            {"\u25B8"}
          </span>
          <span className="font-mono text-[11px] text-txt-tertiary tracking-[0.12em] uppercase">
            PREVIEW: See a completed Tokyo briefing
          </span>
        </div>
        <span className="font-mono text-[10px] text-txt-muted group-hover:text-accent-primary transition-colors">
          {expanded ? "collapse" : "click here"}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="relative mt-4">
          {/* Banner */}
          <div className="flex items-center justify-between px-4 py-2.5 border border-border-faint bg-bg-canvas mb-4">
            <p className="font-mono text-[10px] text-txt-tertiary tracking-wider uppercase">
              {"\u2193"} This is a pre-cached sample. The live agent generates
              this from real web searches in under 60 seconds.
            </p>
            <button
              onClick={focusInput}
              className="font-mono text-[10px] text-accent-primary tracking-wider uppercase hover:underline shrink-0 ml-4"
            >
              {"\u25B8"} Try it yourself
            </button>
          </div>

          {/* SAMPLE watermark */}
          <div className="relative">
            <div className="absolute top-4 right-4 z-10 font-mono text-[11px] text-txt-muted/40 tracking-[0.2em] uppercase pointer-events-none">
              SAMPLE
            </div>
            <ReportDisplay report={SAMPLE_REPORT} />
          </div>
        </div>
      )}
    </div>
  );
}
