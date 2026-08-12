# Phase 4 — Core Runtime

Status: implemented.

## Runtime chain

CreationRequest -> PoeticContext -> StoryContract -> VisualIntent -> ConsistencyGuard -> ProviderPrompt

## Implemented

- Seeded controlled-serendipity random source.
- Four-season poetic context banks.
- Story engine enforcing one emotion / one story / one moment / one hook.
- Visual Intent compiler with frozen high-purity, high-saturation, high-brightness color policy.
- Low-density composition and negative-space constraints.
- Provider-specific prompt adapters for OpenAI, Gemini and Qwen.
- Network generation intentionally deferred: Phase 4 adapters compile provider prompts only.
- Reproducibility tests and guard tests.

## Boundary

No UI, account system, publishing, marketplace, video, LoRA or provider HTTP integration is added here.
