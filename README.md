# Saylef Visual

![Saylef Visual — a quiet visual story in a golden mountain village](docs/assets/saylef-visual-hero.png)

Local-first MVP for turning a short feeling or idea into a structured visual story task.

The core is intentionally small and frozen around:

```text
Poetic Context -> Story -> Visual Intent -> Consistency Guard -> Host Invocation Plan
```

The product owns the creative logic and style constraints. The host owns image-tool execution. OpenAI, Gemini and Qwen adapters are reserved at the prompt boundary; no API key is required by this MVP.

## Run

Requires Node.js 18 or newer.

```powershell
npm test
npm run check
npm run build
npm start
```

Open `http://127.0.0.1:4173`.

## CLI

```powershell
node src/cli.mjs --season autumn --ratio 3:4 --idea "一个关于等待的安静故事"
```

The CLI and Web UI return the same `Visual Intent` structure. The current host plan is a verified handoff description; it does not pretend that a provider image was generated when no host image tool has run.
