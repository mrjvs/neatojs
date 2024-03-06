import { useMemo } from 'react';
import { useRouter } from 'next/router';
import type { MetaConf, PageMapItem } from '../../theme';
import { mergeLayoutSettings } from '../../theme/components/layout';
import { sites, pageMap } from '../virtuals';

export function getPage(pageUrl: string) {
  const matches = pageMap
    .filter((v) => pageUrl.startsWith(v.sitePath))
    .sort((a, b) => b.sitePath.length - a.sitePath.length);
  const match: PageMapItem | undefined = matches[0];
  return match ?? null;
}

export function getGuiderContext(pageUrl: string, pageMeta: MetaConf = {}) {
  const page = getPage(pageUrl);
  const siteId = page?.config.site ?? pageMeta?.site ?? sites[0].id;
  const site = sites.find((v) => v.id === siteId);
  if (!site) throw new Error('No site found with that id');

  const dirId =
    page?.config.directory ?? pageMeta?.directory ?? site.directories[0].id;
  const dir = site.directories.find((v) => v.id === dirId);
  if (!dir) throw new Error('No directory found with that id');

  const layoutId = page?.config.layout ?? pageMeta?.layout ?? dir.layout;
  const layout = site.layouts.find((v) => v.id === layoutId);
  if (!layout) throw new Error('No layout found');

  const settings = mergeLayoutSettings(layout.settings, dir.settings);

  return {
    pageMap,
    settings,
    directory: dir,
    layout,
    site,
  };
}

export function useGuider(pageMeta: MetaConf = {}) {
  const router = useRouter();
  const pageUrl = router.pathname;
  const context = useMemo(() => {
    return getGuiderContext(pageUrl, pageMeta);
  }, [pageUrl, pageMeta]);

  return context;
}
