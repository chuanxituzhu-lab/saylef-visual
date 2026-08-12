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
  const reservedPrompt: ProviderPrompt = { ...prompt, provider: "openai" };

  return {
    version: "host-invocation/1.0",
    executor: "host-agent",
    capability: "image_generation",
    preferredProvider,
    intent,
    prompt,
    guard,
    reservedFrame: {
      status: "reserved",
      provider: "openai",
      kind: "codex-image-generation",
      label: "Codex 自动生成预留画面",
      prompt: reservedPrompt,
      instructions: {
        invokeHostImageTool: true,
        doNotClaimGeneratedUntilArtifactExists: true,
        preserveAspectRatio: true
      }
    },
    instructions: {
      requireGuardPass: true,
      regenerateOnFailure: true,
      maxRetries: 1,
      preserveAspectRatio: true,
      returnArtifact: true
    }
  };
}
