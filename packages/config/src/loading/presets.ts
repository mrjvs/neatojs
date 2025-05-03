import { FileLoadError } from 'utils/errors';
import { normalizeKey } from 'keys/normalize';
import { loadKeysFromObject } from './loaders/json.file';
import type { KeyCollection } from './types';

export type Preset = Record<string, any>;

export function extractUsedPresets(
  presetKey: string,
  keys: KeyCollection,
): { selectedPresets: string[]; keys: KeyCollection } {
  let selectedPresetValue = '';
  const filteredKeys = keys.filter((key) => {
    if (key.key === presetKey) {
      selectedPresetValue = key.value;
      return false;
    }
    return true;
  });
  return {
    keys: filteredKeys,
    selectedPresets: selectedPresetValue
      .split(',')
      .filter((v) => v.length)
      .map((v) => normalizeKey(v.trim())),
  };
}

export function expandPresets(
  allPresets: Record<string, Preset>,
  selectedPresets: string[],
): KeyCollection {
  const outputKeys: KeyCollection = [];
  selectedPresets.forEach((name) => {
    if (!allPresets[name]) {
      throw new FileLoadError(`Preset '${name}' doesn't exist`);
    }
    const keys = loadKeysFromObject(allPresets[name]);
    outputKeys.push(...keys);
  });
  return outputKeys;
}
