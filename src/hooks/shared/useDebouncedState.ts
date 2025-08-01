import { useEffect, useState } from "react";

export function useDebouncedState<T>(value: T, delay: number) {
  const [debouncedState, setDebouncedState] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedState(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedState;
}
