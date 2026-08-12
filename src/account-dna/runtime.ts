import type { CreationRequest } from "../contracts/runtime.js";
import type { VisualDomain } from "../contracts/domain.js";
import { getAccountDNA } from "../contracts/account-dna.js";

export interface AccountRuntime {
  domain: VisualDomain;
  account: ReturnType<typeof getAccountDNA>;
}

export function resolveAccountRuntime(request: CreationRequest): AccountRuntime {
  const domain = request.domain ?? (request.accountId === "account-b" ? "photography" : "painting");
  return { domain, account: getAccountDNA(request.accountId, domain) };
}
