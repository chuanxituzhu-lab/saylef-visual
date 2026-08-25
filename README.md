# SAYLEF Visual

![SAYLEF Visual — Visual Director Workbench](docs/assets/saylef-visual-readme-cover.png)

> Visual Director Workbench: One Creative Core routes one story through two visual domains, while Visual Intelligence protects composition, color, material and style identity.

saylef-visual is a local-first AI-native visual creation and aesthetic intelligence engine.

The architecture is frozen as:

> One Creative Core + Two Visual Domains + One Visual Intelligence System

The core never depends on a model provider. Painting and Photography are routed through Account DNA and Direction Engine profiles, then evaluated by the same quality pipeline.

## Current release · v0.2.0

This is the current development baseline for the Visual Director Workbench.

Core release notes:

- One Creative Core turns a short feeling into a story moment, visual hook, composition, color, light and material direction.
- Painting and Photography use separate Account DNA profiles while sharing one Visual Intelligence quality pipeline.
- Healing scenarios, explicit time points, pure Chinese or pure English prompts, no-text image rules, Style Drift Guard and Codex reserved-frame handoff are included.
- The Web UI includes Simple / Pro direction, domain navigation, reserved-frame preview and download, prompt copy, and the visual intelligence scorecard.

## Versioning and update policy

- `VERSION` and `package.json.version` are the source of truth and must stay identical.
- Use Semantic Versioning: patch for fixes, minor for compatible features, major for breaking architecture or contract changes. While the product is pre-1.0, feature releases advance the minor version.
- Every release updates the version, adds a concise core note in this README, and uses a versioned commit or tag such as `v0.2.0`.
- The README release section must explain the core user-visible change; implementation details belong in the relevant `docs/` file.

## Current phase

Phase 7: Creative Core Runtime + Account DNA + Direction Engine + Visual Intelligence.

Implemented in this phase:

- Creative Core brief with emotion, poetic context, story moment, visual hook and controlled serendipity.
- Account DNA Runtime with independent Painting and Photography profiles.
- Direction Engine with composition, color, light, material and optional camera controls.
- Visual Intent routing for `painting` and `photography` without changing the provider contract.
- Painting Critic: 境 · 气 · 章 · 色 · 笔 · 事 · 格.
- Photography Critic: Impact, Story, Composition, Light, Color, Atmosphere, Originality and Technical.
- Visual Intelligence: Technical QA, AI Trace, Domain Critic, Style Identity, Human Preference and Quality Gate.
- Simple / Pro UI. Simple keeps the interface compact; Pro exposes camera direction fields for Photography.

Painting remains locked to high hue purity, high saturation, high brightness, low visual noise and handcrafted pigment language. Photography remains locked to natural light, honest material, believable perspective and low AI trace. Neither domain may introduce text, logos, seals, signatures or watermarks into the artwork layer.

## Run

```bash
npm install
npm run build
npm test
npm run smoke
npm start
```

Open `http://127.0.0.1:4173`.

## Interfaces

- Web UI: Simple / Pro creation workbench.
- REST: `POST /api/create`.
- CLI: `npm run cli -- ...`.
- Agent harness: `runVisualStoryAgent()`.
- Codex host job: `HostInvocationPlan` with an honest reserved-frame handoff.
- API provider adapters: reserved for later; no API key or network client is required by the core.

## Quality gates

The runtime first applies the consistency guard, then evaluates Visual Intelligence. A candidate is accepted only when Technical QA, AI Trace, Domain Critic, Style Identity and Signature all pass the selected Account DNA thresholds.
