import { getGuiderPluginCache } from '@neato/guider';

export function virtualLoader(): string {
  const cacheData = getGuiderPluginCache();
  const stringifiedTheme = JSON.stringify(cacheData.themeFile);
  return `export { default as sites } from ${stringifiedTheme};`;
}
