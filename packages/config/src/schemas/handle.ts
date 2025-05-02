import type { ConfigSchema, SchemaTransformer } from './types';
import { isJoiSchema, joiSchemaToTransformer } from './joi';
import { isZodSchema, zodSchemaToTransformer } from './zod';

export function makeSchemaFromConfig<T>(
  schema: ConfigSchema<T>,
): SchemaTransformer<T> {
  if (isJoiSchema(schema)) return joiSchemaToTransformer(schema);
  if (isZodSchema(schema)) return zodSchemaToTransformer(schema);
  return schema;
}
