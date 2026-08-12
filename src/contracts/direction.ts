import type { Ratio } from "./visual-intent.js";
import type { VisualDomain } from "./domain.js";

export interface CameraDirection {
  focalLength: string;
  aperture: string;
  iso: string;
  shutter: string;
  depthOfField: string;
  focusDistance: string;
  angle: string;
  whiteBalance: string;
}

export interface DirectionSpec {
  domain: VisualDomain;
  composition: {
    focalPoint: string;
    entrance: string;
    negativeSpace: number;
    depth: "immersive" | "natural";
    visualDensity: "low";
  };
  color: {
    palette: readonly string[];
    contrast: "controlled" | "natural";
    saturation: "high" | "natural";
  };
  lighting: {
    source: string;
    quality: "soft" | "clear" | "controlled";
    direction: string;
    avoid: readonly string[];
  };
  material: string;
  format: Ratio;
  spatialNarrativeWeight: number;
  pigmentLanguageWeight: number;
  camera?: CameraDirection;
}
