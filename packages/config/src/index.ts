// methods
export { createConfigLoader } from 'old/builder/builder';

// name conventions
export {
  camelCaseNaming,
  pascalCaseNaming,
  screamingSnakeCaseNaming,
  snakeCaseNaming,
} from 'old/utils/translators/conventions';

// errors
export {
  NeatConfigError,
  ValidationError,
  FileLoadError,
  LoaderInputError,
  type Validation,
} from 'old/utils/errors';

// utils
export { zodCoercedBoolean } from 'old/utils/zod-types';

// types
export type { ConfigBuilder } from 'old/builder/base';
export type { Fragment } from 'old/loaders/fragment';
export type { ParserTypesType, FileOptions } from 'old/loaders/file';
export type { DirOptions } from 'old/loaders/dir';
export type { NamingConventionFunc } from 'old/utils/translators/conventions';
export type { ConfigLoaderOptions } from 'old/builder/builder';
