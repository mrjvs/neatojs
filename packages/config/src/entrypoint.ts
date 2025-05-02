import type Joi from 'joi';
import type { ZodAny } from 'zod';
import type { NeatConfigError } from 'old/utils/errors';
import type { NamingConventionFunc } from 'old/utils/translators/conventions';

export type KeyCollection = Record<string, string>;

export type KeyLoader = {
  name: string;
  load: () => KeyCollection;
};

export type ZodSchema = ZodAny;
export type JoiSchema = Joi.Schema;
export type CustomSchema<T> = {
  __config: 'schema';
  validate: (keys: KeyCollection) => T;
};
export type ConfigSchema<T> = CustomSchema<T> | ZodSchema | JoiSchema;

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

export function createConfig<T>(_ops: ConfigCreatorOptions<T>): T {
  // TODO implement the logic to load the config
  return {} as T;
}
