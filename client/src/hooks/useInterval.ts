import { useState } from "react";

export function useInterval(
  callback: () => void,
  value: number
): { startInterval(callCallback: boolean): void; stopInterval(): void } {
  const [intervalReference, setIntervalReference] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  return {
    startInterval(callCallback: boolean) {
      if (callCallback) {
        callback();
      }
      setIntervalReference(setInterval(callback, value));
    },

    stopInterval() {
      if (intervalReference) {
        clearInterval(intervalReference);
        setIntervalReference(null);
      }
    },
  };
}
