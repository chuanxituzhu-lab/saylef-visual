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

## Provider strategy
Host-first now. OpenAI/Gemini/Qwen API integration is reserved behind adapters for later and does not alter the core protocol.
