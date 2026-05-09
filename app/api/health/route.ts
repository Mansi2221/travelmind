export async function GET() {
  const checks = {
    groq: !!process.env.GROQ_API_KEY,
    tavily: !!process.env.TAVILY_API_KEY,
    timestamp: new Date().toISOString(),
  };
  const allHealthy = checks.groq && checks.tavily;
  return Response.json({
    status: allHealthy ? "operational" : "degraded",
    checks,
  });
}
