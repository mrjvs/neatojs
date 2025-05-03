import { runKeyLoader } from '__tests__/test';
import { loaders } from '../..';

describe('cli loader', () => {
  function setupArgv() {
    vi.stubGlobal('process', {
      argv: [
        'node',
        'test.js',
        '--test',
        'value',
        '--conf-test1=abc',
        '--conf-test2=def',
        '--conf-test3',
        'ghi',
        'another-arg',
      ],
    });
  }

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
    setupArgv();
    checkIfArrayHas(runKeyLoader(loaders.cli({ prefix: '' })), [
      { key: 'conf-test1', value: 'abc' },
      { key: 'conf-test2', value: 'def' },
      { key: 'conf-test3', value: 'ghi' },
      { key: 'test', value: 'value' },
    ]);
  });

  test('key parsing with prefix', () => {
    setupArgv();
    checkIfArrayHas(runKeyLoader(loaders.cli({ prefix: 'conf-test' })), [
      { key: '1', value: 'abc' },
      { key: '2', value: 'def' },
      { key: '3', value: 'ghi' },
    ]);
  });

  test('unbalanced arguments', () => {
    process.argv = [
      'node',
      'test.js',
      '--test',
      'value',
      '--conf-test1=abc',
      '--conf-test2=def',
      '--conf-test3',
      'ghi',
      'another-arg',
      '--conf-test5',
    ];
    expect(() => runKeyLoader(loaders.cli({ prefix: 'conf-' }))).toThrowError(); // TODO better errors
  });

  test('no values found', () => {
    setupArgv();
    expect(runKeyLoader(loaders.cli({ prefix: 'hello-' }))).toStrictEqual([]);
  });
});
