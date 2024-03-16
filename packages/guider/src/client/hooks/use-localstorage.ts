import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  defaultData: T,
  key?: string,
): [T, (n: T) => void] {
  const [data, setData] = useState<T>(defaultData);
  const storageKey = `__guider::${key}`;

  const set = useCallback((newData: T) => {
    if (key) localStorage.setItem(storageKey, JSON.stringify(newData));
    setData(newData);
  }, []);

  useEffect(() => {
    if (!key) return;
    const item = localStorage.getItem(`__guider::${key}`);
    if (!item) {
      setData(defaultData);
      return;
    }
    setData(JSON.parse(item));
  }, [key]);

  return [data, set];
}
