/* eslint-disable no-console */
import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  initialCallback?: any
): [T | undefined, (value: T) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (!initialValue) return;

    try {
      // Get from local storage by key
      const item: string | null = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      const value = item ? JSON.parse(item) : null;
      if (value && initialCallback) initialCallback(value);
      return item ? value : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T) => {
    // console.log("useLocalStorage - Set Val");
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const clearValue = () => {
    try {
      setStoredValue(undefined);
      window.localStorage.removeItem(key);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue, clearValue];
}

export default useLocalStorage;
