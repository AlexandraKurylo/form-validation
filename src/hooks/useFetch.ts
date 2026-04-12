import { useState, useCallback } from "react";
import { delayFn } from "../helpers/delayFn";

export const useFetch = (callback: (...args: any[]) => void): [(...args: any[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFn = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        setError("");
        await delayFn();
        await callback(...args);
      } catch (err: any) {
        const msg = err?.message || "An unexpected error occurred";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    [callback],
  );

  return [fetchFn, isLoading, error];
};
