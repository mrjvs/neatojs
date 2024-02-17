import { z } from 'zod';
import { createConfigLoader } from '../lib';

process.env.CONF_HI = 'Hello world';

const schema = z.object({
  Hi: z.string(),
});

// prettier-ignore
const config = createConfigLoader()
  .addFromEnvironment("CONF_")
  .addFromFile("./config.json")
  .addZodSchema(schema)
  .load();

console.log(config);
