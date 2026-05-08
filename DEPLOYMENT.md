# TravelMind - Deployment Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn

## 1. Install Dependencies
```bash
npm install
```

## 2. Get Your Free API Keys

### Gemini API Key (Free)
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key" -> "Create API Key"
4. Copy the key

### Tavily API Key (Free - 1000 searches/month)
1. Go to https://tavily.com
2. Sign up for a free account
3. Go to Dashboard -> API Keys
4. Copy your API key

## 3. Set Up Environment
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and paste your API keys:
```
GOOGLE_API_KEY=your_gemini_key_here
TAVILY_API_KEY=your_tavily_key_here
```

## 4. Run Locally
```bash
npm run dev
```
Open http://localhost:3000

## 5. Deploy to Vercel (Free)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel deploy
```
When prompted, add your environment variables (GOOGLE_API_KEY and TAVILY_API_KEY) in the Vercel dashboard under Settings -> Environment Variables.

Alternatively, deploy via GitHub:
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables
5. Deploy!
