import type { StoryContract } from "../contracts/story.js";
import type { Ratio, VisualIntent } from "../contracts/visual-intent.js";
import { VISUAL_INTENT_VERSION } from "../contracts/visual-intent.js";
import type { DirectionSpec } from "../contracts/direction.js";
import type { VisualDomain } from "../contracts/domain.js";
import type { RandomSource } from "./random.js";

const palettes = {
  spring: { base: "warm pure ivory", primary: "luminous spring green", structure: "deep charcoal", accent: "pure vermilion red" },
  summer: { base: "warm pure ivory", primary: "brilliant emerald green", structure: "deep charcoal", accent: "clear cobalt blue" },
  autumn: { base: "warm pure ivory", primary: "pure golden yellow", structure: "deep charcoal", accent: "pure vermilion red" },
  winter: { base: "clean snow ivory", primary: "clear sky blue", structure: "deep charcoal", accent: "pure vermilion red" }
} as const;

const heroBySpace: readonly string[] = [
  "a small ivory rural cottage",
  "a solitary old tree beside a quiet dwelling",
  "a simple whitewashed mountain home"
];
const entrances = ["a restrained winding stone path", "a short flight of weathered stone steps", "a narrow path entering from the foreground"] as const;
const photographyHeroes = ["one person-sized gesture in a lived-in place", "a real surface holding the story moment", "one decisive human-scale subject"] as const;

export interface VisualIntentCompilerOptions {
  domain?: VisualDomain;
  accountId?: string;
  direction?: DirectionSpec;
}

export function compileVisualIntent(
  story: StoryContract,
  ratio: Ratio,
  rng: RandomSource,
  options: VisualIntentCompilerOptions = {}
): VisualIntent {
  const domain = options.domain ?? "painting";
  const palette = palettes[story.source.season];
  const hero = domain === "photography" ? rng.pick(photographyHeroes) : rng.pick(heroBySpace);
  const entrance = rng.pick(entrances);
  return {
    version: VISUAL_INTENT_VERSION,
    domain,
    ...(options.accountId ? { accountId: options.accountId } : {}),
    ...(options.direction ? { direction: options.direction } : {}),
    time: story.source.timePoint,
    narrative: {
      title: story.title,
      emotion: story.emotion,
      moment: story.storyMoment,
      hook: story.visualHook,
      openEnding: true
    },
    scene: {
      hero,
      entrance,
      supportingElements: [domain === "photography" ? "one human-scale trace" : "one monumental seasonal tree"]
    },
    composition: {
      focalPoints: 1,
      negativeSpace: options.direction?.composition.negativeSpace ?? 0.38,
      visualNoise: "low",
      depth: options.direction?.composition.depth === "natural" ? "immersive" : "immersive"
    },
    color: domain === "photography"
      ? {
          huePurity: "high",
          saturation: "high",
          brightness: "high",
          base: "clear natural daylight",
          primary: "fresh living green",
          structure: "stable natural shadow",
          accent: "one honest warm accent"
        }
      : { huePurity: "high", saturation: "high", brightness: "high", ...palette },
    material: domain === "photography" ? "natural_light_documentary_capture" : "watercolor_gouache_acrylic_impasto",
    healing: {
      scenario: story.source.healingScenario,
      label: story.source.healingScenarioLabel,
      labelEn: story.source.healingScenarioLabelEn,
      cue: story.source.healingCue,
      cueEn: story.source.healingCueEn,
      tone: "restorative_non_clinical"
    },
    locks: {
      story: "one_unresolved_moment",
      composition: "one_hero_one_entrance_breathing_space",
      color: "high_purity_pigment_steps",
      material: "handcrafted_painterly"
    },
    rendering: {
      spatialNarrativeWeight: options.direction?.spatialNarrativeWeight ?? 0.6,
      pigmentLanguageWeight: options.direction?.pigmentLanguageWeight ?? 0.4,
      photographyDrift: "forbidden",
      imageText: "forbidden"
    },
    format: { ratio, recompose: true }
  };
}
