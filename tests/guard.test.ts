import test from "node:test";
import assert from "node:assert/strict";
import { validateVisualIntent } from "../src/core/validate-visual-intent.js";
import { autumnWaitingFixture } from "./fixtures/autumn-waiting.js";

test("valid visual intent passes guard", () => {
  const result = validateVisualIntent(autumnWaitingFixture);
  assert.equal(result.passed, true);
  assert.equal(result.action, "accept");
});

test("rejects image text and photography drift", () => {
  const result = validateVisualIntent({
    ...autumnWaitingFixture,
    rendering: {
      ...autumnWaitingFixture.rendering,
      imageText: "allowed",
      photographyDrift: "allowed"
    }
  });
  assert.equal(result.passed, false);
  assert.ok(result.issues.includes("forbidden_image_text"));
  assert.ok(result.issues.includes("photography_drift"));
});
