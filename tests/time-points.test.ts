import test from "node:test";
import assert from "node:assert/strict";
import { TIME_POINTS } from "../src/contracts/time-point.js";
import { buildPoeticContext } from "../src/core/poetic-engine.js";
import { createSeededRandom } from "../src/core/random.js";

test("time point catalog is explicit and complete", () => {
  assert.equal(TIME_POINTS.length, 7);
  assert.equal(new Set(TIME_POINTS.map((timePoint) => timePoint.id)).size, 7);
  for (const timePoint of TIME_POINTS) {
    assert.ok(timePoint.label.length > 1);
    assert.ok(timePoint.labelEn.length > 1);
    assert.match(timePoint.clock, /^\d{2}:\d{2}–\d{2}:\d{2}$/);
    assert.ok(timePoint.light.length > 5);
  }
});

test("automatic time point selection is reproducible", () => {
  const a = buildPoeticContext({ season: "spring", timePoint: "auto" }, createSeededRandom(31));
  const b = buildPoeticContext({ season: "spring", timePoint: "auto" }, createSeededRandom(31));
  assert.deepEqual(a.timePoint, b.timePoint);
  assert.ok(TIME_POINTS.some((timePoint) => timePoint.id === a.timePoint.id));
});
