import { relative, dirname, sep, normalize } from 'node:path';
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

export interface MetaCollectorResult {
  items: CollectorItem[];
}

async function filePathToSitePath(
  filePath: string,
): Promise<CollectorItem | null> {
  const strippedPath = dirname(relative('./pages', filePath));
  const fileContents = await readFile(filePath, 'utf-8');
  const parsedContents = JSON.parse(fileContents);
  return {
    sitePath: `/${strippedPath}`,
    fileContents: parsedContents,
    config: {},
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
    // TODO deep merge
    const finalConfig = parents.reduce(
      (a, v) => ({ ...a, ...v.fileContents }),
      {},
    );
    item.config = finalConfig;
  }

  return {
    items,
  };
}
