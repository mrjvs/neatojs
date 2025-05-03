import type { KeyCollection, KeyLoader } from 'loading/types';
import { deepFreeze } from 'utils/freeze';
import { makeSchemaFromConfig } from 'schemas/handle';
import type { ConfigSchema } from 'schemas/types';
import { useTranslatorMap } from 'keys/mapping';
import { buildObjectFromKeys } from 'keys/build';
import { normalizeKeys } from 'keys/normalize';
import { naming, type NamingConventionFunc } from 'utils/conventions';
import { NeatConfigError } from 'utils/errors';

export type ConfigAssertionType =
  | 'throw'
  | 'pretty'
  | 'plain'
  | ((err: NeatConfigError) => void);

export type ConfigCreatorOptions<T> = {
  envPrefix?: string;
  unfreeze?: boolean;
  assert?: ConfigAssertionType;
  presetKey?: string;
  presets?: Record<string, unknown>;
  schema?: ConfigSchema<T>;
  namingConvention?: NamingConventionFunc;
  loaders: KeyLoader[];
};

function buildConfig<T>(ops: ConfigCreatorOptions<T>) {
  const schema = ops.schema ? makeSchemaFromConfig(ops.schema) : null;
  const translationMap = schema?.extract() ?? [];

  // loading keys
  const loadedKeys: KeyCollection[] = [];
  const ctx = {
    envPrefix: ops.envPrefix ?? null,
  };
  ops.loaders.forEach((loader) => {
    loadedKeys.push(loader.load(ctx));
  });
  const keys = normalizeKeys(loadedKeys.flat());

  // Presets
  // TODO handle presets

  // translate normalized keys to output keys and build object
  const translatedKeys = useTranslatorMap(
    translationMap,
    keys,
    ops.namingConvention ?? naming.camelCase,
  );
  let output: any = buildObjectFromKeys(translatedKeys);

  // validate and transform
  if (schema) output = schema?.validate({ keys, object: output });

  // post processing
  if (!ops.unfreeze) output = deepFreeze(output);

  return output as T;
}

export function createConfig<T = any>(ops: ConfigCreatorOptions<T>): T {
  const assertConfig = ops.assert ?? 'pretty';
  try {
    return buildConfig(ops);
  } catch (error: any) {
    if (assertConfig === 'throw') throw error;
    if (!(error instanceof NeatConfigError)) throw error;
    if (assertConfig === 'plain') error.plainPrintAndExit();
    if (assertConfig === 'pretty') error.printAndExit();
    if (typeof assertConfig === 'function') assertConfig(error);
    throw error;
  }
}
