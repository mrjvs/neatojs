import type { NeatConfigError } from 'old/utils/errors';
import type { NamingConventionFunc } from 'old/utils/translators/conventions';
import type { KeyCollection, KeyLoader } from 'loading/types';
import { deepFreeze } from 'freeze';
import { makeSchemaFromConfig } from 'schemas/handle';
import type { ConfigSchema } from 'schemas/types';

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
  defaultNamingConvention?: NamingConventionFunc;
  loaders: KeyLoader[];
};

export function createConfig<T>(ops: ConfigCreatorOptions<T>): T {
  const schema = ops.schema ? makeSchemaFromConfig(ops.schema) : null;
  const _keyMap = schema?.extract() ?? [];

  // loading keys
  const loadedKeys: KeyCollection[] = [];
  const ctx = {
    envPrefix: ops.envPrefix ?? null,
  };
  ops.loaders.forEach((loader) => {
    loadedKeys.push(loader.load(ctx));
  });
  const keys = loadedKeys.flat();

  // build
  let output = {} as T; // TODO build object using keys
  // TODO use keyMap to transform keys
  // TODO use presets
  // TODO naming convention

  // validation
  if (schema) output = schema?.validate({ keys, object: output as any });

  // post processing
  if (!ops.unfreeze) output = deepFreeze(output) as T; // TODO proper type
  return output;
}
