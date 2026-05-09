import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { tavily } from "@tavily/core";

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
      .map(
        (r: { title: string; content: string; url: string }) =>
          `${r.title}: ${r.content.slice(0, 300)}`
      )
      .join("\n");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Search failed";
    return `Search error: ${message}. Please continue with available information.`;
  }
}

export const searchFlights = new DynamicStructuredTool({
  name: "search_flights",
  description:
    "Search for real-time flight prices and deals between two cities for a specific travel month",
  schema: z.object({
    origin: z.string().describe("Origin city or airport"),
    destination: z.string().describe("Destination city or airport"),
    travel_month: z.string().describe("Month and year of travel, e.g. October 2025"),
  }),
  func: async ({ origin, destination, travel_month }) => {
    const query = `${origin} to ${destination} flight prices ${travel_month} best deals airlines`;
    return tavilySearch(query);
  },
});

export const searchHotels = new DynamicStructuredTool({
  name: "search_hotels",
  description:
    "Search for hotel recommendations and pricing for a destination within a budget",
  schema: z.object({
    destination: z.string().describe("Destination city"),
    travel_month: z.string().describe("Month and year of travel"),
    budget_per_night: z
      .number()
      .describe("Maximum budget per night in USD"),
  }),
  func: async ({ destination, travel_month, budget_per_night }) => {
    const query = `best hotels ${destination} ${travel_month} under $${budget_per_night} per night ratings reviews`;
    return tavilySearch(query);
  },
});

export const checkVisaRequirements = new DynamicStructuredTool({
  name: "check_visa_requirements",
  description:
    "Check visa requirements for a specific nationality visiting a destination country",
  schema: z.object({
    nationality: z.string().describe("Traveler nationality, e.g. American"),
    destination_country: z.string().describe("Destination country"),
  }),
  func: async ({ nationality, destination_country }) => {
    const query = `visa requirements for ${nationality} citizens visiting ${destination_country} 2025 processing time`;
    return tavilySearch(query);
  },
});

export const checkWeather = new DynamicStructuredTool({
  name: "check_weather",
  description:
    "Check weather forecast and conditions for a destination during a specific month",
  schema: z.object({
    destination: z.string().describe("Destination city"),
    travel_month: z.string().describe("Month of travel"),
  }),
  func: async ({ destination, travel_month }) => {
    const query = `${destination} weather ${travel_month} temperature humidity what to pack expect`;
    return tavilySearch(query);
  },
});

export const searchActivities = new DynamicStructuredTool({
  name: "search_activities",
  description:
    "Search for top activities, hidden gems, and things to do at a destination",
  schema: z.object({
    destination: z.string().describe("Destination city"),
    interests: z
      .string()
      .describe("Traveler interests, e.g. culture, food, adventure"),
    budget_level: z
      .string()
      .describe("Budget level: budget, mid-range, or luxury"),
  }),
  func: async ({ destination, interests, budget_level }) => {
    const query = `best things to do ${destination} hidden gems ${interests} ${budget_level} 2025`;
    return tavilySearch(query);
  },
});

export const allTools = [
  searchFlights,
  searchHotels,
  checkVisaRequirements,
  checkWeather,
  searchActivities,
];
