import { setEnv } from '__tests__/test';
import { createConfigLoader } from '../..';
import {
  camelCaseNaming,
  pascalCaseNaming,
} from '../../utils/translators/conventions';

describe('integration tests - basic', () => {
  test('load standard config', () => {
    setEnv({
      HELLO_WORLD__HI_AGAIN__L3: 'test',
      HI: 'test2',
    });
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment()
      .setNamingConvention(camelCaseNaming)
      .load();
    expect(config).toStrictEqual({
      helloWorld: { hiAgain: { l3: 'test' } },
      hi: 'test2',
    });
    const config2 = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment()
      .setNamingConvention(pascalCaseNaming)
      .load();
    expect(config2).toStrictEqual({
      HelloWorld: { HiAgain: { L3: 'test' } },
      Hi: 'test2',
    });
  });
});
