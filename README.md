# Visual Story Studio MVP

A local-first AI Visual Storytelling Studio built around a frozen Visual Narrative System.

**Creative constitution:** high-saturation color, low-density content; bright light, low-stimulation composition; vivid life, quiet emotion.

## Current phase
Phase 6: MVP Web UI + Agent Harness Integration.

## Run
```bash
npm install
npm run build
npm test
npm start
```
Then open `http://127.0.0.1:4173`.

## Interfaces
- Web UI
- REST: `POST /api/create`
- CLI: `npm run cli -- ...`
- Agent harness: `runVisualStoryAgent()`
- Codex host job: `HostInvocationPlan`

The Web UI now includes one-click random generation for idea, season, emotion and ratio, plus an emotion selector.

Host mode also returns a Codex/OpenAI reserved-frame handoff and renders an honest composition placeholder. It is not marked as generated until an image artifact exists.

The visual guard now freezes four locks: one unresolved story moment, one hero with one entrance path and breathing space, a 60/40 cinematic-space to high-purity-pigment balance, and handcrafted painterly material. The image layer forbids text, Chinese or English characters, numbers, titles, calligraphy, seals, stamps, signatures, watermarks and logos. Photography drift, glossy 3D rendering and gray-green photographic gradients are rejected through the prompt policy and consistency guard.

## Provider strategy
Host-first now. OpenAI/Gemini/Qwen API integration is reserved behind adapters for later and does not alter the core protocol.
