import { setEnv } from '__tests__/test';
import { createConfig, loaders } from '../..';

describe('integration tests - basic', () => {
  test('load standard config', () => {
    setEnv({
      L1__L2__L3: 'test',
      HI: 'test2',
    });
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
    });
    expect(config).toStrictEqual({
      l1: { l2: { l3: 'test' } },
      hi: 'test2',
    });
  });

  test('load empty config', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [],
    });
    expect(config).toStrictEqual({});
  });
});
