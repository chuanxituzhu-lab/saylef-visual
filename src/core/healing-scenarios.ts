import type {
  HealingScenarioId,
  HealingScenarioProfile,
  HealingScenarioSelection
} from "../contracts/healing-scenario.js";
import { HEALING_SCENARIOS } from "../contracts/healing-scenario.js";
import type { RandomSource } from "./random.js";

export function resolveHealingScenario(
  selection: HealingScenarioSelection | undefined,
  rng: RandomSource
): HealingScenarioProfile {
  if (selection && selection !== "auto") {
    const requested = HEALING_SCENARIOS.find((scenario) => scenario.id === selection);
    if (requested) return requested;
  }
  return rng.pick(HEALING_SCENARIOS);
}

export function getHealingScenarioLabel(id: HealingScenarioId): string {
  return HEALING_SCENARIOS.find((scenario) => scenario.id === id)?.label || id;
}
