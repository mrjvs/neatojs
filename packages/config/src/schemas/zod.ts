import type {
  ZodDiscriminatedUnionDef,
  AnyZodObject,
  ZodDefaultDef,
  ZodObjectDef,
} from 'zod';
import { ZodFirstPartyTypeKind } from 'zod';
import { ValidationError } from 'utils/errors';
import { normalizeKey } from 'keys/normalize';
import type { KeyTransformationMap, SchemaTransformer } from './types';

// This only holds special cases -- more cases can be added as needed
type SupportedZodTypeDef =
  | ZodObjectDef
  | ZodDefaultDef
  | ZodDiscriminatedUnionDef<string>;

function recursiveSearchForKeys(
  def: SupportedZodTypeDef,
  path: string[] = [],
): KeyTransformationMap {
  if (def.typeName === ZodFirstPartyTypeKind.ZodObject) {
    const shape = def.shape();
    const entries = Object.entries(shape);
    const newKeys = entries.map(([k, v]) => {
      return recursiveSearchForKeys(v._def, [...path, k]);
    });
    return newKeys.flat();
  }

  if (def.typeName === ZodFirstPartyTypeKind.ZodDiscriminatedUnion) {
    const newKeys = def.options.map((objType) =>
      recursiveSearchForKeys(objType._def, path),
    );
    return newKeys.flat();
  }

  if (def.typeName === ZodFirstPartyTypeKind.ZodDefault) {
    return recursiveSearchForKeys(def.innerType._def, path);
  }

  return [
    {
      normalizedKey: normalizeKey(path.join('__')),
      outputKey: path.join('__'),
    },
  ];
}

export function isZodSchema(schema: any): schema is AnyZodObject {
  return (
    typeof schema.safeParse === 'function' &&
    schema._def &&
    schema._def.typeName === 'ZodObject'
  );
}

export function zodSchemaToTransformer<T>(
  schema: AnyZodObject,
): SchemaTransformer<T> {
  return {
    extract() {
      return recursiveSearchForKeys(schema._def);
    },
    validate(ctx) {
      const result = schema.safeParse(ctx.object);
      if (!result.success) {
        const validations = result.error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path.join('.'),
        }));
        throw new ValidationError(validations);
      }
      return result.data as T;
    },
  };
}
