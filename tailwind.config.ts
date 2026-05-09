import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#06080d",
          canvas: "#0a0e16",
          elevated: "#11151f",
        },
        border: {
          faint: "rgba(148, 163, 184, 0.08)",
          default: "rgba(148, 163, 184, 0.14)",
          strong: "rgba(148, 163, 184, 0.24)",
          accent: "rgba(99, 179, 255, 0.4)",
        },
        accent: {
          primary: "#63b3ff",
          glow: "#63b3ff40",
          warm: "#fbbf24",
          success: "#34d399",
          alert: "#f87171",
        },
        txt: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          tertiary: "#94a3b8",
          muted: "#475569",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter Tight", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "spin-slow": "spin 2s linear infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "aurora-1": "aurora1 60s linear infinite",
        "aurora-2": "aurora2 80s linear infinite",
        "progress-bar": "progressBar 45s ease-out forwards",
        "typewriter-cursor": "blink 1s step-end infinite",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        aurora1: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        aurora2: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        progressBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
