import { parse } from 'dotenv';
import type { KeyCollection } from 'loading/types';

export function loadKeysFromEnvFile(
  data: string,
  prefix: string,
): KeyCollection {
  const envObject = parse(data);
  let output = Object.entries(envObject).map((v) => ({
    key: v[0],
    value: v[1],
  }));

  // filter out keys not starting with prefix AND strip prefixes
  if (prefix) {
    output = output
      .filter((v) => v.key.startsWith(prefix))
      .map((v) => {
        v.key = v.key.slice(prefix.length);
        return v;
      });
  }

  return output;
}
