import type { KeyCollection, KeyLoader } from 'loading/types';

export function getKeysFromEnvironment(prefix: string | null): KeyCollection {
  const prefixToCheck = prefix ?? '';
  const keys: KeyCollection = [];

  Object.entries(process.env).forEach((v) => {
    if (!v[1]) return;
    if (!v[0].startsWith(prefixToCheck)) return;

    keys.push({
      key: v[0].slice(prefixToCheck.length),
      value: v[1],
    });
  });

  return keys;
}

export function environmentLoader(): KeyLoader {
  return {
    name: 'environment',
    load(ctx) {
      return getKeysFromEnvironment(ctx.envPrefix);
    },
  };
}
