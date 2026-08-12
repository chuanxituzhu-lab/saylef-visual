import test from "node:test";
import assert from "node:assert/strict";
import { createVisualStory } from "../src/core/runtime.js";

test("runtime creates a guarded reproducible story prompt", () => {
  const request = { season: "autumn" as const, emotionHint: "等待", ratio: "3:4" as const, provider: "openai" as const, seed: 42 };
  const a = createVisualStory(request);
  const b = createVisualStory(request);
  assert.deepEqual(a.intent, b.intent);
  assert.equal(a.guard.passed, true);
  assert.equal(a.prompt.provider, "openai");
  assert.match(a.prompt.prompt, /very high saturation/i);
  assert.equal(a.intent.composition.focalPoints, 1);
  assert.ok(a.intent.composition.negativeSpace >= 0.3);
  assert.equal(a.intent.healing.tone, "restorative_non_clinical");
});

test("different seeds create controlled variation without style drift", () => {
  const a = createVisualStory({ season: "spring", provider: "gemini", seed: 1 });
  const b = createVisualStory({ season: "spring", provider: "gemini", seed: 2 });
  assert.equal(a.intent.color.saturation, "high");
  assert.equal(b.intent.color.saturation, "high");
  assert.equal(a.intent.composition.visualNoise, "low");
  assert.equal(b.intent.composition.visualNoise, "low");
  assert.notDeepEqual(a.intent, b.intent);
});

test("healing scenario shapes the poetic context and prompt", () => {
  const result = createVisualStory({
    season: "autumn",
    healingScenario: "rain-return",
    provider: "openai",
    seed: 19
  });
  assert.equal(result.intent.healing.scenario, "rain-return");
  assert.equal(result.intent.healing.label, "雨后归来");
  assert.match(result.prompt.prompt, /Healing scene: 雨后归来/);
  assert.match(result.prompt.prompt, /non-clinical/);
  assert.equal(result.guard.passed, true);
});
