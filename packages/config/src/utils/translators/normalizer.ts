import type { ConfigKeys } from 'loaders/base';

/**
 * normalize key segment:
 *  - HelloWorld -\> HELLO_WORLD
 *  - helloWorld -\> HELLO_WORLD
 *  - hello-world -\> HELLO_WORLD
 *  - hello_world -\> HELLO_WORLD
 *  - HELLO_WORLD -\> HELLO_WORLD
 *  - HELLO-WORLD -\> HELLO_WORLD
 * @param segment - segment to normalize
 */
function normalizeKeySegment(segment: string): string {
  return segment
    .replace(/([a-z])([A-Z])/g, (_, a, b) => `${a}-${b.toLowerCase()}`)
    .replace(/[-_]+/g, '_')
    .toUpperCase();
}

export function normalizeKey(key: string): string {
  return key
    .split('__')
    .map((v) => normalizeKeySegment(v))
    .join('__');
}

export function normalizeConfigKeys(keys: ConfigKeys): ConfigKeys {
  return keys.map((v) => ({
    key: normalizeKey(v.key),
    value: v.value,
  }));
}

export function normalizeKeys(keys: string[]): string[] {
  return keys.map((v) => normalizeKey(v));
}
