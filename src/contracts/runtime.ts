import type { PoeticContextInput } from "./poetic-context.js";
import type { Ratio, VisualIntent } from "./visual-intent.js";
import type { GuardResult } from "./guard.js";
import type { PromptLanguage, ProviderPrompt } from "./provider.js";
import type { VisualDomain, CreationMode } from "./domain.js";
import type { AccountDNA } from "./account-dna.js";
import type { CreativeCoreBrief } from "./creative-core.js";
import type { DirectionSpec, CameraDirection } from "./direction.js";
import type { VisualIntelligenceResult } from "./intelligence.js";

export type ProviderId = "openai" | "gemini" | "qwen";

export interface CreationRequest extends PoeticContextInput {
  ratio?: Ratio;
  provider?: ProviderId;
  promptLanguage?: PromptLanguage;
  domain?: VisualDomain;
  accountId?: string;
  mode?: CreationMode;
  camera?: Partial<CameraDirection>;
  seed?: number;
}

export interface RuntimeResult {
  intent: VisualIntent;
  guard: GuardResult;
  prompt: ProviderPrompt;
  seed: number;
  accountDNA: AccountDNA;
  creativeCore: CreativeCoreBrief;
  direction: DirectionSpec;
  intelligence: VisualIntelligenceResult;
}
