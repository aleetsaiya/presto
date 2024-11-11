import { useState } from 'react';
import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseLocalStorageReturn = [any, (value: any) => void];

/**
 * Using stateful value to manage value in localStorage.
 * The default value will be value stored in localStorage, or provided `defaultValue` if key is not in localStorage.
 */
export function useLocalStorage(
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue: any
): UseLocalStorageReturn {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    if (item !== null) {
      return JSON.parse(item);
    }
    // set default value into localStorage
    if (typeof defaultValue === 'function') {
      throw new Error('Can not store function into local storage');
    }
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  });

  /** Update localStorage and state value */
  const updateValue = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any) => {
      if (typeof value === 'function') {
        throw new Error('Can not store function into local storage');
      }
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    },
    [key]
  );

  return [value, updateValue];
}
