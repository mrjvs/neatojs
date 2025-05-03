import { setEnv } from '__tests__/test';
import { createConfig, loaders } from '../..';

describe('integration tests - fragments', () => {
  test('load normal fragments in config', () => {
    setEnv({
      HI: 'test2',
      USE_FRAGMENTS: 'A,B,c',
    });
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      presetKey: 'use_fragments',
      presets: {
        a: { one: 'one' },
        B: { two: 'two' },
        c: { three: 'three' },
      },
    });
    expect(config).toStrictEqual({
      hi: 'test2',
      one: 'one',
      two: 'two',
      three: 'three',
    });
  });

  test('overwriting of each other', () => {
    setEnv({
      USE_FRAGMENTS: 'A,B',
    });
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      presetKey: 'use_fragments',
      presets: {
        a: { one: 'one' },
        b: { one: 'two' },
      },
    });
    expect(config).toStrictEqual({
      one: 'two',
    });
  });

  test('error handling', () => {
    setEnv({
      USE_FRAGMENTS: 'A,F',
    });
    const config = () =>
      createConfig({
        assert: 'throw',
        loaders: [loaders.environment()],
        presetKey: 'use_fragments',
        presets: {
          a: { one: 'one' },
        },
      });
    expect(config).toThrowError(); // TODO better errors
  });
});
