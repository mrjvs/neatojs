import { loaderCtx, runKeyLoader, setEnv } from '__tests__/test';
import { loaders } from '../..';

describe('Environment loader', () => {
  beforeAll(() => {
    setEnv({
      test1: 'abc',
      test2: 'def',
      test3: 'ghi',
    });
  });

  function checkIfArrayHas(test: any, value: any) {
    expect(test).toBeInstanceOf(Array);
    expect(test.length).toBe(value.length);
    for (const obj of test) {
      const found = value.find((v: any) => v.key === obj.key);
      expect(found).toBeTruthy();
      expect(obj).toStrictEqual(found);
    }
  }

  test('key parsing without prefix', () => {
    checkIfArrayHas(runKeyLoader(loaders.environment(), loaderCtx('')), [
      { key: 'test1', value: 'abc' },
      { key: 'test2', value: 'def' },
      { key: 'test3', value: 'ghi' },
    ]);
  });

  test('key parsing with prefix', () => {
    checkIfArrayHas(runKeyLoader(loaders.environment(), loaderCtx('test')), [
      { key: '1', value: 'abc' },
      { key: '2', value: 'def' },
      { key: '3', value: 'ghi' },
    ]);
  });
});
