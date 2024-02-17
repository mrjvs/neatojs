import type { ObjectSchema } from 'utils/joi-types';
import type { AnyZodObject, TypeOf } from 'utils/zod-types';
import type { ConfigKeys } from 'loaders/base';
import type { CLILoader } from 'loaders/cli';
import { getKeysFromCLI } from 'loaders/cli';
import type { DirLoader, DirOptions } from 'loaders/dir';
import { getKeysFromDir } from 'loaders/dir';
import type { EnvironmentLoader } from 'loaders/environment';
import { getKeysFromEnvironment } from 'loaders/environment';
import type { FileLoader, FileOptions } from 'loaders/file';
import { getKeysFromFiles, ParserTypesType } from 'loaders/file';
import type { FragmentLoader } from 'loaders/fragment';
import type { DeepReadonly } from 'utils/freeze';
import type { NamingConventionFunc } from 'utils/translators/conventions';

export interface ConfigLoader {
  environment: EnvironmentLoader[];
  cli: CLILoader[];
  files: FileLoader[];
  dir: DirLoader[];
  fragments: FragmentLoader;
  freeze: boolean;
}

type ModifyFreeze<
  Ret extends any,
  TFreeze extends true | false,
> = TFreeze extends true ? DeepReadonly<Ret> : Ret;

export interface ConfigBuilder<Ret = any, TFreeze extends true | false = true> {
  // loaders
  addFromEnvironment: (prefix?: string) => ConfigBuilder<Ret, TFreeze>;
  addFromCLI: (prefix?: string) => ConfigBuilder<Ret, TFreeze>;
  addFromDirectory: (
    path: string,
    options?: DirOptions,
  ) => ConfigBuilder<Ret, TFreeze>;
  addFromFile: (path: string, ops?: FileOptions) => ConfigBuilder<Ret, TFreeze>;

  // schemas
  addJOISchema: <Result>(
    joiSchema: ObjectSchema<Result>,
  ) => ConfigBuilder<Result, TFreeze>;
  addZodSchema: <T extends AnyZodObject>(
    zodSchema: T,
  ) => ConfigBuilder<TypeOf<T>, TFreeze>;

  // fragments
  addConfigFragment: (
    name: string,
    fragment: Record<string, any>,
  ) => ConfigBuilder<Ret, TFreeze>;
  addConfigFragments: (
    fragments: Record<string, Record<string, any>>,
  ) => ConfigBuilder<Ret, TFreeze>;
  setFragmentKey: (key: string) => ConfigBuilder<Ret, TFreeze>;

  // other
  setNamingConvention: (
    convention: NamingConventionFunc,
  ) => ConfigBuilder<Ret, TFreeze>;
  unfreeze: () => ConfigBuilder<Ret, false>;
  load: () => ModifyFreeze<Ret, TFreeze>;
}

export function loadLoaders(loaders: ConfigLoader): ConfigKeys {
  const keys: ConfigKeys = [
    getKeysFromEnvironment(loaders.environment),
    getKeysFromCLI(loaders.cli),
    getKeysFromFiles(loaders.files),
    getKeysFromDir(loaders.dir),
  ].flat();
  return keys;
}
