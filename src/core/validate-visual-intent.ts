import type { VisualIntent } from "../contracts/visual-intent.js";
import type { GuardIssue, GuardResult } from "../contracts/guard.js";

export function validateVisualIntent(intent: VisualIntent, retryBudgetRemaining: 0 | 1 = 1): GuardResult {
  const issues: GuardIssue[] = [];
  if (!intent.narrative.hook.trim()) issues.push("weak_visual_hook");
  if (!intent.narrative.title.trim()) issues.push("story_missing");
  if (intent.scene.supportingElements.length > 2) issues.push("too_many_supporting_elements");
  if (intent.composition.focalPoints !== 1) issues.push("multiple_focal_points");
  const minimumNegativeSpace = intent.domain === "photography" ? 0.25 : 0.3;
  if (intent.composition.negativeSpace < minimumNegativeSpace) issues.push("insufficient_negative_space");
  if (intent.rendering.imageText !== "forbidden") issues.push("forbidden_image_text");
  if (intent.rendering.photographyDrift !== "forbidden") issues.push("photography_drift");
  const photography = intent.domain === "photography";
  const renderingWeightsValid = photography
    ? intent.rendering.spatialNarrativeWeight === 0.7 && intent.rendering.pigmentLanguageWeight === 0.3
    : intent.rendering.spatialNarrativeWeight === 0.6 && intent.rendering.pigmentLanguageWeight === 0.4;
  const materialValid = photography
    ? intent.material === "natural_light_documentary_capture"
    : intent.locks.material === "handcrafted_painterly" && intent.material === "watercolor_gouache_acrylic_impasto";
  if (!materialValid || !renderingWeightsValid) {
    issues.push("style_drift");
  }
  const score = Math.max(0, 100 - issues.length * 15);
  return {
    passed: issues.length === 0,
    score,
    issues,
    action: issues.length === 0 ? "accept" : "regenerate",
    retryBudgetRemaining
  };
}
