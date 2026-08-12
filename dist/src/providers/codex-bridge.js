export function buildCodexInvocationPlan(intent, guard, prompt, preferredProvider = "auto") {
    const reservedPrompt = { ...prompt, provider: "openai" };
    return {
        version: "host-invocation/1.0",
        executor: "host-agent",
        capability: "image_generation",
        preferredProvider,
        intent,
        prompt,
        guard,
        reservedFrame: {
            status: "reserved",
            provider: "openai",
            kind: "codex-image-generation",
            label: "Codex 自动生成预留画面",
            prompt: reservedPrompt,
            instructions: {
                invokeHostImageTool: true,
                doNotClaimGeneratedUntilArtifactExists: true,
                preserveAspectRatio: true
            }
        },
        instructions: {
            requireGuardPass: true,
            regenerateOnFailure: true,
            maxRetries: 1,
            preserveAspectRatio: true,
            returnArtifact: true
        }
    };
}
