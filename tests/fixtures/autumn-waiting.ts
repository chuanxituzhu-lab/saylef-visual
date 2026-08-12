import type { VisualIntent } from "../../src/contracts/visual-intent.js";

export const autumnWaitingFixture: VisualIntent = {
  version: "visual-intent/1.0",
  narrative: {
    title: "门还开着",
    emotion: "quiet_waiting",
    moment: "after_rain_at_sunset",
    hook: "满山金黄中唯一的一扇朱红门",
    openEnding: true
  },
  scene: {
    hero: "ivory mountain cottage",
    entrance: "wet stone path",
    supportingElements: ["ancient tree"]
  },
  composition: {
    focalPoints: 1,
    negativeSpace: 0.35,
    visualNoise: "low",
    depth: "immersive"
  },
  color: {
    huePurity: "high",
    saturation: "high",
    brightness: "high",
    base: "warm ivory",
    primary: "pure golden yellow",
    structure: "deep charcoal",
    accent: "vermilion red"
  },
  material: "watercolor_gouache_acrylic_impasto",
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
  format: { ratio: "3:4", recompose: true }
};
