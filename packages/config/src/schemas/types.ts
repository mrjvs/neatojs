import type Joi from 'joi';
import type { AnyZodObject, z } from 'zod';
import type { KeyCollection } from 'loading/types';
import type { DeepReadonly } from 'utils/freeze';

export type ZodSchema = AnyZodObject;
export type JoiSchema<T = any> = Joi.Schema<T>;

export type KeyTransformationMap = {
  normalizedKey: string;
  outputKey: string;
}[];

// TODO make this a proper context object
export type SchemaTransformerContext = {
  keys: KeyCollection;
  object: Record<string, any>;
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
