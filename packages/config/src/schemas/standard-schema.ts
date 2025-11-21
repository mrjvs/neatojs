import type { StandardSchemaV1 } from '@standard-schema/spec';
import { NeatConfigError, ValidationError } from 'utils/errors';
import type { SchemaTransformer } from './types';

export function isStandardSchema(schema: any): schema is StandardSchemaV1 {
  return schema['~standard'];
}

export function standardSchemaToTransformer<T>(
  schema: StandardSchemaV1,
): SchemaTransformer<T> {
  return {
    extract() {
      // Standard schema doesn't support runtime shape info, so we cannot create key translation map
      return [];
    },
    validate(ctx) {
      const result = schema['~standard'].validate(ctx.object);
      if (result instanceof Promise)
        throw new NeatConfigError('Async schemas are not supported');
      if (result.issues) {
        const validations = result.issues.map((issue) => ({
          message: issue.message,
          path: issue.path?.join('.'),
        }));
        throw new ValidationError(validations);
      }
      return result.value as T;
    },
  };
}
