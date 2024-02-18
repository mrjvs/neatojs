import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'guider',
    entry: ['src/index.ts', 'src/loader.ts'],
    external: ['@neato/guider'], // the loader imports the standard entry for the cache
    format: 'cjs',
    dts: true,
  },
  {
    name: 'guider-client',
    entry: ['src/client.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    external: ['@neato/guider/loader!?virtual'],
  },
]);
