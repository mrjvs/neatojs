import type { Description, Schema } from 'joi';
import { ValidationError } from 'utils/errors';
import { normalizeKey } from 'keys/normalize';
import type { KeyTransformationMap, SchemaTransformer } from './types';

function recursiveSearchForKeys(
  desc: Description,
  path: string[] = [],
): KeyTransformationMap {
  const out: KeyTransformationMap = [];
  Object.entries(desc.keys || {}).forEach(([k, v]: [string, any]) => {
    const keyArray = [...path, k];
    if (v.type === 'object') {
      out.push(...recursiveSearchForKeys(v, keyArray));
      return;
    }
    out.push({
      normalizedKey: normalizeKey(keyArray.join('__')),
      outputKey: keyArray.join('__'),
    });
  });
  return out;
}

export function isJoiSchema(schema: any): schema is Schema {
  return (
    typeof schema.describe === 'function' && schema.describe().type === 'object'
  );
}

export function joiSchemaToTransformer<T>(
  schema: Schema,
): SchemaTransformer<T> {
  return {
    extract() {
      return recursiveSearchForKeys(schema.describe());
    },
    validate(ctx) {
      const { error, value } = schema.validate(ctx.object);
      if (error) {
        const validations = error.details.map((issue: any) => ({
          message: issue.message,
          path: issue.path.join('.'),
        }));
        throw new ValidationError(validations);
      }
      return value;
    },
  };
}
