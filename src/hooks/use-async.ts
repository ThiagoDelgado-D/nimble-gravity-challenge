import { useState, useCallback } from "react";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: unknown[]) => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE = { data: null, loading: false, error: null };

// Encapsulates the loading → data | error lifecycle of any async function.
// Domain hooks use this to avoid repeating the same state management pattern.
export function useAsync<T>(
  fn: (...args: unknown[]) => Promise<T>,
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>(INITIAL_STATE);

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fn(...args);
        setState({ data, loading: false, error: null });
      } catch (err) {
        const error = err instanceof Error ? err.message : "Error desconocido";
        setState({ data: null, loading: false, error });
      }
    },
    [fn],
  );

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { ...state, execute, reset };
}
