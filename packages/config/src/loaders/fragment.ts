import type { ConfigLoader } from 'builder/base';
import { normalizeKey } from 'utils/translators/normalizer';
import { FileLoadError, LoaderInputError } from 'utils/errors';
import type { ConfigKeys } from './base';
import { loadKeysFromObject } from './files/json';

export type Fragment = Record<string, any>;

// this loader is special, it gets loaded after loading all other loaders and normalizing.
// but the results get placed BEFORE all the loaded keys
export interface FragmentLoader {
  fragments: Record<string, Fragment>; // name of fragment need to be normalized
  key: string; // needs to be normalized
}

// saves the normalized name with the fragment in the loader
export function populateFragmentLoaderFromFragment(
  loader: ConfigLoader,
  name: string,
  frag: Fragment,
) {
  const normalizedName = normalizeKey(name);
  if (loader.fragments.fragments[normalizedName]) {
    throw new LoaderInputError(
      `Fragment with the name ${normalizedName} already registered`,
    );
  }
  loader.fragments.fragments[normalizedName] = frag;
}

export function populateFragmentLoaderWithKey(
  loader: ConfigLoader,
  key: string,
) {
  loader.fragments.key = normalizeKey(key);
}

// extracts fragments to use, and normalizes the input
export function extractFragmentDefinitionFromKeys(
  loader: FragmentLoader,
  keys: ConfigKeys,
): { fragments: string[]; keys: ConfigKeys } {
  let fragmentUses = '';
  const filteredKeys = keys.filter((key) => {
    if (key.key === loader.key) {
      fragmentUses = key.value;
      return false;
    }
    return true;
  });
  return {
    keys: filteredKeys,
    fragments: fragmentUses
      .split(',')
      .filter((v) => v.length)
      .map((v) => normalizeKey(v.trim())),
  };
}

export function expandFragments(
  loader: FragmentLoader,
  fragments: string[],
): ConfigKeys {
  const outputKeys: ConfigKeys = [];
  fragments.forEach((name) => {
    if (!loader.fragments[name]) {
      throw new FileLoadError(`Fragment '${name}' doesn't exist`);
    }
    const keys = loadKeysFromObject(loader.fragments[name]);
    outputKeys.push(...keys);
  });
  return outputKeys;
}
