import type { NextConfig } from 'next';
import ExtraWatchWebpackPlugin from 'extra-watch-webpack-plugin';
import { GuiderPlugin } from './webpack/plugin/plugin';
import type { GuiderInitConfig } from './types';

export { getGuiderPluginCache } from './webpack/plugin/plugin';

export function guider(initConfig: GuiderInitConfig) {
  const guiderConfig: GuiderInitConfig = {
    ...initConfig,
  };
  const guiderPlugin = new GuiderPlugin(guiderConfig);

  function withGuider(nextConfig: NextConfig = {}): NextConfig {
    const extraWatchers = new ExtraWatchWebpackPlugin({
      files: ['pages/**/_meta.json'],
    });
    return {
      ...nextConfig,
      pageExtensions: [
        ...(nextConfig.pageExtensions ?? ['js', 'jsx', 'ts', 'tsx']),
        ...['md', 'mdx'],
      ],
      webpack(config, options) {
        if (!config.plugins) config.plugins = [];
        config.plugins.push(guiderPlugin);
        config.plugins.push(extraWatchers);

        config.module.rules.push({
          test: /\.mdx?$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@neato/guider/loader',
              options: {
                type: 'mdx',
                guiderConfig,
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.guider\.virtual\.mjs$/,
          use: [
            options.defaultLoaders.babel,
            {
              loader: '@neato/guider/loader',
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
