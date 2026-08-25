import type { VisualDomain } from "./domain.js";

export const ACCOUNT_DNA_VERSION = "account-dna/1.0" as const;

export interface AccountDNA {
  version: typeof ACCOUNT_DNA_VERSION;
  accountId: string;
  label: string;
  domain: VisualDomain;
  styleVersion: string;
  emotionalTerritory: readonly string[];
  storyTerritory: readonly string[];
  colorTerritory: readonly string[];
  recurringMotifs: readonly string[];
  forbiddenMotifs: readonly string[];
  compositionBias: {
    focalPoints: 1;
    minimumNegativeSpace: number;
    visualNoise: "low";
    depth: "immersive" | "natural";
  };
  qualityGate: {
    artisticMinimum: number;
    styleIdentityMinimum: number;
    signatureMinimum: number;
    aiTraceMaximum: number;
  };
}

export const PAINTING_ACCOUNT_DNA: AccountDNA = {
  version: ACCOUNT_DNA_VERSION,
  accountId: "account-a",
  label: "SAYLEF Painting World",
  domain: "painting",
  styleVersion: "style-dna/2.0",
  emotionalTerritory: ["serenity", "healing", "quiet expectation", "belonging"],
  storyTerritory: ["return", "waiting", "a threshold", "an unfinished arrival"],
  colorTerritory: ["warm ivory", "deep charcoal", "high-purity seasonal color", "one clear accent"],
  recurringMotifs: ["one old tree", "a quiet dwelling", "a path entering the frame", "a small warm light"],
  forbiddenMotifs: ["text", "logo", "seal", "decorative clutter", "generic fantasy spectacle"],
  compositionBias: { focalPoints: 1, minimumNegativeSpace: 0.3, visualNoise: "low", depth: "immersive" },
  qualityGate: { artisticMinimum: 88, styleIdentityMinimum: 90, signatureMinimum: 93, aiTraceMaximum: 20 }
};

export const PHOTOGRAPHY_ACCOUNT_DNA: AccountDNA = {
  version: ACCOUNT_DNA_VERSION,
  accountId: "account-b",
  label: "SAYLEF Photography World",
  domain: "photography",
  styleVersion: "style-dna/photography-1.0",
  emotionalTerritory: ["presence", "quiet joy", "tender distance", "clear air"],
  storyTerritory: ["a witnessed instant", "human-scale traces", "a place after someone left", "ordinary wonder"],
  colorTerritory: ["fresh natural color", "clear whites", "stable shadows", "honest skin and material tones"],
  recurringMotifs: ["one decisive gesture", "natural light on a real surface", "a human-scale trace", "open breathing space"],
  forbiddenMotifs: ["fake bokeh", "HDR halo", "plastic skin", "perfect symmetry", "staged spectacle"],
  compositionBias: { focalPoints: 1, minimumNegativeSpace: 0.25, visualNoise: "low", depth: "natural" },
  qualityGate: { artisticMinimum: 86, styleIdentityMinimum: 90, signatureMinimum: 93, aiTraceMaximum: 15 }
};

export const ACCOUNT_DNA_REGISTRY: Readonly<Record<string, AccountDNA>> = {
  [PAINTING_ACCOUNT_DNA.accountId]: PAINTING_ACCOUNT_DNA,
  [PHOTOGRAPHY_ACCOUNT_DNA.accountId]: PHOTOGRAPHY_ACCOUNT_DNA
};

export function getAccountDNA(accountId?: string, domain?: VisualDomain): AccountDNA {
  if (accountId && ACCOUNT_DNA_REGISTRY[accountId]) {
    const account = ACCOUNT_DNA_REGISTRY[accountId];
    return domain && account.domain !== domain ? (domain === "photography" ? PHOTOGRAPHY_ACCOUNT_DNA : PAINTING_ACCOUNT_DNA) : account;
  }
  return domain === "photography" ? PHOTOGRAPHY_ACCOUNT_DNA : PAINTING_ACCOUNT_DNA;
}
