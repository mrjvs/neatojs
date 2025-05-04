import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import type { KeyCollection, KeyLoader, KeyLoaderContext } from 'loading/types';
import { LoaderInputError } from 'utils/errors';
import { loadKeysFromEnvFile } from './env.file';
import { loadKeysFromJsonFile } from './json.file';

export const ParserTypes = {
  JSON: 'JSON',
  ENV: 'ENV',
  FROM_EXT: 'FROM_EXT',
} as const;
export type ParserTypesType = keyof typeof ParserTypes;

export type FileLoaderOptions = {
  type?: ParserTypesType;
};

const parserMap: Record<string, ParserTypesType> = {
  json: 'JSON',
  env: 'ENV',
} as const;

export const fileParsers: Record<
  ParserTypesType,
  (data: string, prefix: string) => KeyCollection
> = {
  JSON: loadKeysFromJsonFile,
  ENV: loadKeysFromEnvFile,
  FROM_EXT: () => {
    throw new Error('Cannot use FROM_EXT as a parsing type');
  },
};

export function getExtension(path: string): string {
  const filename = basename(path);
  if (!filename) return '';
  const extensionIndex = filename.lastIndexOf('.');
  if (extensionIndex === -1) return '';
  const extension = filename.slice(extensionIndex + 1);
  return extension.toLowerCase();
}

export function getKeysFromFile(
  ctx: KeyLoaderContext,
  filePath: string,
  type: ParserTypesType,
): KeyCollection {
  let parserType = type;
  if (parserType === ParserTypes.FROM_EXT) {
    const extType = parserMap[getExtension(filePath)];
    if (!extType)
      throw new LoaderInputError(`Unrecognized extension for '${filePath}'`);
    parserType = extType;
  }
  if (!Object.values(ParserTypes).includes(parserType))
    throw new LoaderInputError(`invalid parser type '${parserType}'`);

  let prefix = '';
  if (parserType === ParserTypes.ENV) {
    prefix = ctx.envPrefix;
  }

  let data;
  try {
    data = readFileSync(filePath, { encoding: 'utf8' });
  } catch {
    // do nothing, if file doesnt exist, just ignore it
    return [];
  }

  const parser = fileParsers[type];
  return parser(data, prefix);
}

export function fileLoader(path: string, ops?: FileLoaderOptions): KeyLoader {
  return {
    name: 'file',
    load(ctx) {
      return getKeysFromFile(ctx, path, ops?.type ?? ParserTypes.FROM_EXT);
    },
  };
}
