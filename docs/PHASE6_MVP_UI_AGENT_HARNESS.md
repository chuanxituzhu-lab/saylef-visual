# Phase 6 — MVP Web UI + Agent Harness Integration

## Implemented
- Local-first zero-framework Web UI served by Node built-ins.
- REST `/api/create` endpoint and `/api/health`.
- Stable `runVisualStoryAgent()` harness entry point.
- Host-first execution that emits a Codex/Agent-compatible `HostInvocationPlan`.
- API provider reservation config for OpenAI, Gemini and Qwen without credentials/network clients.
- CLI interface for Codex/Claude Code/other harnesses.
- Agent operating contract in `agents/visual-story-agent/AGENT.md`.

## New interaction features
- One-click random generation for idea, season, emotion, healing scenario and ratio.
- Emotion dropdown backed by the runtime's supported emotion vocabulary.
- Healing-scenario dropdown backed by eight non-clinical restorative scene profiles.
- Codex/OpenAI reserved-frame preview with an explicit host image-generation handoff.

## Boundary
The MVP core never stores API credentials. API clients remain a future adapter layer. Host mode is immediately usable by capable agents; provider APIs can be connected later without changing Visual Intent or Style DNA.

The reserved frame is intentionally honest: it is a composition placeholder generated from the Visual Intent, while the host invocation plan tells Codex to call the available image tool. The UI must not claim an image was generated before an artifact is returned.

Healing scenarios are a controlled input to Poetic Context rather than a decorative UI label. They shape time, weather, space, imagery, sound, emotion seed and restorative cue, then flow through Story, Visual Intent and Provider Prompt.

## Run
```bash
npm run build
npm test
npm start
```
Open `http://127.0.0.1:4173`.

CLI:
```bash
npm run cli -- --idea "秋天，一个关于等待的安静故事" --season autumn --ratio 3:4
```
