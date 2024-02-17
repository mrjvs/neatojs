import { createConfigLoader } from '../lib';

const mongoLocalFragment = {
  mongo: {
    url: 'mongodb://localhost:27017/cool-config',
  },
};

const corsLocalFragment = {
  cors: {
    origins: '*',
    allowCredentials: 'true',
  },
};

// prettier-ignore
const config = createConfigLoader()
  .addFromEnvironment()
  .addFromFile("config.json")
  .addFromFile(".env")
  .addConfigFragment("mongo-local", mongoLocalFragment)
  .addConfigFragment("cors-local", corsLocalFragment)
  .setFragmentKey("use-fragments")
  .load();

console.log(config);
