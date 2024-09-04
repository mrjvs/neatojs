import { randomUUID } from 'node:crypto';
import { testDriver } from '../__test__/drivertest';
import { inMemoryDriver } from './memory';

describe('memory', () => {
  const ids: [string, string, string] = [
    randomUUID(),
    randomUUID(),
    randomUUID(),
  ];
  testDriver(async () => {
    const driver = inMemoryDriver();
    await driver.connect();
    await Promise.all(ids.map((v) => driver.createUser(v, `${v}@example.com`)));
    return {
      driver,
    };
  }, ids);
});
