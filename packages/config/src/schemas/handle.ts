import { NeatConfigError } from 'utils/errors';
import type { ConfigSchema, SchemaTransformer } from './types';
import { isJoiSchema, joiSchemaToTransformer } from './joi';
import { isZodV3Schema, zodV3SchemaToTransformer } from './zod.v3';
import { isZodV4Schema, zodV4SchemaToTransformer } from './zod.v4';
import {
  isStandardSchema,
  standardSchemaToTransformer,
} from './standard-schema';

function isSchemaTransformer<T>(schema: any): schema is SchemaTransformer<T> {
  const hasExtract = schema.extract && typeof schema.extract === 'function';
  const hasValidate = schema.validate && typeof schema.validate === 'function';
  return hasExtract && hasValidate;
}

export function makeSchemaFromConfig<T>(
  schema: ConfigSchema<T>,
): SchemaTransformer<T> {
  if (isJoiSchema(schema)) return joiSchemaToTransformer(schema);
  if (isZodV3Schema(schema)) return zodV3SchemaToTransformer(schema);
  if (isZodV4Schema(schema)) return zodV4SchemaToTransformer(schema);
  if (isStandardSchema(schema)) return standardSchemaToTransformer(schema);
  if (isSchemaTransformer(schema)) return schema;
  throw new NeatConfigError('Invalid schema provided');
}
