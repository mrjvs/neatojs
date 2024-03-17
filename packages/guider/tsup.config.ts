import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'guider',
    entry: ['src/index.ts', 'src/loader.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
  {
    name: 'guider-client',
    entry: ['src/client.ts', 'src/theme.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: ['@neato/guider', '@neato/guider/shim.guider.virtual'],
  },
]);
