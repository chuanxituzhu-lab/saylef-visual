import { createVisualStory } from "./core/runtime.js";

const painting = createVisualStory({ season: "auto", provider: "openai", ratio: "3:4", domain: "painting", seed: 20260811 });
const photography = createVisualStory({ season: "auto", provider: "openai", ratio: "4:5", domain: "photography", accountId: "account-b", promptLanguage: "en", seed: 20260812 });
if (!painting.intelligence.qualityGate.passed || !photography.intelligence.qualityGate.passed) {
  throw new Error("smoke_quality_gate_failed");
}
console.log(JSON.stringify({
  painting: { domain: painting.intent.domain, score: painting.intelligence.score, decision: painting.intelligence.decision },
  photography: { domain: photography.intent.domain, score: photography.intelligence.score, decision: photography.intelligence.decision }
}, null, 2));
