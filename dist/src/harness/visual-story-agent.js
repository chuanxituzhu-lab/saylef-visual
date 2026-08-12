import { createVisualStory } from "../core/runtime.js";
import { buildCodexInvocationPlan } from "../providers/codex-bridge.js";
/**
 * Stable Agent Harness entry point.
 * Host mode returns a job for Codex/other capable hosts to execute.
 * API mode is deliberately reserved in MVP; credentials/network clients stay outside core.
 */
export function runVisualStoryAgent(request) {
    const executionMode = request.executionMode ?? "host";
    const result = createVisualStory(request);
    if (executionMode === "api") {
        return {
            ...result,
            executionMode,
            apiStatus: "reserved_not_executed"
        };
    }
    const preferredProvider = request.provider ?? "openai";
    return {
        ...result,
        executionMode,
        hostJob: buildCodexInvocationPlan(result.intent, result.guard, result.prompt, preferredProvider)
    };
}
