import { getTravelAgent } from "@/lib/agent";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(content: any): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c) => c && c.type === "text")
      .map((c) => c.text || "")
      .join("");
  }
  return "";
}

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ error: "Query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
        };

        try {
          let finalContent = "";

          const agent = getTravelAgent();
          const eventStream = agent.streamEvents(
            { messages: [new HumanMessage(query)] },
            { version: "v2" }
          );

          for await (const event of eventStream) {
            const { event: eventType, name, data } = event;

            if (eventType === "on_tool_start") {
              send({
                type: "tool_start",
                tool: name,
                input: JSON.stringify(data.input || {}),
              });
            }

            if (eventType === "on_tool_end") {
              send({ type: "tool_end", tool: name });
            }

            if (eventType === "on_chat_model_stream") {
              const chunk = data.chunk;
              if (chunk && chunk.content) {
                const content = extractText(chunk.content);
                if (content) {
                  send({ type: "token", content });
                  finalContent += content;
                }
              }
            }

            if (eventType === "on_chat_model_end") {
              const output = data.output;
              if (output instanceof AIMessage) {
                const text = extractText(output.content);
                if (text) {
                  finalContent = text;
                }
              }
            }
          }

          // Try to parse the final content as JSON report
          if (finalContent) {
            try {
              // Clean up potential markdown fences
              let cleaned = finalContent.trim();
              if (cleaned.startsWith("```")) {
                cleaned = cleaned
                  .replace(/^```(?:json)?\n?/, "")
                  .replace(/\n?```$/, "");
              }
              const report = JSON.parse(cleaned);
              send({ type: "report", data: report });
            } catch {
              // Not valid JSON, send as final token
              send({ type: "token", content: "\n\n[Report parsing complete]" });
            }
          }

          send({ type: "done" });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Agent execution failed";
          send({ type: "error", message });
          send({ type: "done" });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
