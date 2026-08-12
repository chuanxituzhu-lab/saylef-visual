import test from "node:test";
import assert from "node:assert/strict";
import { handleCreateRequest } from "../src/interfaces/rest.js";
test("REST interface creates a visual story job", () => {
    const result = handleCreateRequest({ userIdea: "夏日树荫下的归家", season: "summer", seed: 9, ratio: "4:5" });
    assert.equal("error" in result, false);
    if (!("error" in result)) {
        assert.equal(result.intent.format.ratio, "4:5");
        assert.ok(result.prompt.prompt.length > 40);
    }
});
