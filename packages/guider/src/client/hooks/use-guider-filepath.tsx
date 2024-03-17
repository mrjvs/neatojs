import { useRouter } from 'next/router.js';
import { useMemo } from 'react';
import type { PageMapItem } from '../../theme';
import { pageMap } from '../virtuals';

export function getFilePath(pageUrl: string): PageMapItem | null {
  const matches = pageMap.filter((v) => pageUrl === v.sitePath);
  const match: PageMapItem | undefined = matches[0];
  return match ?? null;
}

export function useGuiderFilePath() {
  const router = useRouter();
  const pageUrl = router.pathname;

  const filePath = useMemo(() => {
    return getFilePath(pageUrl);
  }, [pageUrl, pageMap]);

  return filePath;
}
