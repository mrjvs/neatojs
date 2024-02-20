import type { CollectorItem } from './collector';

export type VirtualCache = {
  items: CollectorItem[];
  themeFile: string;
};

function makeVirtualCache() {
  const cache: VirtualCache = {
    items: [],
    themeFile: '',
  };

  return {
    setItems(newItems: CollectorItem[]) {
      cache.items = newItems;
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
