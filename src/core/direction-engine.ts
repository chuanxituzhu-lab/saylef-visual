import type { AccountDNA } from "../contracts/account-dna.js";
import type { CameraDirection, DirectionSpec } from "../contracts/direction.js";
import type { VisualDomain } from "../contracts/domain.js";
import type { Ratio } from "../contracts/visual-intent.js";
import type { RandomSource } from "./random.js";

export interface DirectionInput {
  domain: VisualDomain;
  account: AccountDNA;
  ratio: Ratio;
  hero: string;
  entrance: string;
  camera?: Partial<CameraDirection>;
}

const focalLengths = ["35mm", "50mm", "85mm"] as const;
const apertures = ["f/2.8", "f/4", "f/5.6"] as const;
const isoValues = ["ISO 100", "ISO 200", "ISO 400"] as const;
const shutters = ["1/125s", "1/250s", "1/500s"] as const;

function buildCamera(overrides: Partial<CameraDirection> | undefined, rng: RandomSource): CameraDirection {
  return {
    focalLength: overrides?.focalLength ?? rng.pick(focalLengths),
    aperture: overrides?.aperture ?? rng.pick(apertures),
    iso: overrides?.iso ?? rng.pick(isoValues),
    shutter: overrides?.shutter ?? rng.pick(shutters),
    depthOfField: overrides?.depthOfField ?? "natural subject separation, never fake bokeh",
    focusDistance: overrides?.focusDistance ?? "focus on the story moment",
    angle: overrides?.angle ?? "eye-level, human presence",
    whiteBalance: overrides?.whiteBalance ?? "honest daylight white balance"
  };
}

export function buildDirection(input: DirectionInput, rng: RandomSource): DirectionSpec {
  const { domain, account } = input;
  const photography = domain === "photography";
  return {
    domain,
    composition: {
      focalPoint: input.hero,
      entrance: input.entrance,
      negativeSpace: account.compositionBias.minimumNegativeSpace + (photography ? 0.02 : 0.08),
      depth: account.compositionBias.depth,
      visualDensity: account.compositionBias.visualNoise
    },
    color: photography
      ? {
          palette: account.colorTerritory,
          contrast: "natural",
          saturation: "natural"
        }
      : {
          palette: account.colorTerritory,
          contrast: "controlled",
          saturation: "high"
        },
    lighting: photography
      ? {
          source: "available natural light",
          quality: "clear",
          direction: "let light describe the real surface and decisive gesture",
          avoid: ["fake bokeh", "HDR halo", "conflicting shadows", "overlit subject"]
        }
      : {
          source: "one quiet natural light direction",
          quality: "soft",
          direction: "light serves the unresolved story moment",
          avoid: ["god rays", "HDR halo", "uniform detail lighting", "glossy CGI glow"]
        },
    material: photography ? "natural_light_documentary_capture" : "watercolor_gouache_acrylic_impasto",
    format: input.ratio,
    spatialNarrativeWeight: photography ? 0.7 : 0.6,
    pigmentLanguageWeight: photography ? 0.3 : 0.4,
    camera: photography ? buildCamera(input.camera, rng) : undefined
  };
}
