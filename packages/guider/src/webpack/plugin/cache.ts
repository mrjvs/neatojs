export type VirtualCache = {
  items: string[];
  themeFile: string;
};

function makeVirtualCache() {
  const cache: VirtualCache = {
    items: [],
    themeFile: '',
  };

  return {
    setItems(newItems: string[]) {
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
