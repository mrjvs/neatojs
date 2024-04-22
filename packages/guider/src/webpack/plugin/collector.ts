import {
  relative,
  dirname,
  sep,
  normalize,
  extname,
  basename,
} from 'node:path';
import { readFile } from 'node:fs/promises';
import { glob } from 'glob';

export interface MetaCollectorOptions {
  dir: string;
}

export type CollectorItem = {
  sitePath: string;
  fileContents: Record<string, any>;
  config: Record<string, any>;
};

export type PageMapItem = {
  sitePath: string;
  filePath: string; // path relative to project root
  urlSafeFilePath: string; // filePath with / as separator
};

export interface MetaCollectorResult {
  items: CollectorItem[];
  pageMap: PageMapItem[];
}

const pathSeparatorRegex = RegExp(`\\${sep}`, 'g');
function normalizePathSeparator(path: string): string {
  return path.replace(pathSeparatorRegex, '/');
}

async function filePathToSitePath(filePath: string): Promise<CollectorItem> {
  let strippedPath = dirname(relative('./pages', filePath));
  const fileContents = await readFile(filePath, 'utf-8');
  const parsedContents = JSON.parse(fileContents);

  strippedPath = normalizePathSeparator(strippedPath);

  return {
    sitePath: `/${strippedPath}`,
    fileContents: parsedContents,
    config: {},
  };
}

async function pagePathToSitePath(
  filePath: string,
): Promise<PageMapItem | null> {
  const file = basename(filePath, extname(filePath));
  let dir = dirname(relative('./pages', filePath));
  if (dir === '.') dir = '';

  dir = normalizePathSeparator(dir);
  const urlSafeFilePath = normalizePathSeparator(filePath);

  if (file.startsWith('_')) return null;

  const strippedPath = file === 'index' ? dir : `${dir}/${file}`;
  return {
    sitePath: strippedPath.startsWith('/') ? strippedPath : `/${strippedPath}`,
    filePath,
    urlSafeFilePath,
  };
}

function isParent(parent: string, dir: string): boolean {
  const normalizedParent = normalize(parent) + sep;
  const normalizedDir = normalize(dir) + sep;
  return normalizedDir.startsWith(normalizedParent);
}

export async function collectMetaFiles(
  _ops: MetaCollectorOptions,
): Promise<MetaCollectorResult> {
  const metaFiles = await glob('pages/**/_meta.json', {
    ignore: 'node_modules/**',
  });
  const unfilteredItems = await Promise.all(
    metaFiles.map((v) => filePathToSitePath(v)),
  );
  const items = unfilteredItems.filter((v): v is CollectorItem => Boolean(v));

  // derive full config by merging all parents together
  for (const item of items) {
    let parents = items.filter((parent) =>
      isParent(parent.sitePath, item.sitePath),
    );
    parents = parents.sort((a, b) => a.sitePath.length - b.sitePath.length);
    const finalConfig = parents.reduce(
      (a, v) => ({ ...a, ...v.fileContents }),
      {},
    );
    item.config = finalConfig;
  }

  const pageFiles = await glob('pages/**/*.{tsx,ts,js,jsx,mdx,md}', {
    ignore: 'node_modules/**',
  });
  const unfilteredPageFileList = await Promise.all(
    pageFiles.map((v) => pagePathToSitePath(v)),
  );
  const pageFileList = unfilteredPageFileList.filter((v): v is PageMapItem =>
    Boolean(v),
  );

  return {
    items,
    pageMap: pageFileList,
  };
}
