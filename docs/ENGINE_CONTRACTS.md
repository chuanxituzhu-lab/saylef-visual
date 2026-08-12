# Saylef Visual Engine Contracts

This MVP keeps the frozen pipeline small:

```text
CreationRequest
  -> PoeticContext
  -> StoryContract
  -> VisualIntent v1.0
  -> ConsistencyGuard
  -> HostInvocationPlan
```

`STYLE_DNA` is read-only. The core produces a provider-neutral `VisualIntent`; OpenAI, Gemini and Qwen remain reserved adapters, while the Codex host plan delegates execution to whatever image tool the host makes available.

The visual constraints are deliberately explicit: one emotion, one story, one moment, one hook, one focal point, low visual noise, generous negative space, high-purity/high-saturation/high-brightness color, and no gray pollution.
