import { relative, sep } from 'node:path';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import webpack from 'webpack';
import type { Compiler } from 'webpack';
import { glob } from 'glob';
import { mdLoader } from '../loader/md-loader';

const pluginName = 'GuiderSearchPlugin';
const defaultKey = 'default';

const pathSeparatorRegex = RegExp(`\\${sep}`, 'g');
function normalizePathSeparator(path: string): string {
  return path.replace(pathSeparatorRegex, '/');
}

async function filePathToPageData(filePath: string) {
  let strippedPath = relative('./pages', filePath).replace(/.mdx?$/g, '');
  const fileContents = await readFile(filePath, 'utf-8');

  strippedPath = normalizePathSeparator(strippedPath);
  strippedPath = strippedPath.replace(/index$/g, '');

  if (strippedPath.endsWith('/')) strippedPath = strippedPath.slice(0, -1);

  return {
    sitePath: `/${strippedPath}`,
    fileContents,
  };
}

function generateChecksum(str: string) {
  return createHash('md5').update(str, 'utf8').digest('hex');
}

const cache: Record<string, any> = {};

export class GuiderSearchPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        async (assets, callback) => {
          try {
            const dataBuckets: Record<string, any> = {};

            const mdxPages = await glob('pages/**/*.{mdx,md}');
            const pageData = await Promise.all(
              mdxPages.map(async (filePath) => {
                const sitePathData = await filePathToPageData(filePath);
                const hash = generateChecksum(sitePathData.fileContents);
                const key = `${filePath}-${hash}`;
                const compiled =
                  cache[key] ?? (await mdLoader(sitePathData.fileContents));
                cache[key] = compiled;
                return {
                  searchData: compiled.searchData,
                  sitePath: sitePathData.sitePath,
                };
              }),
            );

            for (const page of pageData) {
              const key = defaultKey;
              dataBuckets[key] ??= {};
              dataBuckets[key][page.sitePath] = page.searchData;
            }

            for (const [fileKey, content] of Object.entries(dataBuckets)) {
              assets[`static/chunks/guider-data-${fileKey}.json`] =
                new webpack.sources.RawSource(JSON.stringify(content));
            }
          } catch (err) {
            callback(err as Error);
            return;
          }

          callback();
        },
      );
    });
  }
}
