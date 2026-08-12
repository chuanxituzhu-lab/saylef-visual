import type { CreationRequest, RuntimeResult } from "./runtime.js";
import type { HostInvocationPlan } from "./invocation.js";

export type ExecutionMode = "host" | "api";

export interface ApiProviderConfig {
  enabled: boolean;
  baseUrl?: string;
  model?: string;
  apiKeyEnv?: string;
}

export interface ProviderRegistryConfig {
  defaultMode: ExecutionMode;
  api: {
    openai: ApiProviderConfig;
    gemini: ApiProviderConfig;
    qwen: ApiProviderConfig;
  };
}

export interface AgentCreateRequest extends CreationRequest {
  executionMode?: ExecutionMode;
}

export interface AgentCreateResult extends RuntimeResult {
  executionMode: ExecutionMode;
  hostJob?: HostInvocationPlan;
  apiStatus?: "reserved_not_executed";
}
