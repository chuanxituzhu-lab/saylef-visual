import type { StoryContract } from "../contracts/story.js";
import type { Ratio, VisualIntent } from "../contracts/visual-intent.js";
import { VISUAL_INTENT_VERSION } from "../contracts/visual-intent.js";
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

export function compileVisualIntent(story: StoryContract, ratio: Ratio, rng: RandomSource): VisualIntent {
  const palette = palettes[story.source.season];
  return {
    version: VISUAL_INTENT_VERSION,
    time: story.source.timePoint,
    narrative: {
      title: story.title,
      emotion: story.emotion,
      moment: story.storyMoment,
      hook: story.visualHook,
      openEnding: true
    },
    scene: {
      hero: rng.pick(heroBySpace),
      entrance: rng.pick(entrances),
      supportingElements: ["one monumental seasonal tree"]
    },
    composition: {
      focalPoints: 1,
      negativeSpace: 0.38,
      visualNoise: "low",
      depth: "immersive"
    },
    color: {
      huePurity: "high",
      saturation: "high",
      brightness: "high",
      ...palette
    },
    material: "watercolor_gouache_acrylic_impasto",
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
      spatialNarrativeWeight: 0.6,
      pigmentLanguageWeight: 0.4,
      photographyDrift: "forbidden",
      imageText: "forbidden"
    },
    format: { ratio, recompose: true }
  };
}
