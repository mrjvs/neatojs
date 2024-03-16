import type { Compiler } from 'webpack';
import { findPagesDir } from 'next/dist/lib/find-pages-dir.js';
import type { GuiderInitConfig } from '../../types';
import { collectMetaFiles } from './collector';
import { virtualCache } from './cache';
import { themeFileResolver } from './theme-resolver';

const pluginName = 'GuiderPlugin';

export function getGuiderPluginCache() {
  return virtualCache.get();
}

export async function runScanner(config: GuiderInitConfig) {
  const directories = findPagesDir(process.cwd());
  if (!directories.pagesDir) {
    return;
  }

  const result = await collectMetaFiles({ dir: directories.pagesDir });
  virtualCache.setPageMap(result.pageMap);
  virtualCache.setItems(result.items);
  virtualCache.setThemeFile(themeFileResolver(config.themeConfig));
}

export class GuiderPlugin {
  #config: GuiderInitConfig;

  constructor(config: GuiderInitConfig) {
    this.#config = config;
  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapAsync(pluginName, async (_, callback) => {
      try {
        await runScanner(this.#config);
      } catch (err) {
        callback(err as Error);
        return;
      }

      callback();
    });
  }
}
