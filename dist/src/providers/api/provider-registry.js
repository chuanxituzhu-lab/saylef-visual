export const DEFAULT_PROVIDER_REGISTRY = {
    defaultMode: "host",
    api: {
        openai: {
            enabled: false,
            apiKeyEnv: "OPENAI_API_KEY"
        },
        gemini: {
            enabled: false,
            apiKeyEnv: "GEMINI_API_KEY"
        },
        qwen: {
            enabled: false,
            apiKeyEnv: "DASHSCOPE_API_KEY"
        }
    }
};
export function getApiProviderReservation(provider, config = DEFAULT_PROVIDER_REGISTRY) {
    return {
        provider,
        ...config.api[provider],
        status: "reserved"
    };
}
