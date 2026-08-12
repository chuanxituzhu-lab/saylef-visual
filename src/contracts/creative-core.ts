import type { AccountDNA } from "./account-dna.js";
import type { PoeticContext } from "./poetic-context.js";
import type { StoryContract } from "./story.js";

export interface CreativeCoreBrief {
  accountId: string;
  domain: AccountDNA["domain"];
  emotion: string;
  poeticContext: string;
  narrative: string;
  storyMoment: string;
  visualHook: string;
  controlledSerendipity: string;
  constraints: readonly string[];
}

export interface CreativeCoreInput {
  context: PoeticContext;
  story: StoryContract;
  account: AccountDNA;
}
