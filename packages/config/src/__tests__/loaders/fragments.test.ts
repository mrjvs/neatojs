import type { fragmentLoader } from '../../loaders/fragment';
import {
  expandFragments,
  extractFragmentDefinitionFromKeys,
} from '../../loaders/fragment';

describe('fragment loader', () => {
  test('no fragments', () => {
    const loader: fragmentLoader = {
      fragments: {},
      key: '',
    };
    const keys = [{ key: 'test', value: 'test' }];
    expect(extractFragmentDefinitionFromKeys(loader, keys)).toStrictEqual({
      fragments: [],
      keys,
    });
    loader.key = 'HELLO_WORLD';
    expect(extractFragmentDefinitionFromKeys(loader, keys)).toStrictEqual({
      fragments: [],
      keys,
    });
    expect(expandFragments(loader, [])).toStrictEqual([]);
  });

  test('no used fragments', () => {
    const loader: fragmentLoader = {
      fragments: {
        FRAG_TEST: { hi: 'hi' },
        FRAG_TEST2: { hi2: 'hi2' },
      },
      key: 'USE_FRAGMENTS',
    };
    const keys = [{ key: 'test', value: 'test' }];
    expect(extractFragmentDefinitionFromKeys(loader, keys)).toStrictEqual({
      fragments: [],
      keys,
    });
    const keys2 = [
      { key: 'test', value: 'test' },
      { key: 'USE_FRAGMENTS', value: '' },
    ];
    expect(extractFragmentDefinitionFromKeys(loader, keys2)).toStrictEqual({
      fragments: [],
      keys,
    });
    expect(expandFragments(loader, [])).toStrictEqual([]);
  });

  test('use one fragment', () => {
    const loader: fragmentLoader = {
      fragments: {
        FRAG_TEST: { hi: 'hi' },
        FRAG_TEST2: { hi2: 'hi2' },
      },
      key: 'USE_FRAGMENTS',
    };
    const keys = [
      { key: 'test', value: 'test' },
      { key: 'USE_FRAGMENTS', value: 'FRAG_TEST' },
    ];
    expect(extractFragmentDefinitionFromKeys(loader, keys)).toStrictEqual({
      fragments: ['FRAG_TEST'],
      keys: [{ key: 'test', value: 'test' }],
    });
    expect(expandFragments(loader, ['FRAG_TEST'])).toStrictEqual([
      {
        key: 'hi',
        value: 'hi',
      },
    ]);
  });

  test('use multiple fragments', () => {
    const loader: fragmentLoader = {
      fragments: {
        FRAG_TEST: { hi: 'hi' },
        FRAG_TEST2: { hi2: 'hi2' },
      },
      key: 'USE_FRAGMENTS',
    };
    const keys = [
      { key: 'USE_FRAGMENTS', value: 'frag_test,frag_test2' },
      { key: 'test', value: 'test' },
    ];
    expect(extractFragmentDefinitionFromKeys(loader, keys)).toStrictEqual({
      fragments: ['FRAG_TEST', 'FRAG_TEST2'],
      keys: [{ key: 'test', value: 'test' }],
    });
    expect(expandFragments(loader, ['FRAG_TEST', 'FRAG_TEST2'])).toStrictEqual([
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
    const loader: fragmentLoader = {
      fragments: {
        FRAG_TEST2: { hi: 'hi2' },
        FRAG_TEST: { hi: 'hi', yoink: 'yoink' },
      },
      key: 'USE_FRAGMENTS',
    };
    const keys = [
      { key: 'USE_FRAGMENTS', value: 'frag_test,frag_test2' },
      { key: 'test', value: 'test' },
    ];
    expect(extractFragmentDefinitionFromKeys(loader, keys)).toStrictEqual({
      fragments: ['FRAG_TEST', 'FRAG_TEST2'],
      keys: [{ key: 'test', value: 'test' }],
    });
    expect(expandFragments(loader, ['FRAG_TEST', 'FRAG_TEST2'])).toStrictEqual([
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
    const loader: fragmentLoader = {
      fragments: {
        FRAG_TEST2: { hi: 'hi2' },
        FRAG_TEST: { hi: 'hi', yoink: 'yoink' },
      },
      key: 'USE_FRAGMENTS',
    };
    expect(() => expandFragments(loader, ['I_DONT_EXIST'])).toThrowError(); // TODO Better errors
  });
});
