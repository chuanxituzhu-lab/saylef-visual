import type { AgentCreateRequest } from "../contracts/harness.js";
import { runVisualStoryAgent } from "../harness/visual-story-agent.js";

export function runCli(args: string[]): string {
  const request: AgentCreateRequest = { season: "auto" };
  for (let i = 0; i < args.length; i++) {
    const value = args[i + 1];
    if (args[i] === "--idea" && value) request.userIdea = value;
    if (args[i] === "--season" && value) request.season = value as AgentCreateRequest["season"];
    if (args[i] === "--emotion" && value) request.emotionHint = value;
    if (args[i] === "--healing" && value) request.healingScenario = value as AgentCreateRequest["healingScenario"];
    if (args[i] === "--ratio" && value) request.ratio = value as AgentCreateRequest["ratio"];
    if (args[i] === "--provider" && value) request.provider = value as AgentCreateRequest["provider"];
    if (args[i] === "--mode" && value) request.executionMode = value as AgentCreateRequest["executionMode"];
    if (args[i] === "--seed" && value) request.seed = Number(value);
  }
  return JSON.stringify(runVisualStoryAgent(request), null, 2);
}
