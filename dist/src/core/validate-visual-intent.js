export function validateVisualIntent(intent, retryBudgetRemaining = 1) {
    const issues = [];
    if (!intent.narrative.hook.trim())
        issues.push("weak_visual_hook");
    if (!intent.narrative.title.trim())
        issues.push("story_missing");
    if (intent.scene.supportingElements.length > 2)
        issues.push("too_many_supporting_elements");
    if (intent.composition.focalPoints !== 1)
        issues.push("multiple_focal_points");
    if (intent.composition.negativeSpace < 0.3)
        issues.push("insufficient_negative_space");
    const score = Math.max(0, 100 - issues.length * 15);
    return {
        passed: issues.length === 0,
        score,
        issues,
        action: issues.length === 0 ? "accept" : "regenerate",
        retryBudgetRemaining
    };
}
