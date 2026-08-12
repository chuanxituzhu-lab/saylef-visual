import type { AccountDNA } from "../contracts/account-dna.js";
import type { GuardResult } from "../contracts/guard.js";
import type { VisualIntelligenceResult } from "../contracts/intelligence.js";
import type { VisualIntent } from "../contracts/visual-intent.js";
import { evaluatePainting } from "../domains/painting/critic.js";
import { evaluatePhotography } from "../domains/photography/critic.js";
import { analyzeAITrace } from "./ai-trace.js";

function technicalQA(intent: VisualIntent): VisualIntelligenceResult["technicalQA"] {
  const issues: string[] = [];
  if (!intent.format.ratio) issues.push("missing output ratio");
  if (!intent.narrative.moment.trim()) issues.push("missing story moment");
  if (intent.rendering.imageText !== "forbidden") issues.push("image text policy is not enforced");
  if (intent.scene.supportingElements.length > 2) issues.push("supporting element count is too high");
  return { passed: issues.length === 0, score: Math.max(0, 100 - issues.length * 25), issues };
}

function evaluateStyleIdentity(intent: VisualIntent, account: AccountDNA): VisualIntelligenceResult["styleIdentity"] {
  const matchedSignals: string[] = [];
  const missingSignals: string[] = [];
  if (intent.color.huePurity === "high" && intent.color.saturation === "high" && intent.color.brightness === "high") {
    matchedSignals.push("high-purity bright color");
  } else {
    missingSignals.push("high-purity bright color");
  }
  if (intent.composition.visualNoise === account.compositionBias.visualNoise && intent.composition.focalPoints === 1) {
    matchedSignals.push("low-noise single hierarchy");
  } else {
    missingSignals.push("low-noise single hierarchy");
  }
  if (intent.rendering.photographyDrift === "forbidden") matchedSignals.push("photography drift blocked");
  else missingSignals.push("photography drift blocked");
  if (intent.locks.material === "handcrafted_painterly" || intent.domain === "photography") matchedSignals.push("domain material language");
  else missingSignals.push("domain material language");
  const score = Math.max(0, 100 - missingSignals.length * 15);
  return {
    score,
    threshold: account.qualityGate.styleIdentityMinimum,
    passed: score >= account.qualityGate.styleIdentityMinimum,
    matchedSignals,
    missingSignals
  };
}

export function evaluateVisualIntelligence(
  intent: VisualIntent,
  account: AccountDNA,
  guard: GuardResult
): VisualIntelligenceResult {
  const technical = technicalQA(intent);
  const aiTrace = analyzeAITrace(intent, account);
  const domainCritic = intent.domain === "photography" ? evaluatePhotography(intent, account) : evaluatePainting(intent, account);
  const styleIdentity = evaluateStyleIdentity(intent, account);
  const humanPreferenceScore = Math.round((domainCritic.score + styleIdentity.score + (intent.narrative.hook ? 100 : 40)) / 3);
  const qualityGate = {
    technical: technical.passed,
    aiTrace: aiTrace.passed,
    artistic: domainCritic.passed,
    styleIdentity: styleIdentity.passed,
    signature: domainCritic.signatureScore >= account.qualityGate.signatureMinimum,
    passed: false,
    failedRules: [] as string[]
  };
  if (!qualityGate.technical) qualityGate.failedRules.push("technical_qa");
  if (!qualityGate.aiTrace) qualityGate.failedRules.push("ai_trace");
  if (!qualityGate.artistic) qualityGate.failedRules.push("artistic_score");
  if (!qualityGate.styleIdentity) qualityGate.failedRules.push("style_identity");
  if (!qualityGate.signature) qualityGate.failedRules.push("signature_score");
  if (!guard.passed) qualityGate.failedRules.push("consistency_guard");
  qualityGate.passed = guard.passed && qualityGate.failedRules.length === 0;
  const score = Math.min(100, Math.round((technical.score + (100 - aiTrace.score) + domainCritic.score + styleIdentity.score + Math.min(100, humanPreferenceScore)) / 5));
  return {
    score,
    decision: qualityGate.passed ? "accept" : guard.passed ? "refine" : "reject",
    technicalQA: technical,
    aiTrace,
    domainCritic,
    styleIdentity,
    humanPreference: {
      score: Math.min(100, humanPreferenceScore),
      reason: intent.narrative.hook ? "a clear hook and single visual hierarchy make the work easy to enter" : "the work lacks a clear first invitation"
    },
    qualityGate
  };
}
