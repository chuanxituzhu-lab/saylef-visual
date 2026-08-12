import type { ImageProvider, ImageResult, ProviderPrompt } from "../contracts/provider.js";
import type { VisualIntent } from "../contracts/visual-intent.js";
import { compileBasePrompt, DEFAULT_NEGATIVE_PROMPT } from "../compiler-prompt.js";

abstract class PromptOnlyProvider implements ImageProvider {
  abstract readonly id: string;
  protected suffix = "";

  compile(intent: VisualIntent): ProviderPrompt {
    return {
      provider: this.id,
      prompt: `${compileBasePrompt(intent)} ${this.suffix}`.trim(),
      negativePrompt: DEFAULT_NEGATIVE_PROMPT,
      ratio: intent.format.ratio
    };
  }

  async generate(_prompt: ProviderPrompt): Promise<ImageResult> {
    throw new Error(`${this.id} network generation is intentionally not wired in Phase 4. Inject a transport/API client in the provider integration phase.`);
  }
}

export class OpenAIPromptAdapter extends PromptOnlyProvider {
  readonly id = "openai";
  protected suffix = "Use natural spatial storytelling and preserve a clear single visual hierarchy.";
}

export class GeminiPromptAdapter extends PromptOnlyProvider {
  readonly id = "gemini";
  protected suffix = "Preserve semantic coherence between the story moment, focal subject, light, and color.";
}

export class QwenPromptAdapter extends PromptOnlyProvider {
  readonly id = "qwen";
  protected suffix = "Keep the scene concise, culturally subtle, and visually coherent with restrained detail density.";
}

export function getPromptAdapter(id: "openai" | "gemini" | "qwen"): ImageProvider {
  if (id === "gemini") return new GeminiPromptAdapter();
  if (id === "qwen") return new QwenPromptAdapter();
  return new OpenAIPromptAdapter();
}
