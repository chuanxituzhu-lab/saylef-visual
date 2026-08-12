import type { GuardResult } from "../contracts/guard.js";
import type { HostInvocationPlan } from "../contracts/invocation.js";
import type { ProviderPrompt } from "../contracts/provider.js";
import type { VisualIntent } from "../contracts/visual-intent.js";

export function buildCodexInvocationPlan(
  intent: VisualIntent,
  guard: GuardResult,
  prompt: ProviderPrompt,
  preferredProvider: HostInvocationPlan["preferredProvider"] = "auto"
): HostInvocationPlan {
  return {
    version: "host-invocation/1.0",
    executor: "host-agent",
    capability: "image_generation",
    preferredProvider,
    intent,
    prompt,
    guard,
    instructions: {
      requireGuardPass: true,
      regenerateOnFailure: true,
      maxRetries: 1,
      preserveAspectRatio: true,
      returnArtifact: true
    }
  };
}
