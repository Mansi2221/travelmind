# TravelMind — Deployment Guide

## Prerequisites

- Node.js 18+
- npm

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local

# 3. Add your API keys to .env.local
#    - GROQ_API_KEY: free at https://console.groq.com/keys
#    - TAVILY_API_KEY: free at https://tavily.com

# 4. Start dev server
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

### Option A: CLI

```bash
npx vercel --prod
```

Then add environment variables in Vercel Dashboard → Settings → Environment Variables:
- `GROQ_API_KEY`
- `TAVILY_API_KEY`

### Option B: GitHub Integration

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables during setup
5. Deploy

## Live Demo

https://travelmind-ten.vercel.app
