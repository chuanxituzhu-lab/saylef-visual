import { runVisualStoryAgent } from "../harness/visual-story-agent.js";
export function handleCreateRequest(input) {
    if (!input || typeof input !== "object")
        return { error: "invalid_request" };
    const raw = input;
    const request = { ...raw, season: raw.season ?? "auto" };
    try {
        return runVisualStoryAgent(request);
    }
    catch (error) {
        return { error: error instanceof Error ? error.message : "runtime_error" };
    }
}
