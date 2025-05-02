import {
  normalizeConfigKeys,
  normalizeKey,
  normalizeKeys,
} from '../../../old/utils/translators/normalizer';

describe('normalizeKeys()', () => {
  test('normalize single key', () => {
    expect(normalizeKey('HelloWorld')).toBe('HELLO_WORLD');
    expect(normalizeKey('Hello-World')).toBe('HELLO_WORLD');
    expect(normalizeKey('hello-world')).toBe('HELLO_WORLD');
    expect(normalizeKey('helloWorld')).toBe('HELLO_WORLD');
    expect(normalizeKey('hello_world')).toBe('HELLO_WORLD');
    expect(normalizeKey('hello_WORLD')).toBe('HELLO_WORLD');
    expect(normalizeKey('hello_--_-WORLD')).toBe('HELLO_WORLD');
    expect(normalizeKey('hello_--_-WORLD')).toBe('HELLO_WORLD');
  });

  test('normalize multiple keys', () => {
    expect(
      normalizeConfigKeys([
        {
          key: 'helloworld',
          value: '42',
        },
        {
          key: 'hi',
          value: '21',
        },
      ]),
    ).toStrictEqual([
      {
        key: 'HELLOWORLD',
        value: '42',
      },
      {
        key: 'HI',
        value: '21',
      },
    ]);
    expect(normalizeKeys(['helloworld', 'hi'])).toStrictEqual([
      'HELLOWORLD',
      'HI',
    ]);
  });
});
