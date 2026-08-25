import test from "node:test";
import assert from "node:assert/strict";
import { createVisualStory } from "../src/core/runtime.js";

test("runtime creates a guarded reproducible story prompt", () => {
  const request = { season: "autumn" as const, emotionHint: "等待", ratio: "3:4" as const, provider: "openai" as const, promptLanguage: "en" as const, seed: 42 };
  const a = createVisualStory(request);
  const b = createVisualStory(request);
  assert.deepEqual(a.intent, b.intent);
  assert.equal(a.guard.passed, true);
  assert.equal(a.prompt.provider, "openai");
  assert.equal(a.prompt.language, "en");
  assert.match(a.prompt.prompt, /high-purity pigment/i);
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
  assert.equal(result.intent.healing.labelEn, "return after rain");
  assert.match(result.prompt.prompt, /疗愈情景：雨后归来/);
  assert.match(result.prompt.prompt, /非医疗化/);
  assert.equal(result.guard.passed, true);
});

test("prompt language stays pure and removes ellipsis", () => {
  const chinese = createVisualStory({ season: "spring", promptLanguage: "zh", seed: 7 });
  const english = createVisualStory({ season: "spring", promptLanguage: "en", seed: 7 });
  assert.equal(chinese.prompt.language, "zh");
  assert.equal(/[A-Za-z]/.test(chinese.prompt.prompt), false);
  assert.equal(/\.{2,}|\u2026/.test(chinese.prompt.prompt), false);
  assert.equal(/[A-Za-z]/.test(chinese.prompt.negativePrompt || ""), false);
  assert.equal(/[\u3400-\u9fff]/.test(english.prompt.prompt), false);
  assert.equal(/\.{2,}|\u2026/.test(english.prompt.prompt), false);
  assert.equal(/[\u3400-\u9fff]/.test(english.prompt.negativePrompt || ""), false);
});

test("selected time point becomes structured intent and prompt direction", () => {
  const result = createVisualStory({
    season: "summer",
    timePoint: "golden-hour",
    promptLanguage: "en",
    seed: 23
  });
  assert.equal(result.intent.time.id, "golden-hour");
  assert.equal(result.intent.time.clock, "17:00–18:30");
  assert.match(result.prompt.prompt, /Time point: the golden hour before sunset/);
  assert.match(result.prompt.prompt, /low golden light/i);
});
