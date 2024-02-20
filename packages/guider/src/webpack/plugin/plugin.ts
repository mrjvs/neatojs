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

export class GuiderPlugin {
  #config: GuiderInitConfig;

  constructor(config: GuiderInitConfig) {
    this.#config = config;
  }

  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapAsync(pluginName, async (_, callback) => {
      const directories = findPagesDir(process.cwd());
      if (!directories.pagesDir) {
        callback();
        return;
      }

      try {
        const result = await collectMetaFiles({ dir: directories.pagesDir });
        virtualCache.setItems(result.items);
        virtualCache.setThemeFile(themeFileResolver(this.#config.themeConfig));
      } catch (err) {
        callback(err as Error);
        return;
      }

      callback();
    });
  }
}