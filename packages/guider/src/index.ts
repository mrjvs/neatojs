import type { NextConfig } from 'next';
import { GuiderPlugin } from './webpack/plugin/plugin';

export { getGuiderPluginCache } from './webpack/plugin/plugin';

export interface GuiderInitConfig {
  themeConfig: string | string[];
}

const guiderDefaultConfig: GuiderInitConfig = {
  themeConfig: [
    './guider.config.jsx',
    './guider.config.js',
    './guider.config.tsx',
    './guider.config.ts',
  ],
};

export function guider(initConfig: Partial<GuiderInitConfig>) {
  const _guiderConfig: GuiderInitConfig = {
    ...guiderDefaultConfig,
    ...initConfig,
  };

  function withGuider(nextConfig: NextConfig = {}): NextConfig {
    const guiderPlugin = new GuiderPlugin();
    return {
      ...nextConfig,
      pageExtensions: [
        ...(nextConfig.pageExtensions ?? ['js', 'jsx', 'ts', 'tsx']),
        ...['md', 'mdx'],
      ],
      webpack(config, options) {
        if (!config.plugins) config.plugins = [];
        config.plugins.push(guiderPlugin);

        config.module.rules.push(
          {
            test: /\.mdx?$/,
            use: [
              options.defaultLoaders.babel,
              {
                loader: '@neato/guider/loader',
                options: {
                  type: 'mdx',
                },
              },
            ],
          },
          {
            test: /_meta.json$/,
            issuer: (request: any) => !request,
            use: [
              options.defaultLoaders.babel,
              {
                loader: '@neato/guider/loader',
                options: {
                  type: 'meta',
                },
              },
            ],
          },
        );

        return nextConfig.webpack?.(config, options) ?? config;
      },
    };
  }

  return withGuider;
}
