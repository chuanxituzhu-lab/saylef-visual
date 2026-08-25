import type { AccountDNA } from "../../contracts/account-dna.js";
import type { DomainCriticResult } from "../../contracts/intelligence.js";
import type { VisualIntent } from "../../contracts/visual-intent.js";

export function evaluatePainting(intent: VisualIntent, account: AccountDNA): DomainCriticResult {
  const dimensions = {
    atmosphere: intent.narrative.openEnding ? 19 : 12,
    life: intent.scene.supportingElements.length <= 2 ? 15 : 9,
    composition: intent.composition.focalPoints === 1 && intent.composition.negativeSpace >= 0.3 ? 15 : 8,
    color: intent.color.huePurity === "high" && intent.color.saturation === "high" && intent.color.brightness === "high" ? 15 : 8,
    material: intent.material === "watercolor_gouache_acrylic_impasto" ? 10 : 4,
    story: intent.narrative.hook.trim() && intent.narrative.moment.trim() ? 15 : 7,
    signature: intent.locks.color === "high_purity_pigment_steps" && intent.locks.material === "handcrafted_painterly" ? 10 : 5
  };
  const score = Object.values(dimensions).reduce((sum, value) => sum + value, 0);
  return {
    domain: "painting",
    score,
    threshold: account.qualityGate.artisticMinimum,
    signatureScore: dimensions.signature * 10,
    dimensions,
    labels: { atmosphere: "境", life: "气", composition: "章", color: "色", material: "笔", story: "事", signature: "格" },
    passed: score >= account.qualityGate.artisticMinimum,
    highlights: ["one unresolved moment", "high-purity color structure", "handcrafted material language"],
    concerns: score >= account.qualityGate.artisticMinimum ? [] : ["painting quality is below the account gate"]
  };
}
