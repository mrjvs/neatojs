import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'guider',
    entry: ['src/index.ts', 'src/loader.ts', 'src/theme.ts'],
    format: ['cjs', 'esm'],
    dts: true,

    // the loader imports the standard entrypoint for the cache
    external: ['@neato/guider'],
  },
  {
    name: 'guider-client',
    entry: ['src/client.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: ['@neato/guider/loader!?virtual'],
  },
]);
