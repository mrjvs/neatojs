import type * as z from 'zod/v4/core';
import { normalizeKey } from 'keys/normalize';
import type { KeyTransformationMap, SchemaTransformer } from './types';
import { standardSchemaToTransformer } from './standard-schema';

// This only holds special cases -- more cases can be added as needed
type SupportedZodTypeDef =
  | z.$ZodObjectDef
  | z.$ZodDefaultDef
  | z.$ZodPrefaultDef
  | z.$ZodDiscriminatedUnionDef;

function recursiveSearchForKeys(
  def: z.$ZodTypeDef,
  path: string[] = [],
): KeyTransformationMap {
  const specialDef = def as SupportedZodTypeDef;
  if (specialDef.type === 'object') {
    const entries = Object.entries(specialDef.shape);
    return entries.flatMap(([k, v]) => {
      return recursiveSearchForKeys(v._zod.def, [...path, k]);
    });
  }

  if (specialDef.type === 'union') {
    return specialDef.options.flatMap((objType) =>
      recursiveSearchForKeys(objType._zod.def, path),
    );
  }

  if (specialDef.type === 'default' || specialDef.type === 'prefault') {
    return recursiveSearchForKeys(specialDef.innerType._zod.def, path);
  }

  return [
    {
      normalizedKey: normalizeKey(path.join('__')),
      outputKey: path.join('__'),
    },
  ];
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
      return recursiveSearchForKeys(schema._zod.def);
    },
    validate(ctx) {
      return transformer.validate(ctx);
    },
  };
}
