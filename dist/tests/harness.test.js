import test from "node:test";
import assert from "node:assert/strict";
import { runVisualStoryAgent } from "../src/harness/visual-story-agent.js";
test("host mode returns executable host invocation plan", () => {
    const result = runVisualStoryAgent({ season: "autumn", seed: 42, executionMode: "host" });
    assert.equal(result.executionMode, "host");
    assert.ok(result.hostJob);
    assert.equal(result.hostJob?.capability, "image_generation");
    assert.equal(result.hostJob?.instructions.maxRetries, 1);
});
test("api mode remains reserved without credentials or network execution", () => {
    const result = runVisualStoryAgent({ season: "spring", seed: 7, executionMode: "api", provider: "gemini" });
    assert.equal(result.executionMode, "api");
    assert.equal(result.apiStatus, "reserved_not_executed");
    assert.equal(result.hostJob, undefined);
});
