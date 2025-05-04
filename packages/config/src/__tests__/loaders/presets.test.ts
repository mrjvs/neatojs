import { expandPresets, extractUsedPresets } from 'loading/presets';

describe('fragment loader', () => {
  test('no fragments', () => {
    const keys = [{ key: 'test', value: 'test' }];
    expect(extractUsedPresets('', keys)).toStrictEqual({
      selectedPresets: [],
      keys,
    });

    expect(extractUsedPresets('HELLO_WORLD', keys)).toStrictEqual({
      selectedPresets: [],
      keys,
    });
    expect(expandPresets({}, [])).toStrictEqual([]);
  });

  test('no used fragments', () => {
    const loader = {
      presets: {
        FRAG_TEST: { hi: 'hi' },
        FRAG_TEST2: { hi2: 'hi2' },
      },
      key: 'USE_PRESETS',
    };
    const keys = [{ key: 'test', value: 'test' }];
    expect(extractUsedPresets(loader.key, keys)).toStrictEqual({
      selectedPresets: [],
      keys,
    });
    const keys2 = [
      { key: 'test', value: 'test' },
      { key: 'USE_PRESETS', value: '' },
    ];
    expect(extractUsedPresets(loader.key, keys2)).toStrictEqual({
      selectedPresets: [],
      keys,
    });
    expect(expandPresets(loader.presets, [])).toStrictEqual([]);
  });

  test('use one fragment', () => {
    const loader = {
      presets: {
        FRAG_TEST: { hi: 'hi' },
        FRAG_TEST2: { hi2: 'hi2' },
      },
      key: 'USE_PRESETS',
    };
    const keys = [
      { key: 'test', value: 'test' },
      { key: 'USE_PRESETS', value: 'FRAG_TEST' },
    ];
    expect(extractUsedPresets(loader.key, keys)).toStrictEqual({
      selectedPresets: ['FRAG_TEST'],
      keys: [{ key: 'test', value: 'test' }],
    });
    expect(expandPresets(loader.presets, ['FRAG_TEST'])).toStrictEqual([
      {
        key: 'hi',
        value: 'hi',
      },
    ]);
  });

  test('use multiple fragments', () => {
    const loader = {
      presets: {
        FRAG_TEST: { hi: 'hi' },
        FRAG_TEST2: { hi2: 'hi2' },
      },
      key: 'USE_PRESETS',
    };
    const keys = [
      { key: 'USE_PRESETS', value: 'frag_test,frag_test2' },
      { key: 'test', value: 'test' },
    ];
    expect(extractUsedPresets(loader.key, keys)).toStrictEqual({
      selectedPresets: ['FRAG_TEST', 'FRAG_TEST2'],
      keys: [{ key: 'test', value: 'test' }],
    });
    expect(
      expandPresets(loader.presets, ['FRAG_TEST', 'FRAG_TEST2']),
    ).toStrictEqual([
      {
        key: 'hi',
        value: 'hi',
      },
      {
        key: 'hi2',
        value: 'hi2',
      },
    ]);
  });

  test('fragmentloading order', () => {
    const loader = {
      presets: {
        FRAG_TEST2: { hi: 'hi2' },
        FRAG_TEST: { hi: 'hi', yoink: 'yoink' },
      },
      key: 'USE_PRESETS',
    };
    const keys = [
      { key: 'USE_PRESETS', value: 'frag_test,frag_test2' },
      { key: 'test', value: 'test' },
    ];
    expect(extractUsedPresets(loader.key, keys)).toStrictEqual({
      selectedPresets: ['FRAG_TEST', 'FRAG_TEST2'],
      keys: [{ key: 'test', value: 'test' }],
    });
    expect(
      expandPresets(loader.presets, ['FRAG_TEST', 'FRAG_TEST2']),
    ).toStrictEqual([
      {
        key: 'hi',
        value: 'hi',
      },
      {
        key: 'yoink',
        value: 'yoink',
      },
      {
        key: 'hi',
        value: 'hi2',
      },
    ]);
  });

  test('error handling', () => {
    const loader = {
      presets: {
        FRAG_TEST2: { hi: 'hi2' },
        FRAG_TEST: { hi: 'hi', yoink: 'yoink' },
      },
      key: 'USE_PRESETS',
    };
    expect(() =>
      expandPresets(loader.presets, ['I_DONT_EXIST']),
    ).toThrowError(); // TODO Better errors
  });
});
