import type { KeyCollection } from 'loading/types';
import { FileLoadError } from 'utils/errors';

function recurseThroughObject(
  obj: Record<string, any>,
  path: string[] = [],
): KeyCollection {
  const keys: KeyCollection = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value.constructor === Object) {
      const newKeys = recurseThroughObject(value, [...path, key]);
      keys.push(...newKeys);
    } else {
      keys.push({ key: path.concat(key).join('__'), value: value.toString() });
    }
  });
  return keys;
}

export function loadKeysFromObject(obj: any) {
  if (obj.constructor !== Object)
    throw new FileLoadError('Extracting keys can only be done on an object');
  return recurseThroughObject(obj);
}

export function loadKeysFromJsonFile(
  data: string,
  _prefix?: string, // prefix doesn't matter for json
): KeyCollection {
  let obj: Record<string, any>;
  try {
    obj = JSON.parse(data);
  } catch {
    throw new FileLoadError('Cannot parse JSON file');
  }
  return loadKeysFromObject(obj);
}
