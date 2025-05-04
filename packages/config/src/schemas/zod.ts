import type { AnyZodObject, ZodObjectDef } from 'zod';
import { ValidationError } from 'utils/errors';
import { normalizeKey } from 'keys/normalize';
import type { KeyTransformationMap, SchemaTransformer } from './types';

function recursiveSearchForKeys(
  desc: ZodObjectDef,
  path: string[] = [],
): KeyTransformationMap {
  const out: KeyTransformationMap = [];
  const shape = desc.shape();
  Object.entries(shape).forEach(([k, v]) => {
    const keyArray = [...path, k];
    // TODO potentionally does not work with list of options or something like that
    if (v._def.typeName === 'ZodObject') {
      out.push(...recursiveSearchForKeys(v._def, keyArray));
      return;
    }
    out.push({
      normalizedKey: normalizeKey(keyArray.join('__')),
      outputKey: keyArray.join('__'),
    });
  });
  return out;
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
