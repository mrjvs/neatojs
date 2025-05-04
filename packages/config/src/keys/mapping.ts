import type { KeyCollection } from 'loading/types';
import type { KeyTransformationMap } from 'schemas/types';
import type { NamingConventionFunc } from 'utils/conventions';

export type TranslatorMap = Record<string, string>;

export function keysToTranslatorMap(
  from: string[],
  to: string[],
): TranslatorMap {
  return from.reduce<TranslatorMap>((a, v, i) => {
    a[v] = to[i];
    return a;
  }, {});
}

export function useTranslatorMap(
  map: KeyTransformationMap,
  keys: KeyCollection,
  fallback: NamingConventionFunc | null,
): KeyCollection {
  const lookupMap = Object.fromEntries(
    map.map((v) => [v.normalizedKey, v.outputKey]),
  );
  const fallbackFunc = (s: string) => {
    if (!fallback) return s;
    return s
      .split('__')
      .map((v) => fallback(v))
      .join('__');
  };
  return keys.map((v) => ({
    key: lookupMap[v.key] || fallbackFunc(v.key),
    value: v.value,
  }));
}
