import { useState, useEffect } from "react";
import { delayFn } from "../helpers/delayFn";

export const useDelayedLoader = (delay: number = 2000): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = async () => {
      try {
        await delayFn(delay);
      } finally {
        setIsLoading(false);
      }
    };

    timer();
  }, [delay]);

  return isLoading;
};
