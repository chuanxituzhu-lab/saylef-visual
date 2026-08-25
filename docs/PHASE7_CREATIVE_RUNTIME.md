# Phase 7 · Creative Runtime

## Runtime flow

```text
User Intent
  ↓
Account DNA Runtime
  ↓
Creative Core
  ↓
Domain Router
  ↓
Direction Engine
  ↓
Visual Intent Protocol
  ↓
Provider Prompt
  ↓
Consistency Guard
  ↓
Visual Intelligence
  ├─ Technical QA
  ├─ AI Trace
  ├─ Painting Critic / Photography Critic
  ├─ Style Identity
  ├─ Human Preference
  └─ Quality Gate
```

## Boundary rules

- Provider adapters compile and execute prompts; they do not mutate Account DNA.
- Critics score the selected domain; they do not rewrite Style DNA.
- Human preference can rank accepted candidates but cannot bypass a professional quality gate.
- Simple and Pro are interface modes over the same contracts. Pro only exposes additional direction overrides.
- API providers remain reserved behind the existing adapter boundary.

## Account DNA defaults

`account-a` routes to Painting and keeps the high-purity pigment language. `account-b` routes to Photography and adds natural-light camera direction. A request may override the domain explicitly; the runtime then selects the matching DNA profile rather than silently mixing domains.
