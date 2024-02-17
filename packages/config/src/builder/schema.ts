import type { ConfigJOISchema } from 'schemas/joi';
import {
  getKeysFromJOISchema,
  validateJOISchemaDefintion,
  validateObjectWithJOISchema,
} from 'schemas/joi';
import type { ConfigZodSchema } from 'schemas/zod';
import {
  getKeysFromZodSchema,
  validateObjectWithZodSchema,
  validateZodSchemaDefintion,
} from 'schemas/zod';
import { keysToTranslatorMap } from 'utils/translators/map';
import { normalizeKeys } from 'utils/translators/normalizer';
import type { TranslatorMap } from 'utils/translators/types';

export enum ConfigSchemaType {
  JOI,
  ZOD,
}

export type ConfigSchema = ConfigJOISchema | ConfigZodSchema;

export function validateSchema(schemaData: ConfigSchema | null): void {
  if (!schemaData) return; // ignore if no schema
  if (schemaData.type === ConfigSchemaType.JOI) {
    validateJOISchemaDefintion(schemaData);
    return;
  }
  if (schemaData.type === ConfigSchemaType.ZOD) {
    validateZodSchemaDefintion(schemaData);
  }
}

export function validateObjectWithSchema(
  obj: Record<string, any>,
  schemaData: ConfigSchema | null,
): Record<string, any> {
  if (!schemaData) return obj; // ignore if no schema
  if (schemaData.type === ConfigSchemaType.JOI) {
    return validateObjectWithJOISchema(obj, schemaData);
  }
  if (schemaData.type === ConfigSchemaType.ZOD) {
    return validateObjectWithZodSchema(obj, schemaData);
  }
  // theorically unreachable
  throw new Error('Schema type not recognized');
}

export function getTranslateMapFromSchema(
  schemaData: ConfigSchema | null,
): TranslatorMap {
  if (!schemaData) return {};
  if (schemaData.type === ConfigSchemaType.JOI) {
    const keys = getKeysFromJOISchema(schemaData);
    const normalized = normalizeKeys(keys);
    return keysToTranslatorMap(normalized, keys);
  }
  if (schemaData.type === ConfigSchemaType.ZOD) {
    const keys = getKeysFromZodSchema(schemaData);
    const normalized = normalizeKeys(keys);
    return keysToTranslatorMap(normalized, keys);
  }
  return {};
}
