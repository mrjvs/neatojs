import type Joi from 'joi';
import type * as z3 from 'zod/v3';
import type * as z4 from 'zod/v4/core';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { KeyCollection } from 'loading/types';
import type { DeepReadonly } from 'utils/freeze';
import type { NormalizedConfigCreatorOptions } from 'entrypoint';

export type ZodV3Schema = z3.ZodTypeAny;
export type ZodV4Schema = z4.$ZodType;
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

export type ConfigSchema<T> =
  | SchemaTransformer<T>
  | ZodV3Schema
  | ZodV4Schema
  | StandardSchemaV1
  | JoiSchema<T>;

export type InferZodConfigSchemaType<T extends ZodV3Schema | ZodV4Schema> =
  T extends ZodV4Schema
    ? z4.infer<T>
    : T extends ZodV3Schema
      ? z3.infer<T>
      : never;

export type InferConfigSchemaType<T extends ConfigSchema<any>> = T extends
  | ZodV3Schema
  | ZodV4Schema
  ? InferZodConfigSchemaType<T>
  : T extends StandardSchemaV1
    ? StandardSchemaV1.InferOutput<T>
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
