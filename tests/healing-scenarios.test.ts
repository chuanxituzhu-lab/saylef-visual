import test from "node:test";
import assert from "node:assert/strict";
import { HEALING_SCENARIOS } from "../src/contracts/healing-scenario.js";
import { buildPoeticContext } from "../src/core/poetic-engine.js";
import { createSeededRandom } from "../src/core/random.js";

test("healing scenario catalog stays complete and non-clinical", () => {
  assert.equal(HEALING_SCENARIOS.length, 8);
  assert.equal(new Set(HEALING_SCENARIOS.map((scenario) => scenario.id)).size, 8);
  for (const scenario of HEALING_SCENARIOS) {
    assert.ok(scenario.label.length > 1);
    assert.ok(scenario.cue.length > 5);
    assert.ok(scenario.emotions.length > 0);
    assert.ok(scenario.spaces.length > 0);
  }
});

test("automatic healing selection is reproducible", () => {
  const a = buildPoeticContext({ season: "spring", healingScenario: "auto" }, createSeededRandom(12));
  const b = buildPoeticContext({ season: "spring", healingScenario: "auto" }, createSeededRandom(12));
  assert.deepEqual(a, b);
  assert.ok(HEALING_SCENARIOS.some((scenario) => scenario.id === a.healingScenario));
});
