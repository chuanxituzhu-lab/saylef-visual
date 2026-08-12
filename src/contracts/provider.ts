import type { VisualIntent } from "./visual-intent.js";

export type PromptLanguage = "zh" | "en";

export interface ProviderPrompt {
  provider: string;
  language: PromptLanguage;
  prompt: string;
  negativePrompt?: string;
  ratio: string;
}

export interface ImageResult {
  provider: string;
  requestId?: string;
  imageUrl?: string;
  localPath?: string;
  metadata?: Record<string, unknown>;
}

export interface ImageProvider {
  compile(intent: VisualIntent, language?: PromptLanguage): ProviderPrompt;
  generate(prompt: ProviderPrompt): Promise<ImageResult>;
}
