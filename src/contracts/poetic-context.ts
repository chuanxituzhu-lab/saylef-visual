export type Season = "auto" | "spring" | "summer" | "autumn" | "winter";
import type { HealingScenarioId, HealingScenarioSelection } from "./healing-scenario.js";
import type { TimePointProfile, TimePointSelection } from "./time-point.js";

export interface PoeticContextInput {
  season: Season;
  emotionHint?: string;
  userIdea?: string;
  healingScenario?: HealingScenarioSelection;
  timePoint?: TimePointSelection;
}

export interface PoeticContext {
  season: Exclude<Season, "auto">;
  time: string;
  timePoint: TimePointProfile;
  weather: string;
  space: string;
  imagery: string[];
  sound?: string;
  emotionSeed: string;
  poeticMood: string;
  healingScenario: HealingScenarioId;
  healingScenarioLabel: string;
  healingScenarioLabelEn: string;
  healingCue: string;
  healingCueEn: string;
}
