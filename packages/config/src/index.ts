// methods
export { createConfigLoader } from 'builder/builder';

// name conventions
export {
  camelCaseNaming,
  pascalCaseNaming,
  screamingSnakeCaseNaming,
  snakeCaseNaming,
} from 'utils/translators/conventions';

// errors
export {
  NeatConfigError,
  ValidationError,
  FileLoadError,
  LoaderInputError,
  type Validation,
} from 'utils/errors';

// utils
export { zodCoercedBoolean } from 'utils/zodTypes';

// types
export type { ConfigBuilder } from 'builder/base';
export type { Fragment } from 'loaders/fragment';
export type { ParserTypesType, FileOptions } from 'loaders/file';
export type { DirOptions } from 'loaders/dir';
export type { NamingConventionFunc } from 'utils/translators/conventions';
export type { ConfigLoaderOptions } from 'builder/builder';
