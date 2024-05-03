import type { Schema, Description } from 'utils/joi-types';
import type { ConfigSchemaType } from 'builder/schema';
import { LoaderInputError, ValidationError } from 'utils/errors';

export interface ConfigJOISchema {
  type: ConfigSchemaType.JOI;
  schema: Schema;
}

export function validateJOISchemaDefintion(schemaData: ConfigJOISchema) {
  if (typeof schemaData.schema.describe !== 'function')
    throw new LoaderInputError('Schema not a valid JOI schema');
  if (schemaData.schema.describe().type !== 'object')
    throw new LoaderInputError('Base of schema not an object');
}

export function validateObjectWithJOISchema(
  obj: Record<string, any>,
  schemaData: ConfigJOISchema,
): Record<string, any> {
  const { error, value } = schemaData.schema.validate(obj);
  if (error) {
    const validations = error.details.map((issue) => ({
      message: issue.message,
      path: issue.path.join('.'),
    }));
    throw new ValidationError(validations);
  }
  return value;
}

function recursiveSearchForKeys(
  desc: Description,
  path: string[] = [],
): string[] {
  const out: string[] = [];
  Object.entries(desc.keys || {}).forEach(([k, v]: [string, any]) => {
    const keyArray = [...path, k];
    if (v.type === 'object') {
      out.push(...recursiveSearchForKeys(v, keyArray));
      return;
    }
    out.push(keyArray.join('__'));
  });
  return out;
}

export function getKeysFromJOISchema(schemaData: ConfigJOISchema): string[] {
  return recursiveSearchForKeys(schemaData.schema.describe());
}
