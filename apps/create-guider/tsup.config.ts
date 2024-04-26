import { defineConfig } from 'tsup';

export default defineConfig({
  name: 'create-guider',
  entry: ['src/index.ts'],
  format: ['esm'],
  outExtension: () => ({ js: '.js', dts: '.d.ts' }),
  dts: true,
  bundle: true,
});
