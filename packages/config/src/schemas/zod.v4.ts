import type * as z from 'zod/v4/core';
import type { KeyTransformationMap, SchemaTransformer } from './types';
import { standardSchemaToTransformer } from './standard-schema';

function recursiveSearchForKeys(_def: z.$ZodType): KeyTransformationMap {
  // TODO extract keys
  return [];
}

export function isZodV4Schema(schema: any): schema is z.$ZodType {
  return typeof schema.safeParse === 'function' && '_zod' in schema;
}

export function zodV4SchemaToTransformer<T>(
  schema: z.$ZodType,
): SchemaTransformer<T> {
  const transformer = standardSchemaToTransformer<T>(schema);
  return {
    extract() {
      return recursiveSearchForKeys(schema);
    },
    validate(ctx) {
      return transformer.validate(ctx);
    },
  };
}
