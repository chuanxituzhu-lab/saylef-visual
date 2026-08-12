import type { ProviderRegistryConfig } from "../../contracts/harness.js";

export const DEFAULT_PROVIDER_REGISTRY: ProviderRegistryConfig = {
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

export function getApiProviderReservation(
  provider: keyof ProviderRegistryConfig["api"],
  config: ProviderRegistryConfig = DEFAULT_PROVIDER_REGISTRY
) {
  return {
    provider,
    ...config.api[provider],
    status: "reserved" as const
  };
}
