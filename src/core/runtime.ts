import type { CreationRequest, RuntimeResult } from "../contracts/runtime.js";
import { buildPoeticContext } from "./poetic-engine.js";
import { createSeededRandom } from "./random.js";
import { buildStory } from "./story-engine.js";
import { compileVisualIntent } from "./visual-intent-compiler.js";
import { validateVisualIntent } from "./validate-visual-intent.js";
import { getPromptAdapter } from "../providers/prompt-adapters.js";

export function createVisualStory(request: CreationRequest): RuntimeResult {
  const seed = request.seed ?? Math.floor(Math.random() * 0xffffffff);
  const rng = createSeededRandom(seed);
  const poetic = buildPoeticContext(request, rng);
  const story = buildStory(poetic, rng);
  const intent = compileVisualIntent(story, request.ratio ?? "3:4", rng);
  const guard = validateVisualIntent(intent, 1);
  const provider = getPromptAdapter(request.provider ?? "openai");
  const prompt = provider.compile(intent, request.promptLanguage ?? "zh");
  return { intent, guard, prompt, seed };
}
