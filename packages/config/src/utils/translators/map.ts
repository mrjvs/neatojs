import type { ConfigKeys } from 'loaders/base';
import type { NamingConventionFunc } from './conventions';
import type { TranslatorMap } from './types';

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
  map: TranslatorMap,
  keys: ConfigKeys,
  fallback: NamingConventionFunc | null,
): ConfigKeys {
  const fallbackFunc = (s: string) => {
    if (!fallback) return s;
    return s
      .split('__')
      .map((v) => fallback(v))
      .join('__');
  };
  return keys.map((v) => ({
    key: map[v.key] || fallbackFunc(v.key),
    value: v.value,
  }));
}
