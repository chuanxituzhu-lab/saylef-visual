import { runVisualStoryAgent } from "../harness/visual-story-agent.js";
export function runCli(args) {
    const request = { season: "auto" };
    for (let i = 0; i < args.length; i++) {
        const value = args[i + 1];
        if (args[i] === "--idea" && value)
            request.userIdea = value;
        if (args[i] === "--season" && value)
            request.season = value;
        if (args[i] === "--emotion" && value)
            request.emotionHint = value;
        if (args[i] === "--ratio" && value)
            request.ratio = value;
        if (args[i] === "--provider" && value)
            request.provider = value;
        if (args[i] === "--mode" && value)
            request.executionMode = value;
        if (args[i] === "--seed" && value)
            request.seed = Number(value);
    }
    return JSON.stringify(runVisualStoryAgent(request), null, 2);
}
