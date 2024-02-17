import { createConfigLoader } from '../lib';

// prettier-ignore
const config = createConfigLoader()
  .addFromEnvironment()
  .load();

console.log(config);
