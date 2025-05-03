import { readdirSync, readFileSync } from 'node:fs';
import * as path from 'node:path';
import type { KeyCollection, KeyLoader } from 'loading/types';

export type DirLoaderOptions = {
  prefix?: string;
};

export function getKeysFromDir(dirPath: string, prefix: string): KeyCollection {
  const keys: KeyCollection = [];

  // gather list of files to read, respecting prefixes
  const filesToRead: { path: string; key: string }[] = [];
  let dirEntries;
  try {
    dirEntries = readdirSync(dirPath, { withFileTypes: true });
  } catch {
    // do nothing, if directory doesnt exist, it just gets ignored
    return [];
  }
  dirEntries
    .filter((v) => v.isFile())
    .forEach((file) => {
      if (!file.name.startsWith(prefix)) return;
      const fileNameWithoutPrefix = file.name.slice(prefix.length);
      filesToRead.push({
        key: fileNameWithoutPrefix,
        path: path.resolve(dirPath, file.name),
      });
    });

  // read files and store them in keys
  filesToRead.forEach((file) => {
    const contents = readFileSync(file.path, { encoding: 'utf8' });
    keys.push({
      key: file.key,
      value: contents,
    });
  });

  return keys;
}

export function dirLoader(dirPath: string, ops?: DirLoaderOptions): KeyLoader {
  return {
    name: 'dir',
    load(_ctx) {
      return getKeysFromDir(dirPath, ops?.prefix ?? '');
    },
  };
}
