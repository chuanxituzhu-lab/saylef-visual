import test from "node:test";
import assert from "node:assert/strict";
import { createVisualStory } from "../src/core/runtime.js";
test("runtime creates a guarded reproducible story prompt", () => {
    const request = { season: "autumn", emotionHint: "等待", ratio: "3:4", provider: "openai", seed: 42 };
    const a = createVisualStory(request);
    const b = createVisualStory(request);
    assert.deepEqual(a.intent, b.intent);
    assert.equal(a.guard.passed, true);
    assert.equal(a.prompt.provider, "openai");
    assert.match(a.prompt.prompt, /very high saturation/i);
    assert.equal(a.intent.composition.focalPoints, 1);
    assert.ok(a.intent.composition.negativeSpace >= 0.3);
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
