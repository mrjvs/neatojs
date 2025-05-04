import type Joi from 'joi';
import type { AnyZodObject, z } from 'zod';
import type { KeyCollection } from 'loading/types';
import type { DeepReadonly } from 'utils/freeze';
import type { NormalizedConfigCreatorOptions } from 'entrypoint';

export type ZodSchema = AnyZodObject;
export type JoiSchema<T = any> = Joi.Schema<T>;

export type KeyTransformationMap = {
  normalizedKey: string;
  outputKey: string;
}[];

export type SchemaTransformerContext = {
  /**
   * The list of normalized key and values used to build the object
   */
  keys: KeyCollection;

  /**
   * The final object built from the keys
   */
  object: Record<string, any>;

  /**
   * The options used to create the config
   */
  config: NormalizedConfigCreatorOptions<any>;
};

export type SchemaTransformer<T> = {
  extract: () => KeyTransformationMap;
  validate: (ctx: SchemaTransformerContext) => T;
};

export type ConfigSchema<T> = SchemaTransformer<T> | ZodSchema | JoiSchema<T>;

export type InferConfigSchemaType<T extends ConfigSchema<any>> =
  T extends ZodSchema
    ? z.infer<T>
    : T extends JoiSchema<infer Result>
      ? Result
      : T extends SchemaTransformer<infer Result>
        ? Result
        : never;

export type InferConfigSchema<
  TSchema extends ConfigSchema<any>,
  TIsFrozen extends FrozenOption,
> = TIsFrozen extends true | null | undefined
  ? DeepReadonly<InferConfigSchemaType<TSchema>>
  : InferConfigSchemaType<TSchema>;

export type FrozenOption = boolean | undefined | null;
