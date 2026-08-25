import type { AITraceResult } from "../contracts/intelligence.js";
import type { VisualIntent } from "../contracts/visual-intent.js";
import type { AccountDNA } from "../contracts/account-dna.js";

export function analyzeAITrace(intent: VisualIntent, account: AccountDNA): AITraceResult {
  const signals: string[] = [];
  if (intent.rendering.photographyDrift !== "forbidden") signals.push("photography drift is not locked");
  if (intent.rendering.imageText !== "forbidden") signals.push("image text is not locked");
  if (intent.composition.visualNoise !== "low") signals.push("uniformly detailed composition");
  if (intent.composition.focalPoints !== 1) signals.push("multiple competing focal points");
  if (intent.scene.supportingElements.length > 2) signals.push("repeated supporting objects");
  if (intent.domain === "painting" && intent.material !== "watercolor_gouache_acrylic_impasto") {
    signals.push("painting material drift");
  }
  if (intent.domain === "photography" && intent.direction?.lighting.avoid.includes("fake bokeh") === false) {
    signals.push("fake bokeh risk");
  }
  const score = Math.min(100, signals.length * 25);
  const severity = score >= 75 ? "severe" : score >= 50 ? "high" : score >= 25 ? "moderate" : "low";
  return {
    passed: score <= account.qualityGate.aiTraceMaximum,
    score,
    threshold: account.qualityGate.aiTraceMaximum,
    severity,
    signals
  };
}
