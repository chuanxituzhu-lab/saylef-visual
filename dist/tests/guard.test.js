import test from "node:test";
import assert from "node:assert/strict";
import { validateVisualIntent } from "../src/core/validate-visual-intent.js";
import { autumnWaitingFixture } from "./fixtures/autumn-waiting.js";
test("valid visual intent passes guard", () => {
    const result = validateVisualIntent(autumnWaitingFixture);
    assert.equal(result.passed, true);
    assert.equal(result.action, "accept");
});
