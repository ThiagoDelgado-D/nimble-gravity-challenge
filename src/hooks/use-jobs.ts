import { useEffect } from "react";
import { getJobs } from "../api/api";
import type { Job } from "../types";
import { useAsync } from "./use-async";

export interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

// Se activa automáticamente cuando `enabled` pasa a true.
// El llamador decide cuándo habilitarlo (ej: cuando el candidato ya fue resuelto).
export function useJobs(enabled: boolean): UseJobsReturn {
  const { data, loading, error, execute } = useAsync<Job[]>(
    getJobs as (...args: unknown[]) => Promise<Job[]>,
  );

  useEffect(() => {
    if (enabled) execute();
  }, [enabled, execute]);

  return { jobs: data ?? [], loading, error };
}
