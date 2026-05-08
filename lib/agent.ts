import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { AIMessage } from "@langchain/core/messages";
import { allTools } from "./tools";
import { TRAVELMIND_SYSTEM_PROMPT } from "./prompts";

function getModel() {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0,
    streaming: true,
  });
}

async function agentNode(state: typeof MessagesAnnotation.State) {
  const modelWithTools = getModel().bindTools(allTools);
  const systemMessage = {
    role: "system" as const,
    content: TRAVELMIND_SYSTEM_PROMPT,
  };
  const response = await modelWithTools.invoke([
    systemMessage,
    ...state.messages,
  ]);
  return { messages: [response] };
}

const toolNode = new ToolNode(allTools);

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (
    lastMessage instanceof AIMessage &&
    lastMessage.tool_calls &&
    lastMessage.tool_calls.length > 0
  ) {
    return "tools";
  }
  return "__end__";
}

function buildGraph() {
  const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", agentNode)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue, {
      tools: "tools",
      __end__: "__end__",
    })
    .addEdge("tools", "agent");

  return workflow.compile();
}

export function getTravelAgent() {
  return buildGraph();
}
