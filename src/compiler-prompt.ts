import type { VisualIntent } from "./contracts/visual-intent.js";

export function compileBasePrompt(intent: VisualIntent): string {
  const support = intent.scene.supportingElements.join(", ");
  return [
    `Create a ${intent.format.ratio} visual storytelling artwork. Metadata title: "${intent.narrative.title}". Do not render the title in the image.`,
   `Emotion: ${intent.narrative.emotion}. Story moment: ${intent.narrative.moment}.`,
    `Healing scene: ${intent.healing.label}. Restorative cue: ${intent.healing.cue}. Keep the emotional support quiet, safe and non-clinical.`,
    `Visual hook: ${intent.narrative.hook}. Keep the ending unresolved and contemplative.`,
    `Hero subject: ${intent.scene.hero}. Entrance into the image: ${intent.scene.entrance}. Supporting element: ${support}.`,
    `Composition: exactly one focal point, low visual noise, immersive depth, about ${Math.round(intent.composition.negativeSpace * 100)}% breathing/negative space.`,
    `Color: extremely pure hue relationships, very high saturation, high brightness, clean luminous pigments. Base ${intent.color.base}; primary ${intent.color.primary}; structural dark ${intent.color.structure}; one accent ${intent.color.accent}.`,
    `Colors must be vivid yet the scene must remain quiet. No gray contamination, no muddy mixing, no faded or vintage cast.`,
    `Material: watercolor transparency combined with gouache and acrylic impasto, restrained palette-knife texture, subtle bas-relief tactility, handcrafted but refined.`,
    `Mood: healing, serene, fresh, poetic, cinematic in storytelling but painterly rather than photographic.`,
    `Story Lock: one unresolved story, one hero, one clear entrance path, and one meaningful moment; keep distant scenery quiet and leave a visual question open.`,
    `Color Lock: use 60% cinematic spatial storytelling and 40% high-purity pigment language: warm ivory white, deep stable charcoal, one vivid primary, one clear accent, and clean pigment steps instead of gray-green photographic gradients.`,
    `Material Lock: preserve watercolor transparency, gouache and acrylic impasto, restrained palette-knife texture, subtle hand-worked relief, and handcrafted painterly edges; never ordinary photography or glossy 3D rendering.`,
    `Image policy: the artwork layer must contain no text, Chinese characters, English letters, numbers, title, caption, calligraphy, seal, stamp, signature, watermark or logo. The title remains metadata only.`,
    `Prioritize story, atmosphere and immersion over decorative detail. Fewer elements, stronger meaning.`
  ].join(" ");
}

export const DEFAULT_NEGATIVE_PROMPT = [
  "cluttered composition",
  "too many flowers",
  "too many buildings",
  "multiple focal points",
  "gray cast",
  "muddy colors",
  "low saturation",
  "vintage filter",
  "sepia",
  "plastic 3D render",
  "photorealistic photography",
  "cinematic photo",
  "ordinary landscape photography",
  "glossy CGI",
  "generic AI concept art",
  "gray-green photographic gradients",
  "over-detailed distant scenery",
  "decorative clutter",
  "busy decorative background",
  "any text",
  "Chinese characters",
  "English letters",
  "numbers",
  "title",
  "caption",
  "calligraphy",
  "seal",
  "stamp",
  "signature",
  "watermark",
  "logo"
].join(", ");
