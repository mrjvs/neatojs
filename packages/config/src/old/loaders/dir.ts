import { readdirSync, readFileSync } from 'node:fs';
import * as path from 'node:path';
import type { ConfigLoader } from 'builder/base';
import type { ConfigKeys } from 'loaders/base';

export interface DirOptions {
  prefix?: string;
}

export interface FullDirOptions extends DirOptions {
  path: string;
}

export interface DirLoader {
  prefix: string;
  path: string;
}

export function populateLoaderFromDir(
  loader: ConfigLoader,
  ops: FullDirOptions,
) {
  const optionWithDefaults = {
    prefix: '',
    ...ops,
  };
  loader.dir.push(optionWithDefaults);
}

export function getKeysFromDir(loaders: DirLoader[]): ConfigKeys {
  const keys: ConfigKeys = [];

  // gather list of directories to scan
  const directoriesToScan = loaders.reduce<
    { path: string; loaders: DirLoader[] }[]
  >((acc, loader) => {
    const existing = acc.find((v) => v.path === loader.path);
    if (!existing) {
      acc.push({
        loaders: [loader],
        path: loader.path,
      });
    } else {
      existing.loaders.push(loader);
    }
    return acc;
  }, []);

  // gather list of files to read, respecting prefixes
  const filesToRead: { path: string; key: string }[] = [];
  directoriesToScan.forEach((dir) => {
    const prefixes = dir.loaders.map((v) => v.prefix);
    let dirEntries;
    try {
      dirEntries = readdirSync(dir.path, { withFileTypes: true });
    } catch {
      // do nothing, if directory doesnt exist, it just gets ignored
      return;
    }
    const files = dirEntries.filter((v) => v.isFile());
    prefixes.forEach((prefix) => {
      files.forEach((file) => {
        if (!file.name.startsWith(prefix)) return;
        const fileNameWithoutPrefix = file.name.slice(prefix.length);
        filesToRead.push({
          key: fileNameWithoutPrefix,
          path: path.resolve(dir.path, file.name),
        });
      });
    });
  });

  // read files and store them in keys
  const groupedFilesToRead = filesToRead.reduce<
    { path: string; keys: string[] }[]
  >((acc, file) => {
    const existing = acc.find((v) => v.path === file.path);
    if (!existing) {
      acc.push({
        keys: [file.key],
        path: file.path,
      });
    } else {
      existing.keys.push(file.key);
    }
    return acc;
  }, []);
  groupedFilesToRead.forEach((file) => {
    const contents = readFileSync(file.path, { encoding: 'utf8' });
    file.keys.forEach((key) => {
      keys.push({
        key,
        value: contents,
      });
    });
  });

  return keys;
}
