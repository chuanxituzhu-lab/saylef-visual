---
name: visual-storytelling
summary: Generate quiet, immersive, high-chroma visual stories from the frozen Visual Narrative System v2.0 and hand them to the host agent's available image-generation capability.
---

# Visual Storytelling Skill

## Purpose

Turn a short creative intent into one restrained, story-led image. The host agent (for example Codex) performs the actual image-generation action with whatever approved image-generation capability is available in that environment. This skill does not require or manage an OpenAI API key.

## Frozen creative constitution

- High saturation belongs to the color; low density belongs to the content.
- High brightness belongs to the light; low stimulation belongs to the composition.
- Vividness expresses life; the emotional tone remains quiet.
- Use one emotion, one story, one moment, one visual hook.
- Use Chinese classical poetic mood as semantic inspiration, not literal poem illustration.
- Leave narrative space unresolved so the viewer can enter the image emotionally.

## Runtime workflow

1. Parse the user's intent, season, desired emotion, ratio and optional provider preference.
2. Run the local Visual Story Studio runtime to produce Visual Intent Protocol v1.0.
3. Reject or revise any result that fails the consistency guard.
4. Compile the provider-specific prompt.
5. Invoke the host environment's approved image-generation capability directly.
6. Preserve the requested aspect ratio through recomposition rather than blind cropping.
7. Return the generated image artifact plus the title and micro-story when useful.

## Tool discovery

Do not hard-code a network API call when the host can already generate images. Prefer the host's native or approved image-generation tool/app. If a requested third-party provider (Gemini, Qwen, Midjourney, etc.) is not available in the host environment, report that provider as unavailable and keep the compiled prompt ready for another adapter. Do not silently substitute providers when the user explicitly chose one.

## Quality gate

Before generation, require:

- one dominant focal point;
- low visual noise;
- generous breathing room;
- pure hue, high saturation, high brightness;
- warm clean ivory whites and stable deep blacks;
- no gray cast, vintage fading, muddy mixing, clutter, decorative overload or generic fantasy noise;
- a visible story entrance such as a path, door, bridge, window, stream, light or gaze direction;
- a story moment that feels just-before, during, or just-after something meaningful.

Retry at most once when the guard fails or the generated result visibly violates the frozen DNA.
