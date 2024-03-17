import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'guider-webpack',
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
  {
    name: 'guider-loader',
    entry: ['src/loader.ts'],
    format: ['esm'],
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
  {
    name: 'guider-client',
    entry: ['src/client.ts', 'src/theme.ts'],
    format: ['esm'],
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
]);
