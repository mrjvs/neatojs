import { normalizeKey } from '../../..';

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
});
