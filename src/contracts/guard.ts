export type GuardIssue =
  | "too_many_supporting_elements"
  | "weak_visual_hook"
  | "multiple_focal_points"
  | "insufficient_negative_space"
  | "muddy_colors"
  | "low_saturation"
  | "low_brightness"
  | "style_drift"
  | "story_missing";

export interface GuardResult {
  passed: boolean;
  score: number;
  issues: GuardIssue[];
  action: "accept" | "regenerate";
  retryBudgetRemaining: 0 | 1;
}
