import test from "node:test";
import assert from "node:assert/strict";
import { createVisualStory } from "../src/core/runtime.js";
import { analyzeAITrace } from "../src/core/ai-trace.js";
import { PAINTING_ACCOUNT_DNA } from "../src/contracts/account-dna.js";

test("painting runtime keeps account DNA, critic gates and visual intelligence aligned", () => {
  const result = createVisualStory({ season: "summer", domain: "painting", accountId: "account-a", seed: 101 });
  assert.equal(result.accountDNA.domain, "painting");
  assert.equal(result.intent.domain, "painting");
  assert.equal(result.direction.spatialNarrativeWeight, 0.6);
  assert.equal(result.intelligence.domainCritic.domain, "painting");
  assert.equal(result.intelligence.domainCritic.labels.atmosphere, "境");
  assert.equal(result.intelligence.qualityGate.passed, true);
  assert.equal(result.intelligence.decision, "accept");
});

test("photography runtime routes to camera direction and photography critic", () => {
  const result = createVisualStory({
    season: "autumn",
    domain: "photography",
    accountId: "account-b",
    promptLanguage: "en",
    camera: { focalLength: "50mm", aperture: "f/4", iso: "ISO 200" },
    seed: 102
  });
  assert.equal(result.accountDNA.domain, "photography");
  assert.equal(result.intent.domain, "photography");
  assert.equal(result.intent.material, "natural_light_documentary_capture");
  assert.equal(result.direction.camera?.focalLength, "50mm");
  assert.equal(result.direction.camera?.aperture, "f/4");
  assert.equal(result.intelligence.domainCritic.domain, "photography");
  assert.equal(result.intelligence.qualityGate.passed, true);
  assert.match(result.prompt.prompt, /Domain: natural photography/);
  assert.match(result.prompt.prompt, /Camera direction: 50mm, f\/4, ISO 200/);
});

test("AI trace analysis rejects an unlocked image policy", () => {
  const result = createVisualStory({ season: "spring", seed: 103 });
  const analysis = analyzeAITrace({
    ...result.intent,
    rendering: { ...result.intent.rendering, imageText: "allowed", photographyDrift: "allowed" }
  }, PAINTING_ACCOUNT_DNA);
  assert.equal(analysis.passed, false);
  assert.equal(analysis.severity, "high");
  assert.ok(analysis.signals.includes("image text is not locked"));
});
