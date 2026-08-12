import type { ProviderPrompt } from "./provider.js";
import type { GuardResult } from "./guard.js";
import type { VisualIntent } from "./visual-intent.js";

export type HostCapability = "image_generation";

export interface ReservedFramePlan {
  status: "reserved";
  provider: "openai";
  kind: "codex-image-generation";
  label: "Codex 自动生成预留画面";
  prompt: ProviderPrompt;
  instructions: {
    invokeHostImageTool: true;
    doNotClaimGeneratedUntilArtifactExists: true;
    preserveAspectRatio: true;
  };
}

export interface HostInvocationPlan {
  version: "host-invocation/1.0";
  executor: "host-agent";
  capability: HostCapability;
  preferredProvider: "openai" | "gemini" | "qwen" | "auto";
  intent: VisualIntent;
  prompt: ProviderPrompt;
  guard: GuardResult;
  reservedFrame: ReservedFramePlan;
  instructions: {
    requireGuardPass: boolean;
    regenerateOnFailure: boolean;
    maxRetries: 1;
    preserveAspectRatio: true;
    returnArtifact: true;
  };
}
