import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'guider-webpack',
    entry: ['src/index.ts'],
    format: ['esm'],
    outExtension: () => ({ js: '.js', dts: '.d.ts' }),
    dts: true,
    bundle: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual', 'webpack'],
  },
  {
    name: 'guider-loader',
    entry: ['src/loader.ts'],
    format: ['esm'],
    outExtension: () => ({ js: '.js', dts: '.d.ts' }),
    bundle: true,
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
  {
    name: 'guider-client',
    entry: ['src/client.ts', 'src/theme.ts'],
    format: ['esm'],
    outExtension: () => ({ js: '.js', dts: '.d.ts' }),
    bundle: true,
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
]);
