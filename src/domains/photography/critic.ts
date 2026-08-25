import type { AccountDNA } from "../../contracts/account-dna.js";
import type { DomainCriticResult } from "../../contracts/intelligence.js";
import type { VisualIntent } from "../../contracts/visual-intent.js";

export function evaluatePhotography(intent: VisualIntent, account: AccountDNA): DomainCriticResult {
  const camera = intent.direction?.camera;
  const dimensions = {
    impact: intent.narrative.hook.trim() ? 12 : 7,
    story: intent.narrative.openEnding && intent.narrative.moment.trim() ? 12 : 7,
    composition: intent.composition.focalPoints === 1 && intent.composition.negativeSpace >= 0.25 ? 12 : 8,
    light: intent.direction?.lighting.quality === "clear" ? 12 : 7,
    color: intent.color.saturation === "high" ? 11 : 13,
    atmosphere: intent.direction?.composition.depth === "natural" ? 11 : 8,
    originality: intent.locks.composition === "one_hero_one_entrance_breathing_space" ? 10 : 5,
    technical: camera && intent.rendering.photographyDrift === "forbidden" ? 10 : 5,
    signature: intent.direction?.lighting.avoid.includes("fake bokeh") && intent.direction.lighting.avoid.includes("HDR halo") ? 10 : 5
  };
  const score = Object.values(dimensions).reduce((sum, value) => sum + value, 0);
  return {
    domain: "photography",
    score,
    threshold: account.qualityGate.artisticMinimum,
    signatureScore: dimensions.signature * 10,
    dimensions,
    labels: {
      impact: "Impact", story: "Story", composition: "Composition", light: "Light", color: "Color",
      atmosphere: "Atmosphere", originality: "Originality", technical: "Technical", signature: "Signature"
    },
    passed: score >= account.qualityGate.artisticMinimum,
    highlights: ["natural light", "human-scale story moment", "low AI trace policy"],
    concerns: score >= account.qualityGate.artisticMinimum ? [] : ["photography quality is below the account gate"]
  };
}
