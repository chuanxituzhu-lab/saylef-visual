export const VISUAL_INTENT_VERSION = "visual-intent/1.0" as const;

export type Ratio = "1:1" | "3:4" | "4:5" | "9:16" | "16:9";

export interface VisualIntent {
  version: typeof VISUAL_INTENT_VERSION;
  narrative: {
    title: string;
    emotion: string;
    moment: string;
    hook: string;
    openEnding: true;
  };
  scene: {
    hero: string;
    entrance: string;
    supportingElements: string[];
  };
  composition: {
    focalPoints: 1;
    negativeSpace: number;
    visualNoise: "low";
    depth: "immersive";
  };
  color: {
    huePurity: "high";
    saturation: "high";
    brightness: "high";
    base: string;
    primary: string;
    structure: string;
    accent: string;
  };
  material: "watercolor_gouache_acrylic_impasto";
  format: {
    ratio: Ratio;
    recompose: true;
  };
}
