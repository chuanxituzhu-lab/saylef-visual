import type { CreationRequest } from "./contracts/runtime.js";
import { createVisualStory } from "./core/runtime.js";
import { buildCodexInvocationPlan } from "./providers/codex-bridge.js";

export function createCodexImageJob(request: CreationRequest) {
  const result = createVisualStory(request);
  const preferredProvider = request.provider ?? "openai";
  const job = buildCodexInvocationPlan(
    result.intent,
    result.guard,
    result.prompt,
    preferredProvider
  );
  return { ...result, job };
}
