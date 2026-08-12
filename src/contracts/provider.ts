import type { VisualIntent } from "./visual-intent.js";

export interface ProviderPrompt {
  provider: string;
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
  compile(intent: VisualIntent): ProviderPrompt;
  generate(prompt: ProviderPrompt): Promise<ImageResult>;
}
