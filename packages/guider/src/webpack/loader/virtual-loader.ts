import { getGuiderPluginCache } from '@neato/guider';

export function virtualLoader(): string {
  const cacheData = getGuiderPluginCache();
  const stringified = JSON.stringify(cacheData);
  const stringifiedString = JSON.stringify(stringified);
  return `export default ${stringifiedString};`;
}
