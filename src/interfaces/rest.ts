import type { AgentCreateRequest, AgentCreateResult } from "../contracts/harness.js";
import { runVisualStoryAgent } from "../harness/visual-story-agent.js";

export interface RestError {
  error: string;
}

export function handleCreateRequest(input: unknown): AgentCreateResult | RestError {
  if (!input || typeof input !== "object") return { error: "invalid_request" };
  const raw = input as Partial<AgentCreateRequest>;
  const request: AgentCreateRequest = { ...raw, season: raw.season ?? "auto" };
  try {
    return runVisualStoryAgent(request);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "runtime_error" };
  }
}
