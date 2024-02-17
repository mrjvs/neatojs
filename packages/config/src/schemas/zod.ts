import type { AnyZodObject, ZodObjectDef } from 'zod';
import type { ConfigSchemaType } from 'builder/schema';
import { LoaderInputError, ValidationError } from 'utils/errors';

export interface ConfigZodSchema {
  type: ConfigSchemaType.ZOD;
  schema: AnyZodObject;
}

export function validateZodSchemaDefintion(schemaData: ConfigZodSchema) {
  const def = schemaData.schema._def;
  if (!def) throw new LoaderInputError('Schema not a valid Zod schema');
  if (def.typeName !== 'ZodObject')
    throw new LoaderInputError('Base of schema not an object');
}

export function validateObjectWithZodSchema(
  obj: Record<string, any>,
  schemaData: ConfigZodSchema,
): Record<string, any> {
  const result = schemaData.schema.safeParse(obj);
  if (!result.success) {
    const validations = result.error.issues.map((issue) => ({
      message: issue.message,
      path: issue.path.join('.'),
    }));
    throw new ValidationError(validations);
  }
  return result.data;
}

function recursiveSearchForKeys(
  desc: ZodObjectDef,
  path: string[] = [],
): string[] {
  const out: string[] = [];
  const shape = desc.shape();
  Object.entries(shape).forEach(([k, v]) => {
    const keyArray = [...path, k];
    // TODO potentionally does not work with list of options or something like that
    if (v._def.typeName === 'ZodObject') {
      out.push(...recursiveSearchForKeys(v._def, keyArray));
      return;
    }
    out.push(keyArray.join('__'));
  });
  return out;
}

export function getKeysFromZodSchema(schemaData: ConfigZodSchema): string[] {
  const data = recursiveSearchForKeys(schemaData.schema._def);
  return data;
}
