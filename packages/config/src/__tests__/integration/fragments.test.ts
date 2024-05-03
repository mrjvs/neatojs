import { setEnv } from '__tests__/test';
import { createConfigLoader } from '../..';

describe('integration tests - fragments', () => {
  test('load normal fragments in config', () => {
    setEnv({
      HI: 'test2',
      USE_FRAGMENTS: 'A,B,c',
    });
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment()
      .setFragmentKey('use_fragments')
      .addConfigFragment('a', { one: 'one' })
      .addConfigFragments({ B: { two: 'two' }, c: { three: 'three' } })
      .load();
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
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment()
      .setFragmentKey('use_fragments')
      .addConfigFragment('a', { one: 'one' })
      .addConfigFragment('b', { one: 'two' })
      .load();
    expect(config).toStrictEqual({
      one: 'two',
    });
  });

  test('error handling', () => {
    setEnv({
      USE_FRAGMENTS: 'A,F',
    });
    const config = () =>
      createConfigLoader({ assert: 'throw' })
        .addFromEnvironment()
        .setFragmentKey('use_fragments')
        .addConfigFragment('a', { one: 'one' })
        .load();
    expect(config).toThrowError(); // TODO better errors
  });
});
