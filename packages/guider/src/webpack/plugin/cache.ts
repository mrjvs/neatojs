function makeVirtualCache() {
  let items: string[] = [];
  let themeFile = '';

  return {
    setItems(newItems: string[]) {
      items = newItems;
    },
    setThemeFile(newThemeFile: string) {
      themeFile = newThemeFile;
    },
    get() {
      return {
        items,
        themeFile,
      };
    },
  };
}

export const virtualCache = makeVirtualCache();
