import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { tavily } from "@tavily/core";
import { TRAVELMIND_SYSTEM_PROMPT } from "./prompts";

function getModel() {
  return new ChatOpenAI({
    modelName: "meta-llama/llama-4-scout-17b-16e-instruct",
    openAIApiKey: process.env.GROQ_API_KEY,
    temperature: 0,
    streaming: true,
    configuration: {
      baseURL: "https://api.groq.com/openai/v1",
    },
  });
}

function getTavilyClient() {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) throw new Error("TAVILY_API_KEY is not set");
  return tavily({ apiKey });
}

async function tavilySearch(query: string): Promise<string> {
  try {
    const client = getTavilyClient();
    const response = await client.search(query, { maxResults: 3 });
    return response.results
      .map((r: { title: string; content: string }) => `${r.title}: ${r.content.slice(0, 300)}`)
      .join("\n");
  } catch (error) {
    return `Search error: ${error instanceof Error ? error.message : "failed"}`;
  }
}

interface ToolSearch {
  name: string;
  query: string;
}

function buildSearches(userQuery: string): ToolSearch[] {
  // Parse basic info from the query
  const q = userQuery.toLowerCase();

  // Extract origin/destination heuristically
  const parts = userQuery.split(/,|\bto\b/i).map((s) => s.trim());
  const origin = parts[0] || "origin";
  const destination = parts[1] || parts[0] || "destination";

  // Extract month
  const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  const foundMonth = months.find((m) => q.includes(m)) || "upcoming";

  return [
    { name: "search_flights", query: `${origin} to ${destination} flight prices ${foundMonth} 2025 best deals` },
    { name: "search_hotels", query: `best hotels ${destination} ${foundMonth} affordable ratings reviews` },
    { name: "check_weather", query: `${destination} weather ${foundMonth} temperature what to pack` },
    { name: "check_visa_requirements", query: `visa requirements for American citizens visiting ${destination}` },
    { name: "search_activities", query: `best things to do ${destination} hidden gems culture food 2025` },
  ];
}

export interface AgentEvent {
  type: "tool_start" | "tool_end" | "token" | "report" | "done" | "error";
  tool?: string;
  input?: string;
  content?: string;
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export async function runAgent(
  userQuery: string,
  onEvent: (event: AgentEvent) => void
) {
  try {
    const searches = buildSearches(userQuery);

    // Run ALL 5 searches in parallel
    const searchPromises = searches.map(async (search) => {
      onEvent({ type: "tool_start", tool: search.name, input: JSON.stringify({ query: search.query }) });
      const result = await tavilySearch(search.query);
      onEvent({ type: "tool_end", tool: search.name });
      return { name: search.name, result };
    });

    const results = await Promise.all(searchPromises);

    // Build context from all results
    const context = results
      .map((r) => `=== ${r.name.toUpperCase()} ===\n${r.result}`)
      .join("\n\n");

    // Single LLM call to synthesize
    const model = getModel();
    const response = await model.stream([
      new SystemMessage(TRAVELMIND_SYSTEM_PROMPT),
      new HumanMessage(
        `User query: "${userQuery}"\n\nHere are the research results from all 5 tools:\n\n${context}\n\nNow synthesize these into the structured JSON report as specified.`
      ),
    ]);

    let fullContent = "";
    for await (const chunk of response) {
      const text = typeof chunk.content === "string" ? chunk.content : "";
      if (text) {
        onEvent({ type: "token", content: text });
        fullContent += text;
      }
    }

    // Parse report
    if (fullContent) {
      try {
        let cleaned = fullContent.trim();
        if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
        }
        const report = JSON.parse(cleaned);
        onEvent({ type: "report", data: report });
      } catch {
        onEvent({ type: "token", content: "\n[Report parsing complete]" });
      }
    }

    onEvent({ type: "done" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Agent failed";
    onEvent({ type: "error", message });
    onEvent({ type: "done" });
  }
}
