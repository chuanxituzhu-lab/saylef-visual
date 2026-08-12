import { createVisualStory } from "./core/runtime.js";
const result = createVisualStory({ season: "auto", provider: "openai", ratio: "3:4", seed: 20260811 });
console.log(JSON.stringify(result, null, 2));
