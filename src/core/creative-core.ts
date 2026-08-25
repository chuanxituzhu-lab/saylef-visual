import type { CreativeCoreBrief, CreativeCoreInput } from "../contracts/creative-core.js";
import type { RandomSource } from "./random.js";

export function buildCreativeCore(input: CreativeCoreInput, rng: RandomSource): CreativeCoreBrief {
  const { context, story, account } = input;
  const motif = rng.pick(account.recurringMotifs);
  return {
    accountId: account.accountId,
    domain: account.domain,
    emotion: story.emotion,
    poeticContext: `${context.season} / ${context.timePoint.labelEn} / ${context.poeticMood}`,
    narrative: story.microStory,
    storyMoment: story.storyMoment,
    visualHook: story.visualHook,
    controlledSerendipity: motif,
    constraints: [
      "one emotion",
      "one unresolved story moment",
      "one visual hook",
      `stay inside ${account.label}`,
      ...account.forbiddenMotifs.map((motifName) => `forbid ${motifName}`)
    ]
  };
}
