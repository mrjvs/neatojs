import type Joi from 'joi';
import type { ZodAnyDef } from 'zod';
import type { KeyCollection } from 'loading/types';

export type ZodSchema = ZodAnyDef;
export type JoiSchema = Joi.Schema;

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

export type ConfigSchema<T> = SchemaTransformer<T> | ZodSchema | JoiSchema;
