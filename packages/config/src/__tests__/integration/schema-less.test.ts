import { setEnv } from '__tests__/test';
import { createConfig, loaders, naming } from '../..';

describe('integration tests - basic', () => {
  test('load standard config', () => {
    setEnv({
      HELLO_WORLD__HI_AGAIN__L3: 'test',
      HI: 'test2',
    });
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      namingConvention: naming.camelCase,
    });
    expect(config).toStrictEqual({
      helloWorld: { hiAgain: { l3: 'test' } },
      hi: 'test2',
    });
    const config2 = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      namingConvention: naming.pascalCase,
    });
    expect(config2).toStrictEqual({
      HelloWorld: { HiAgain: { L3: 'test' } },
      Hi: 'test2',
    });
  });
});
