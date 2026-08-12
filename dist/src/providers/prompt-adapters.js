import { compileBasePrompt, DEFAULT_NEGATIVE_PROMPT } from "../compiler-prompt.js";
class PromptOnlyProvider {
    suffix = "";
    compile(intent) {
        return {
            provider: this.id,
            prompt: `${compileBasePrompt(intent)} ${this.suffix}`.trim(),
            negativePrompt: DEFAULT_NEGATIVE_PROMPT,
            ratio: intent.format.ratio
        };
    }
    async generate(_prompt) {
        throw new Error(`${this.id} network generation is intentionally not wired in Phase 4. Inject a transport/API client in the provider integration phase.`);
    }
}
export class OpenAIPromptAdapter extends PromptOnlyProvider {
    id = "openai";
    suffix = "Use natural spatial storytelling and preserve a clear single visual hierarchy.";
}
export class GeminiPromptAdapter extends PromptOnlyProvider {
    id = "gemini";
    suffix = "Preserve semantic coherence between the story moment, focal subject, light, and color.";
}
export class QwenPromptAdapter extends PromptOnlyProvider {
    id = "qwen";
    suffix = "Keep the scene concise, culturally subtle, and visually coherent with restrained detail density.";
}
export function getPromptAdapter(id) {
    if (id === "gemini")
        return new GeminiPromptAdapter();
    if (id === "qwen")
        return new QwenPromptAdapter();
    return new OpenAIPromptAdapter();
}
