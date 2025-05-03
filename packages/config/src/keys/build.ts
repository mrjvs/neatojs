import type { KeyCollection } from 'loading/types';

export function buildObjectFromKeys(keys: KeyCollection): Record<string, any> {
  const output: Record<string, any> = {};
  keys.forEach((v) => {
    let current = output;
    const parts = v.key.split('__');
    const last = parts.pop() ?? '';
    parts.forEach((path) => {
      if (current[path] !== undefined && current[path].constructor !== Object)
        throw new Error(
          'Duplicate configuration key found while trying to build final object',
        );
      if (!current[path]) current[path] = {};
      current = current[path];
    });
    if (current[last] && current[last].constructor === Object)
      throw new Error(
        'Duplicate configuration key found while trying to build final object',
      );
    current[last] = v.value;
  });
  return output;
}
