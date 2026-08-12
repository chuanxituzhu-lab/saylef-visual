import type { PoeticContextInput } from "./poetic-context.js";
import type { Ratio, VisualIntent } from "./visual-intent.js";
import type { GuardResult } from "./guard.js";
import type { PromptLanguage, ProviderPrompt } from "./provider.js";

export type ProviderId = "openai" | "gemini" | "qwen";

export interface CreationRequest extends PoeticContextInput {
  ratio?: Ratio;
  provider?: ProviderId;
  promptLanguage?: PromptLanguage;
  seed?: number;
}

export interface RuntimeResult {
  intent: VisualIntent;
  guard: GuardResult;
  prompt: ProviderPrompt;
  seed: number;
}
