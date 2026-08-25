export type GuardIssue =
  | "too_many_supporting_elements"
  | "weak_visual_hook"
  | "multiple_focal_points"
  | "insufficient_negative_space"
  | "muddy_colors"
  | "low_saturation"
  | "low_brightness"
  | "style_drift"
  | "photography_drift"
  | "forbidden_image_text"
  | "story_missing"
  | "technical_qa_failed"
  | "ai_trace_detected"
  | "domain_quality_below_gate"
  | "style_identity_below_gate";

export interface GuardResult {
  passed: boolean;
  score: number;
  issues: GuardIssue[];
  action: "accept" | "regenerate";
  retryBudgetRemaining: 0 | 1;
}
