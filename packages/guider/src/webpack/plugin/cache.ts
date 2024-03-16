import type { CollectorItem, PageMapItem } from './collector';

export type VirtualCache = {
  items: CollectorItem[];
  themeFile: string;
  pageMap: PageMapItem[];
};

function makeVirtualCache() {
  const cache: VirtualCache = {
    items: [],
    themeFile: '',
    pageMap: [],
  };

  return {
    setItems(newItems: CollectorItem[]) {
      cache.items = newItems;
    },
    setPageMap(pageMap: PageMapItem[]) {
      cache.pageMap = pageMap;
    },
    setThemeFile(newThemeFile: string) {
      cache.themeFile = newThemeFile;
    },
    get() {
      return cache;
    },
  };
}

export const virtualCache = makeVirtualCache();
