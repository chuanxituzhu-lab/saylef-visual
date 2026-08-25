import type { CreationRequest, RuntimeResult } from "../contracts/runtime.js";
import { buildPoeticContext } from "./poetic-engine.js";
import { createSeededRandom } from "./random.js";
import { buildStory } from "./story-engine.js";
import { compileVisualIntent } from "./visual-intent-compiler.js";
import { validateVisualIntent } from "./validate-visual-intent.js";
import { getPromptAdapter } from "../providers/prompt-adapters.js";
import { resolveAccountRuntime } from "../account-dna/runtime.js";
import { buildCreativeCore } from "./creative-core.js";
import { buildDirection } from "./direction-engine.js";
import { evaluateVisualIntelligence } from "./visual-intelligence.js";

export function createVisualStory(request: CreationRequest): RuntimeResult {
  const seed = request.seed ?? Math.floor(Math.random() * 0xffffffff);
  const rng = createSeededRandom(seed);
  const accountRuntime = resolveAccountRuntime(request);
  const poetic = buildPoeticContext(request, rng);
  const story = buildStory(poetic, rng);
  const creativeCore = buildCreativeCore({ context: poetic, story, account: accountRuntime.account }, rng);
  const direction = buildDirection({
    domain: accountRuntime.domain,
    account: accountRuntime.account,
    ratio: request.ratio ?? "3:4",
    hero: "one clear hero subject",
    entrance: "one clear entrance into the frame",
    camera: request.camera
  }, rng);
  const intent = compileVisualIntent(story, request.ratio ?? "3:4", rng, {
    domain: accountRuntime.domain,
    accountId: accountRuntime.account.accountId,
    direction
  });
  const guard = validateVisualIntent(intent, 1);
  const intelligence = evaluateVisualIntelligence(intent, accountRuntime.account, guard);
  const provider = getPromptAdapter(request.provider ?? "openai");
  const prompt = provider.compile(intent, request.promptLanguage ?? "zh");
  return {
    intent,
    guard,
    prompt,
    seed,
    accountDNA: accountRuntime.account,
    creativeCore,
    direction,
    intelligence
  };
}
