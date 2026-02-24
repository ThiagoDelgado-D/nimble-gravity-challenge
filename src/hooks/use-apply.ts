import { useCallback } from "react";
import { applyToJob } from "../api/api";
import type { ApplyPayload, ApplyStatus } from "../types";
import { useAsync } from "./use-async";

export interface UseApplyReturn {
  status: ApplyStatus;
  error: string | null;
  submit: (payload: ApplyPayload) => Promise<void>;
}
// Derives ApplyStatus from the generic state provided by useAsync.
// Each JobItem creates its own useApply instance — state is not shared.
export function useApply(): UseApplyReturn {
  const { loading, error, data, execute } = useAsync<{ ok: boolean }>(
    applyToJob as (...args: unknown[]) => Promise<{ ok: boolean }>,
  );

  const submit = useCallback(
    (payload: ApplyPayload) => execute(payload),
    [execute],
  );

  // status derives from server response: ok=true → success
  const status: ApplyStatus = loading
    ? "loading"
    : error !== null
      ? "error"
      : data?.ok === true
        ? "success"
        : "idle";

  return { status, error, submit };
}