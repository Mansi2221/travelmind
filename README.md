# TravelMind — AI Travel Intelligence Agent

<div align="center">

**An autonomous AI agent that researches flights, hotels, weather, visa requirements, and local activities — then synthesizes a complete travel briefing in under 10 seconds.**

[Live Demo](https://travelmind-ten.vercel.app) · [Report Bug](https://github.com/Mansi2221/travelmind/issues) · [Request Feature](https://github.com/Mansi2221/travelmind/issues)

</div>

---

## What It Does

Type a natural language travel query like:

> *"New York to Tokyo, October, 7 days, $2000 budget"*

The AI agent autonomously:

1. **Searches real-time flight prices** across travel sites
2. **Discovers hotels** filtered by your budget and style
3. **Checks weather patterns** for your travel dates
4. **Validates visa requirements** for your nationality
5. **Curates activities & hidden gems** at your destination
6. **Synthesizes everything** into a structured intelligence briefing

All five data sources are searched **in parallel**, and the complete report is generated in **under 10 seconds**.

---

## Live Demo

**[https://travelmind-ten.vercel.app](https://travelmind-ten.vercel.app)**

---

## Architecture

```
USER QUERY
    ↓
┌─────────────────────────────┐
│  PARALLEL TOOL EXECUTION    │
│                             │
│  ✈ Flights    (Tavily)      │
│  ⌂ Hotels     (Tavily)      │──→ All 5 searches run simultaneously
│  ☁ Weather    (Tavily)      │
│  ⌇ Visa       (Tavily)      │
│  ◎ Activities  (Tavily)     │
└─────────────┬───────────────┘
              ↓
┌─────────────────────────────┐
│  LLM SYNTHESIS              │
│  (Llama 4 Scout via Groq)   │──→ Single call, structured JSON output
└─────────────┬───────────────┘
              ↓
      STRUCTURED REPORT (JSON)
```

**Why this architecture?**

- **Parallel execution** — 5 web searches run simultaneously instead of sequentially, cutting latency by 5x
- **Single LLM call** — All tool results are synthesized in one pass, avoiding multiple round-trips
- **Structured output** — The agent returns typed JSON, directly consumable by downstream systems
- **Real-time data** — Every search hits the live web via Tavily, not stale training data

---

## Tech Stack

| Layer | Technology | Role |
|-------|-----------|------|
| **Framework** | Next.js 14 (App Router) | Server-side rendering, API routes, SSE streaming |
| **LLM** | Llama 4 Scout 17B via Groq | Ultra-fast inference (~800 tokens/sec) |
| **Search** | Tavily Search API | Real-time web intelligence (1000 free searches/month) |
| **Streaming** | Server-Sent Events (SSE) | Live agent activity + token streaming to browser |
| **Styling** | Tailwind CSS | Utility-first, responsive design system |
| **Deployment** | Vercel | Edge deployment, serverless functions |

**Total monthly cost: $0** — All services used on free tier.

---

## Features

- **5 Autonomous Tool Calls** — Flight pricing, hotel discovery, visa detection, weather forecasting, activity curation
- **Parallel Execution** — All searches run simultaneously for sub-10s response times
- **Live Agent Activity Stream** — Watch each tool fire in real-time with SSE streaming
- **Structured JSON Output** — 20+ typed fields, directly consumable by booking flows or CRMs
- **Magazine-Style Report UI** — Editorial layout with destination hero, flight cards, visa alerts, insider tips
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Atmospheric UI** — Aurora gradients, grid backgrounds, Fraunces serif typography
- **Multi-Section Product Page** — Hero, live demo, architecture diagram, feature grid, comparison table, CTA

---

## Project Structure

```
travelmind/
├── app/
│   ├── page.tsx                    ← Multi-section product page
│   ├── layout.tsx                  ← Root layout with SEO + JSON-LD
│   ├── globals.css                 ← Design system variables + effects
│   └── api/agent/
│       └── route.ts                ← SSE streaming endpoint
├── lib/
│   ├── agent.ts                    ← Parallel tool execution + LLM synthesis
│   ├── tools.ts                    ← 5 Tavily-powered search tools
│   └── prompts.ts                  ← System prompt for structured output
├── components/
│   ├── Navbar.tsx                  ← Sticky nav with active section detection
│   ├── HeroSection.tsx             ← Editorial hero with Fraunces typography
│   ├── DemoSection.tsx             ← Live interactive agent demo
│   ├── AgentStream.tsx             ← Real-time tool call visualization
│   ├── QueryInput.tsx              ← Search input with preset queries
│   ├── ReportDisplay.tsx           ← Magazine-style report cards
│   ├── HowItWorksSection.tsx       ← Architecture explanation
│   ├── ArchitectureDiagram.tsx     ← Custom SVG flow diagram
│   ├── FeatureGrid.tsx             ← 6 capability cards
│   ├── StackSection.tsx            ← Tech stack showcase
│   ├── UseCasesSection.tsx         ← Consumer/B2B/Enterprise use cases
│   ├── ComparisonTable.tsx         ← vs ChatGPT/Google/OTAs
│   ├── MetricsSection.tsx          ← Animated stat counters
│   ├── CTASection.tsx              ← Closing pitch + contact links
│   ├── Footer.tsx                  ← Full footer with live UTC clock
│   ├── AtmosphericBg.tsx           ← Aurora + grid + noise effects
│   ├── ScrollProgress.tsx          ← Reading progress bar
│   ├── SectionDivider.tsx          ← Boarding pass-style dividers
│   └── Header.tsx                  ← Legacy header component
├── hooks/
│   ├── useIntersectionObserver.ts  ← Scroll-triggered animations
│   └── useCountUp.ts              ← Animated number counters
├── vercel.json                     ← maxDuration: 60 for agent
├── .env.local.example              ← API keys template
└── DEPLOYMENT.md                   ← Setup instructions
```

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Mansi2221/travelmind.git
cd travelmind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up API keys (both free)

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your keys:

| Key | Where to get it | Free tier |
|-----|----------------|-----------|
| `GROQ_API_KEY` | [console.groq.com/keys](https://console.groq.com/keys) | 14,400 requests/day |
| `TAVILY_API_KEY` | [tavily.com](https://tavily.com) | 1,000 searches/month |

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

```bash
npx vercel --prod
```

Add `GROQ_API_KEY` and `TAVILY_API_KEY` in Vercel Dashboard → Settings → Environment Variables.

---

## How It Works

### 1. User Input
The user types a natural language travel query. The system parses origin, destination, month, and budget.

### 2. Parallel Search (Tavily)
Five web searches execute simultaneously via `Promise.all()`:
- Flight prices and deals
- Hotel recommendations within budget
- Weather patterns and packing tips
- Visa requirements by nationality
- Activities, hidden gems, and local tips

### 3. LLM Synthesis (Groq)
All search results are passed to Llama 4 Scout 17B in a single prompt. The model synthesizes findings into a structured JSON report with 20+ fields.

### 4. SSE Streaming
Results stream to the browser via Server-Sent Events:
- Tool start/end events update the Agent Activity panel in real-time
- LLM tokens stream character-by-character
- The final JSON report triggers the magazine-style report display

---

## Comparison

| Feature | TravelMind | ChatGPT | Google Travel | Traditional OTA |
|---------|-----------|---------|---------------|-----------------|
| Real-time prices | ✅ | ❌ | ✅ | ✅ |
| Multi-source synthesis | ✅ | ❌ | ❌ | ❌ |
| Visa intelligence | ✅ | Partial | ❌ | ❌ |
| Structured JSON output | ✅ | ❌ | ❌ | ❌ |
| Sub-60s end-to-end | ✅ | Partial | ✅ | ✅ |
| Open source | ✅ | ❌ | ❌ | ❌ |

---

## Performance

| Metric | Value |
|--------|-------|
| End-to-end latency | ~5-10 seconds |
| Parallel tool calls | 5 simultaneous |
| Sources analyzed per scan | ~15 web pages |
| Structured output fields | 20+ |
| Monthly infrastructure cost | $0 |

---

## Use Cases

- **Consumer Apps** — Pre-purchase travel intelligence to reduce booking abandonment
- **Travel Agent Tooling** — 60-second briefings replacing 20 minutes of manual research
- **Enterprise** — Pre-validate trips against visa requirements and budget constraints

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Groq API key for LLM inference |
| `TAVILY_API_KEY` | Yes | Tavily API key for web search |

---

## License

MIT

---

## Author

**Mansi Patil**

- GitHub: [@Mansi2221](https://github.com/Mansi2221)
- LinkedIn: [mansi2221](https://www.linkedin.com/in/mansi2221/)

---

<div align="center">

Built with Next.js · LangGraph · Groq · Tavily · Vercel

**[Try the Live Demo →](https://travelmind-ten.vercel.app)**

</div>
