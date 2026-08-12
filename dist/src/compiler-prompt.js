export function compileBasePrompt(intent) {
    const support = intent.scene.supportingElements.join(", ");
    return [
        `Create a ${intent.format.ratio} visual storytelling artwork titled “${intent.narrative.title}”.`,
        `Emotion: ${intent.narrative.emotion}. Story moment: ${intent.narrative.moment}.`,
        `Visual hook: ${intent.narrative.hook}. Keep the ending unresolved and contemplative.`,
        `Hero subject: ${intent.scene.hero}. Entrance into the image: ${intent.scene.entrance}. Supporting element: ${support}.`,
        `Composition: exactly one focal point, low visual noise, immersive depth, about ${Math.round(intent.composition.negativeSpace * 100)}% breathing/negative space.`,
        `Color: extremely pure hue relationships, very high saturation, high brightness, clean luminous pigments. Base ${intent.color.base}; primary ${intent.color.primary}; structural dark ${intent.color.structure}; one accent ${intent.color.accent}.`,
        `Colors must be vivid yet the scene must remain quiet. No gray contamination, no muddy mixing, no faded or vintage cast.`,
        `Material: watercolor transparency combined with gouache and acrylic impasto, restrained palette-knife texture, subtle bas-relief tactility, handcrafted but refined.`,
        `Mood: healing, serene, fresh, poetic, cinematic in storytelling but painterly rather than photographic.`,
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
    "busy decorative background",
    "text",
    "logo",
    "watermark"
].join(", ");
