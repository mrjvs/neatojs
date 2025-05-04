import type { KeyCollection, KeyLoader, KeyLoaderContext } from 'loading/types';

export function setEnv(env: Record<string, string>) {
  if (!process.env) process.env = {};
  Object.keys(process.env).forEach((key) => {
    vi.stubEnv(key, '');
  });
  Object.entries(env).forEach((entry) => {
    vi.stubEnv(entry[0], entry[1]);
  });
}

export function loaderCtx(envPrefix?: string): KeyLoaderContext {
  return {
    envPrefix: envPrefix ?? '',
    config: null as any, // currently unused, so no need to mock
  };
}

export function runKeyLoader(
  loader: KeyLoader,
  ctx?: KeyLoaderContext,
): KeyCollection {
  const keys = loader.load(ctx ?? loaderCtx());
  return keys;
}
