import { useCallback } from "react";
import { getCandidate } from "../api/api";
import type { Candidate } from "../types";
import { useAsync } from "./use-async";

export interface UseCandidateReturn {
  candidate: Candidate | null;
  loading: boolean;
  error: string | null;
  fetch: (email: string) => Promise<void>;
  reset: () => void;
}

export function useCandidate(): UseCandidateReturn {
  const { data, loading, error, execute, reset } = useAsync<Candidate>(
    getCandidate as (...args: unknown[]) => Promise<Candidate>,
  );

  const fetch = useCallback((email: string) => execute(email), [execute]);

  return { candidate: data, loading, error, fetch, reset };
}
