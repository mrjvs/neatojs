import type { AnyZodObject, z } from 'zod';
import type { ObjectSchema } from 'old/utils/joi-types';
import type { ConfigBuilder, ConfigLoader } from 'old/builder/base';
import { loadLoaders } from 'old/builder/base';
import { populateLoaderFromCLI } from 'old/loaders/cli';
import type { DirOptions } from 'old/loaders/dir';
import { populateLoaderFromDir } from 'old/loaders/dir';
import { populateLoaderFromEnvironment } from 'old/loaders/environment';
import type { FileOptions } from 'old/loaders/file';
import { populateLoaderFromFile } from 'old/loaders/file';
import type { Fragment } from 'old/loaders/fragment';
import {
  expandFragments,
  extractFragmentDefinitionFromKeys,
  populateFragmentLoaderFromFragment,
  populateFragmentLoaderWithKey,
} from 'old/loaders/fragment';
import { buildObjectFromKeys } from 'old/utils/build';
import { deepFreeze } from 'old/utils/freeze';
import type { NamingConventionFunc } from 'old/utils/translators/conventions';
import { camelCaseNaming } from 'old/utils/translators/conventions';
import { useTranslatorMap } from 'old/utils/translators/map';
import { normalizeConfigKeys } from 'old/utils/translators/normalizer';
import { NeatConfigError } from 'old/utils/errors';
import type { ConfigSchema } from './schema';
import {
  ConfigSchemaType,
  getTranslateMapFromSchema,
  validateObjectWithSchema,
  validateSchema,
} from './schema';

type AssertionType = 'throw' | 'pretty' | 'plain';

export interface ConfigLoaderOptions {
  /**
   * Choose the type of assertion you want (defaults to "pretty"):
   *  - throw: throw the error
   *  - pretty: Log the error in pretty format and colors, then exit process
   *  - plain: Log the error in plain text, then exit process
   */
  assert?: AssertionType;
}

function handleError(type: AssertionType, error: unknown) {
  if (type === 'throw') throw error;
  if (!(error instanceof NeatConfigError)) throw error;
  if (type === 'plain') error.plainPrintAndExit();
  if (type === 'pretty') error.printAndExit();
  throw error;
}

export function createConfigLoader(
  loadOps?: ConfigLoaderOptions,
): ConfigBuilder {
  const assertionType = loadOps?.assert ?? 'pretty';
  const loaders: ConfigLoader = {
    environment: [],
    files: [],
    cli: [],
    dir: [],
    fragments: {
      fragments: {},
      key: '',
    },
    freeze: true,
  };
  let namingConvention: NamingConventionFunc = camelCaseNaming;
  let schema: ConfigSchema | null = null;

  return {
    addFromEnvironment(prefix = '') {
      try {
        populateLoaderFromEnvironment(loaders, prefix);
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    addFromDirectory(path: string, options: DirOptions = {}) {
      try {
        populateLoaderFromDir(loaders, { path, ...options });
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    addFromCLI(prefix = '') {
      try {
        populateLoaderFromCLI(loaders, prefix);
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    addFromFile(path: string, ops?: FileOptions): ConfigBuilder {
      try {
        populateLoaderFromFile(loaders, path, ops ?? {});
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    addJOISchema<Result>(
      joiSchema: ObjectSchema<Result>,
    ): ConfigBuilder<Result> {
      schema = {
        type: ConfigSchemaType.JOI,
        schema: joiSchema,
      };
      try {
        validateSchema(schema);
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    addZodSchema<T extends AnyZodObject>(
      zodSchema: T,
    ): ConfigBuilder<z.infer<T>> {
      schema = {
        type: ConfigSchemaType.ZOD,
        schema: zodSchema,
      };
      try {
        validateSchema(schema);
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    setNamingConvention(convention: NamingConventionFunc) {
      namingConvention = convention;
      return this;
    },
    addConfigFragment(name: string, frag: Fragment) {
      try {
        populateFragmentLoaderFromFragment(loaders, name, frag);
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    addConfigFragments(fragments: Record<string, Fragment>) {
      try {
        Object.entries(fragments).forEach(([name, frag]) => {
          populateFragmentLoaderFromFragment(loaders, name, frag);
        });
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    setFragmentKey(key: string) {
      try {
        populateFragmentLoaderWithKey(loaders, key);
      } catch (err) {
        handleError(assertionType, err);
      }
      return this;
    },
    unfreeze() {
      loaders.freeze = false;
      return this;
    },
    load(): any {
      try {
        // load and normalize keys
        const keys = loadLoaders(loaders);
        let normalizedKeys = normalizeConfigKeys(keys);

        // load fragments (and normalize their output)
        const fragmentOutput = extractFragmentDefinitionFromKeys(
          loaders.fragments,
          normalizedKeys,
        );
        const fragmentKeys = expandFragments(
          loaders.fragments,
          fragmentOutput.fragments,
        );
        normalizedKeys = normalizeConfigKeys(fragmentKeys).concat(
          fragmentOutput.keys,
        );

        // translations
        const translatorMap = getTranslateMapFromSchema(schema);
        const translatedKeys = useTranslatorMap(
          translatorMap,
          normalizedKeys,
          namingConvention,
        );

        // build output object and validation
        let output = buildObjectFromKeys(translatedKeys);
        output = validateObjectWithSchema(output, schema);

        // freezing
        if (loaders.freeze) output = deepFreeze(output);

        return output;
      } catch (err) {
        handleError(assertionType, err);
      }
    },
  };
}
