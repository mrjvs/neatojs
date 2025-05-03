import type { KeyCollection, KeyLoader } from 'loading/types';
import { deepFreeze } from 'utils/freeze';
import { makeSchemaFromConfig } from 'schemas/handle';
import type { ConfigSchema, InferConfigSchema } from 'schemas/types';
import { useTranslatorMap } from 'keys/mapping';
import { buildObjectFromKeys } from 'keys/build';
import { normalizeKey, normalizeKeys } from 'keys/normalize';
import { naming, type NamingConventionFunc } from 'utils/conventions';
import { NeatConfigError } from 'utils/errors';
import type { Preset } from 'loading/presets';
import {
  expandPresets,
  extractUsedPresets,
  normalizePresetNames,
} from 'loading/presets';

export type ConfigAssertionType =
  | 'throw'
  | 'pretty'
  | 'plain'
  | ((err: NeatConfigError) => void);

export type ConfigCreatorOptions<TSchema extends ConfigSchema<any>> = {
  envPrefix?: string;
  freeze?: boolean;
  assert?: ConfigAssertionType;
  presetKey?: string;
  presets?: Record<string, Preset>;
  schema?: TSchema;
  namingConvention?: NamingConventionFunc;
  loaders: KeyLoader[];
};

export type NormalizedConfigCreatorOptions<TSchema extends ConfigSchema<any>> = {
  envPrefix: string | null;
  freeze: boolean;
  assert: ConfigAssertionType;
  presetKey: string;
  presets: Record<string, Preset> | null;
  schema: TSchema | null;
  namingConvention: NamingConventionFunc;
  loaders: KeyLoader[];
};

function normalizeConfig<TSchema extends ConfigSchema<any>>(
  ops: ConfigCreatorOptions<TSchema>,
): NormalizedConfigCreatorOptions<TSchema> {
  return {
    envPrefix: ops.envPrefix ?? null,
    freeze: ops.freeze ?? true,
    assert: ops.assert ?? 'pretty',
    presetKey: normalizeKey(ops.presetKey ?? 'configPresets'),
    presets: ops.presets ? normalizePresetNames(ops.presets) : null,
    schema: ops.schema ?? null,
    namingConvention: ops.namingConvention ?? naming.camelCase,
    loaders: ops.loaders,
  };
}

function buildConfig<TSchema extends ConfigSchema<any>>(ops: NormalizedConfigCreatorOptions<TSchema>) {
  const schema = ops.schema ? makeSchemaFromConfig(ops.schema) : null;
  const translationMap = schema?.extract() ?? [];

  // loading keys
  const loadedKeys: KeyCollection[] = [];
  const ctx = {
    envPrefix: ops.envPrefix,
  };
  ops.loaders.forEach((loader) => {
    loadedKeys.push(loader.load(ctx));
  });
  let keys = normalizeKeys(loadedKeys.flat());

  // Presets
  if (ops.presets) {
    const presets = extractUsedPresets(ops.presetKey, keys);
    const keysFromPresets = expandPresets(ops.presets, presets.selectedPresets);
    keys = [...keysFromPresets, ...presets.keys]; // placed at the front to allow overrides
  }

  // translate normalized keys to output keys and build object
  const translatedKeys = useTranslatorMap(
    translationMap,
    keys,
    ops.namingConvention,
  );
  let output: any = buildObjectFromKeys(translatedKeys);

  // validate and transform
  if (schema) output = schema?.validate({ keys, object: output });

  // post processing
  if (ops.freeze) output = deepFreeze(output);

  return output as InferConfigSchema<TSchema>;
}

export function createConfig<TSchema extends ConfigSchema<any>>(ops: ConfigCreatorOptions<TSchema>): InferConfigSchema<TSchema> {
  const normalizedOps = normalizeConfig(ops);
  const assertConfig = normalizedOps.assert;
  try {
    return buildConfig(normalizedOps);
  } catch (error: any) {
    if (assertConfig === 'throw') throw error;
    if (!(error instanceof NeatConfigError)) throw error;
    if (assertConfig === 'plain') error.plainPrintAndExit();
    if (assertConfig === 'pretty') error.printAndExit();
    if (typeof assertConfig === 'function') assertConfig(error);
    throw error;
  }
}
