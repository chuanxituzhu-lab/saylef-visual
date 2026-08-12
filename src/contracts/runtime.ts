import type { PoeticContextInput } from "./poetic-context.js";
import type { Ratio, VisualIntent } from "./visual-intent.js";
import type { GuardResult } from "./guard.js";
import type { ProviderPrompt } from "./provider.js";

export type ProviderId = "openai" | "gemini" | "qwen";

export interface CreationRequest extends PoeticContextInput {
  ratio?: Ratio;
  provider?: ProviderId;
  seed?: number;
}

export interface RuntimeResult {
  intent: VisualIntent;
  guard: GuardResult;
  prompt: ProviderPrompt;
  seed: number;
}
