# Phase 5 — Codex Host Integration

## Decision

saylef-visual does not require an embedded OpenAI API key for the Codex deployment path. The core runtime compiles a host-neutral image job and Codex invokes an approved image-generation capability already available in its environment.

## Boundary

The project owns:

- Visual Narrative System v2.0
- Visual Intent Protocol v1.0
- Story/Poetic/Color/Composition logic
- provider prompt compilation
- consistency guard
- host invocation plan

The host owns:

- authentication
- tool/app availability
- image-generation execution
- artifact transport

This prevents credential handling and provider network clients from entering the MVP core.

## Flow

CreationRequest -> Visual Runtime -> Guard -> Provider Prompt -> HostInvocationPlan -> Codex/Host image tool -> Image Artifact

## Provider behavior

- OpenAI: use the host's approved OpenAI image-generation capability when present.
- Gemini/Qwen: use the corresponding approved host tool/app when present; otherwise return the compiled prompt without pretending generation succeeded.
- Midjourney: later adapter; do not emulate unofficial network calls in MVP.
