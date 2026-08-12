# Phase 6 — MVP Web UI + Agent Harness Integration

## Implemented
- Local-first zero-framework Web UI served by Node built-ins.
- REST `/api/create` endpoint and `/api/health`.
- Stable `runVisualStoryAgent()` harness entry point.
- Host-first execution that emits a Codex/Agent-compatible `HostInvocationPlan`.
- API provider reservation config for OpenAI, Gemini and Qwen without credentials/network clients.
- CLI interface for Codex/Claude Code/other harnesses.
- Agent operating contract in `agents/visual-story-agent/AGENT.md`.

## Boundary
The MVP core never stores API credentials. API clients remain a future adapter layer. Host mode is immediately usable by capable agents; provider APIs can be connected later without changing Visual Intent or Style DNA.

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
