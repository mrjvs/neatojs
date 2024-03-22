import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export function usePageSwitch(cb: () => void, deps: any[]) {
  const router = useRouter();
  const func = useCallback(cb, deps);
  useEffect(() => {
    return () => {
      func();
    };
  }, [router.pathname, func]);
}
