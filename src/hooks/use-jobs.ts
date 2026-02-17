import { useEffect } from "react";
import { getJobs } from "../api/api";
import type { Job } from "../types";
import { useAsync } from "./use-async";

export interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

// Automatically triggers when `enabled` becomes true.
// The caller decides when to enable it (e.g., once the candidate has been resolved).
export function useJobs(enabled: boolean): UseJobsReturn {
  const { data, loading, error, execute } = useAsync<Job[]>(
    getJobs as (...args: unknown[]) => Promise<Job[]>,
  );

  useEffect(() => {
    if (enabled) execute();
  }, [enabled, execute]);

  return { jobs: data ?? [], loading, error };
}
