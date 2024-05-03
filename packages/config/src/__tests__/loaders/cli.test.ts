import { getKeysFromCLI } from '../../loaders/cli';

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
    checkIfArrayHas(getKeysFromCLI([{ prefix: '' }]), [
      { key: 'conf-test1', value: 'abc' },
      { key: 'conf-test2', value: 'def' },
      { key: 'conf-test3', value: 'ghi' },
      { key: 'test', value: 'value' },
    ]);
  });

  test('key parsing with prefix', () => {
    setupArgv();
    checkIfArrayHas(getKeysFromCLI([{ prefix: 'conf-test' }]), [
      { key: '1', value: 'abc' },
      { key: '2', value: 'def' },
      { key: '3', value: 'ghi' },
    ]);
  });

  test('loading multiple prefixes', () => {
    setupArgv();
    checkIfArrayHas(
      getKeysFromCLI([{ prefix: 'conf-' }, { prefix: 'conf-test' }]),
      [
        { key: 'test1', value: 'abc' },
        { key: 'test2', value: 'def' },
        { key: 'test3', value: 'ghi' },
        { key: '1', value: 'abc' },
        { key: '2', value: 'def' },
        { key: '3', value: 'ghi' },
      ],
    );
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
    expect(() => getKeysFromCLI([{ prefix: 'conf-' }])).toThrowError(); // TODO better errors
  });

  test('no values found', () => {
    setupArgv();
    expect(getKeysFromCLI([{ prefix: 'hello-' }])).toStrictEqual([]);
  });
});
