import type { Compiler } from 'webpack';
import { findPagesDir } from 'next/dist/lib/find-pages-dir.js';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import { collectMetaFiles } from './collector';
import { virtualCache } from './cache';

const pluginName = 'GuiderPlugin';
const moduleId = 'node_modules/.virtual/guider-test.js';

export function getGuiderPluginCache() {
  return virtualCache.get();
}

export class GuiderPlugin {
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
        virtualCache.setThemeFile('./hello.tsx');
      } catch (err) {
        callback(err as Error);
        return;
      }

      callback();
    });

    const guiderModulesPlugin = new VirtualModulesPlugin({
      [moduleId]: '',
    });
    guiderModulesPlugin.apply(compiler);

    compiler.hooks.thisCompilation.tap(pluginName, () => {
      guiderModulesPlugin.writeModule(moduleId, 'module.exports = "hi!"');
    });
  }
}
