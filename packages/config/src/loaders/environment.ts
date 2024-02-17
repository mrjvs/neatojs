import { env } from 'node:process';
import type { ConfigLoader } from 'builder/base';
import type { ConfigKeys } from 'loaders/base';

export interface EnvironmentLoader {
  prefix: string;
}

export function populateLoaderFromEnvironment(
  loader: ConfigLoader,
  prefix: string,
) {
  loader.environment.push({
    prefix,
  });
}

export function getKeysFromEnvironment(
  loaders: EnvironmentLoader[],
): ConfigKeys {
  const prefixes: string[] = loaders.map((v) => v.prefix);
  const keys: ConfigKeys = [];
  Object.entries(env).forEach((v) => {
    if (!v[1]) return;
    for (const prefix of prefixes) {
      if (v[0].startsWith(prefix))
        keys.push({
          key: v[0].slice(prefix.length),
          value: v[1],
        });
    }
  });
  return keys;
}
