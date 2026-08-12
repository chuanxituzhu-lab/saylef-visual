export type Season = "auto" | "spring" | "summer" | "autumn" | "winter";

export interface PoeticContextInput {
  season: Season;
  emotionHint?: string;
  userIdea?: string;
}

export interface PoeticContext {
  season: Exclude<Season, "auto">;
  time: string;
  weather: string;
  space: string;
  imagery: string[];
  sound?: string;
  emotionSeed: string;
  poeticMood: string;
}
