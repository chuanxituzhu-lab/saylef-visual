export function buildCodexInvocationPlan(intent, guard, prompt, preferredProvider = "auto") {
    return {
        version: "host-invocation/1.0",
        executor: "host-agent",
        capability: "image_generation",
        preferredProvider,
        intent,
        prompt,
        guard,
        instructions: {
            requireGuardPass: true,
            regenerateOnFailure: true,
            maxRetries: 1,
            preserveAspectRatio: true,
            returnArtifact: true
        }
    };
}
