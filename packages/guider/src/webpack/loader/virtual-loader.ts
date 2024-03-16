import type { VirtualCache } from '@neato/guider';

export function virtualLoader(cacheData: VirtualCache): string {
  const stringifiedTheme = JSON.stringify(cacheData.themeFile);
  const stringifiedMetaMap = JSON.stringify(cacheData.items);
  const stringifiedPageMap = JSON.stringify(cacheData.pageMap);
  return `
    export { default as sites } from ${stringifiedTheme};
    export const metaMap = ${stringifiedMetaMap};
    export const pageMap = ${stringifiedPageMap};
  `;
}
