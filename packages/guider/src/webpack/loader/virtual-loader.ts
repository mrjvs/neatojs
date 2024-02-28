import type { VirtualCache } from '@neato/guider';

export function virtualLoader(cacheData: VirtualCache): string {
  const stringifiedTheme = JSON.stringify(cacheData.themeFile);
  const stringifiedPageMap = JSON.stringify(cacheData.items);
  return `
    export { default as sites } from ${stringifiedTheme};
    export const pageMap = ${stringifiedPageMap};
  `;
}
