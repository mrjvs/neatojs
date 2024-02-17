import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import type { ConfigLoader } from 'builder/base';
import type { ConfigKeys } from 'loaders/base';
import { LoaderInputError } from 'utils/errors';
import { loadKeysFromJsonFileData } from './files/json';
import { loadKeysFromEnvFileData } from './files/env';

export const ParserTypes = {
  JSON: 'JSON',
  ENV: 'ENV',
  FROM_EXT: 'FROM_EXT',
} as const;
export type ParserTypesType = keyof typeof ParserTypes;

export interface FileOptions {
  type?: ParserTypesType;
  prefix?: string;
}

const parserMap: Record<string, ParserTypesType> = {
  json: 'JSON',
  env: 'ENV',
} as const;

export const fileParsers: Record<
  ParserTypesType,
  (data: string, prefix?: string) => ConfigKeys
> = {
  JSON: loadKeysFromJsonFileData,
  ENV: loadKeysFromEnvFileData,
  FROM_EXT: () => {
    throw new Error('Cannot use FROM_EXT as a parsing type');
  },
};

export interface FileLoader {
  path: string;
  type: ParserTypesType;
  prefix?: string;
}

function getExtension(path: string): string {
  const filename = basename(path);
  if (!filename) return '';
  const extensionIndex = filename.lastIndexOf('.');
  if (extensionIndex === -1) return '';
  const extension = filename.slice(extensionIndex + 1);
  return extension.toLowerCase();
}

export function populateLoaderFromFile(
  loader: ConfigLoader,
  path: string,
  ops: FileOptions,
) {
  let type = ops.type ?? ParserTypes.FROM_EXT;
  const prefix = ops.prefix;
  if (type === ParserTypes.FROM_EXT) {
    const extType = parserMap[getExtension(path)];
    if (!extType)
      throw new LoaderInputError(`Unrecognized extension for '${path}'`);
    type = extType;
  }
  if (!Object.values(ParserTypes).includes(type))
    throw new LoaderInputError(`invalid parser type '${type}'`);
  loader.files.push({
    path,
    type,
    prefix,
  });
}

export function getKeysFromFiles(loaders: FileLoader[]): ConfigKeys {
  const keys: ConfigKeys = [];
  loaders.forEach((v) => {
    let data;
    try {
      data = readFileSync(v.path, { encoding: 'utf8' });
    } catch {
      // do nothing, if file doesnt exist, just ignore it
      return;
    }
    const parser = fileParsers[v.type];
    keys.push(...parser(data, v.prefix));
  });
  return keys;
}
