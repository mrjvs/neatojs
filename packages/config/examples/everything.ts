import { createConfigLoader } from '../lib';

// prettier-ignore
const config = createConfigLoader()
  .addFromEnvironment("CONF_")
  .addFromCLI()
  .addFromDirectory("/var/run/secrets")
  .addFromFile("config.json")
  .addFromFile(".env")
  .load();

console.log(config);
