# TravelMind - AI Travel Intelligence Agent

An AI-powered travel planning agent that autonomously researches flights, hotels, weather, visa requirements, and activities to build a comprehensive travel intelligence report.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **LLM:** Google Gemini 2.0 Flash
- **Agent Framework:** LangGraph.js
- **Search:** Tavily Search API
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (free tier)

## Features
- Natural language travel queries
- Real-time agent activity streaming (SSE)
- 5 autonomous tool calls (flights, hotels, weather, visa, activities)
- Structured travel intelligence report
- Dark, premium UI
- Mobile responsive

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add your GOOGLE_API_KEY and TAVILY_API_KEY
npm run dev
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup instructions.

## API Keys (Free)
- **Gemini:** https://aistudio.google.com
- **Tavily:** https://tavily.com (1000 free searches/month)
