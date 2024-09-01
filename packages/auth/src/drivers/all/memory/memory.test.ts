import { randomUUID } from 'node:crypto';
import { testDriver } from '../__test__/drivertest.js';
import { inMemoryDriver } from './memory.js';

describe('memory', () => {
  const ids: [string, string, string] = [
    randomUUID(),
    randomUUID(),
    randomUUID(),
  ];
  testDriver(async () => {
    const driver = inMemoryDriver();
    await driver.connect();
    await Promise.all(ids.map((v) => driver.createUser(v)));
    return {
      driver,
    };
  }, ids);
});
