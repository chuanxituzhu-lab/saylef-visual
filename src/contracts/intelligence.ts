import type { VisualDomain } from "./domain.js";

export type AITraceSeverity = "low" | "moderate" | "high" | "severe";

export interface TechnicalQAResult {
  passed: boolean;
  score: number;
  issues: string[];
}

export interface AITraceResult {
  passed: boolean;
  score: number;
  threshold: number;
  severity: AITraceSeverity;
  signals: string[];
}

export interface DomainCriticResult {
  domain: VisualDomain;
  score: number;
  threshold: number;
  signatureScore: number;
  dimensions: Readonly<Record<string, number>>;
  labels: Readonly<Record<string, string>>;
  passed: boolean;
  highlights: string[];
  concerns: string[];
}

export interface StyleIdentityResult {
  score: number;
  threshold: number;
  passed: boolean;
  matchedSignals: string[];
  missingSignals: string[];
}

export interface QualityGateResult {
  passed: boolean;
  artistic: boolean;
  styleIdentity: boolean;
  signature: boolean;
  technical: boolean;
  aiTrace: boolean;
  failedRules: string[];
}

export interface VisualIntelligenceResult {
  score: number;
  decision: "accept" | "refine" | "reject";
  technicalQA: TechnicalQAResult;
  aiTrace: AITraceResult;
  domainCritic: DomainCriticResult;
  styleIdentity: StyleIdentityResult;
  humanPreference: { score: number; reason: string };
  qualityGate: QualityGateResult;
}
