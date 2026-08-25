import test from "node:test";
import assert from "node:assert/strict";
import { handleCreateRequest } from "../src/interfaces/rest.js";

test("REST interface creates a visual story job", () => {
  const result = handleCreateRequest({ userIdea: "夏日树荫下的归家", season: "summer", seed: 9, ratio: "4:5" });
  assert.equal("error" in result, false);
  if (!("error" in result)) {
    assert.equal(result.intent.format.ratio, "4:5");
    assert.ok(result.prompt.prompt.length > 40);
    assert.equal(result.hostJob?.reservedFrame.status, "reserved");
  }
});

test("REST interface carries photography domain through the visual runtime", () => {
  const result = handleCreateRequest({
    domain: "photography",
    accountId: "account-b",
    mode: "pro",
    camera: { focalLength: "85mm", aperture: "f/2.8", iso: "ISO 200", shutter: "1/250s" },
    season: "summer",
    seed: 12
  });
  assert.equal("error" in result, false);
  if (!("error" in result)) {
    assert.equal(result.intent.domain, "photography");
    assert.equal(result.accountDNA.domain, "photography");
    assert.equal(result.direction.camera?.focalLength, "85mm");
    assert.equal(result.intelligence.domainCritic.domain, "photography");
  }
});
