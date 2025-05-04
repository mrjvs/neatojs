import { NeatConfigError } from 'utils/errors';
import type { ConfigSchema, SchemaTransformer } from './types';
import { isJoiSchema, joiSchemaToTransformer } from './joi';
import { isZodSchema, zodSchemaToTransformer } from './zod';

function isSchemaTransformer<T>(schema: any): schema is SchemaTransformer<T> {
  const hasExtract = schema.extract && typeof schema.extract === 'function';
  const hasValidate = schema.validate && typeof schema.validate === 'function';
  return hasExtract && hasValidate;
}

export function makeSchemaFromConfig<T>(
  schema: ConfigSchema<T>,
): SchemaTransformer<T> {
  if (isJoiSchema(schema)) return joiSchemaToTransformer(schema);
  if (isZodSchema(schema)) return zodSchemaToTransformer(schema);
  if (isSchemaTransformer(schema)) return schema;
  throw new NeatConfigError('Invalid schema provided');
}
