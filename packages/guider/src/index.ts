import type { NextConfig } from 'next';
import ExtraWatchWebpackPlugin from 'extra-watch-webpack-plugin';
import { GuiderPlugin } from './webpack/plugin/plugin';
import type { GuiderInitConfig } from './types';
import { GuiderSearchPlugin } from './webpack/search';

export { getGuiderPluginCache } from './webpack/plugin/plugin';

export function guider(initConfig: GuiderInitConfig) {
  const guiderConfig: GuiderInitConfig = {
    ...initConfig,
  };
  const guiderPlugin = new GuiderPlugin(guiderConfig);
  const searchPlugin = new GuiderSearchPlugin();

  function withGuider(nextConfig: NextConfig = {}): NextConfig {
    const extraWatchers = new ExtraWatchWebpackPlugin({
      files: ['pages/**/_meta.json'],
    });
    return {
      ...nextConfig,
      images: {
        ...(nextConfig.images ?? {}),
        unoptimized: nextConfig?.images?.unoptimized ?? true,
      },
      transpilePackages: [
        '@neato/guider',
        ...(nextConfig.transpilePackages ?? []),
      ],
      pageExtensions: [
        ...(nextConfig.pageExtensions ?? ['js', 'jsx', 'ts', 'tsx']),
        ...['md', 'mdx'],
      ],
      webpack(config, options) {
        if (!config.plugins) config.plugins = [];
        config.plugins.push(guiderPlugin);
        config.plugins.push(searchPlugin);
        config.plugins.push(extraWatchers);

        config.module.rules.push({
          test: /\.mdx?$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@neato/guider/loader.cjs',
              options: {
                type: 'mdx',
                guiderConfig,
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.guider\.virtual\.js$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@neato/guider/loader.cjs',
              options: {
                type: 'virtual',
                guiderConfig,
              },
            },
          ],
        });

        return nextConfig.webpack?.(config, options) ?? config;
      },
    };
  }

  return withGuider;
}
