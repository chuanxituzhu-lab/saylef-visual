import test from "node:test";
import assert from "node:assert/strict";
import { createCodexImageJob } from "../src/codex.js";
test("creates a host-agent image generation job without API transport", () => {
    const result = createCodexImageJob({
        season: "spring",
        emotionHint: "归家",
        userIdea: "雨后山居，门口有一盏灯",
        ratio: "4:5",
        provider: "openai",
        seed: 20260812
    });
    assert.equal(result.job.executor, "host-agent");
    assert.equal(result.job.capability, "image_generation");
    assert.equal(result.job.preferredProvider, "openai");
    assert.equal(result.job.instructions.maxRetries, 1);
    assert.equal(result.job.prompt.ratio, "4:5");
    assert.ok(result.job.prompt.prompt.length > 50);
});
