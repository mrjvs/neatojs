import { naming } from '../../..';

describe('naming convention translators', () => {
  test('naming.pascalCase', () => {
    expect(naming.pascalCase('HELLO_WORLD')).toBe('HelloWorld');
    expect(naming.pascalCase('HELLO')).toBe('Hello');
    expect(naming.pascalCase('HELLO_WORLD_AGAIN')).toBe('HelloWorldAgain');
    expect(naming.pascalCase('HELLO_WORLD_3AGAIN')).toBe('HelloWorld3again');
    expect(naming.pascalCase('')).toBe('');
    expect(naming.pascalCase('42')).toBe('42');
  });

  test('naming.camelCase', () => {
    expect(naming.camelCase('HELLO_WORLD')).toBe('helloWorld');
    expect(naming.camelCase('HELLO')).toBe('hello');
    expect(naming.camelCase('HELLO_WORLD_AGAIN')).toBe('helloWorldAgain');
    expect(naming.camelCase('HELLO_WORLD_3AGAIN')).toBe('helloWorld3again');
    expect(naming.camelCase('')).toBe('');
    expect(naming.camelCase('42')).toBe('42');
  });

  test('naming.screamingSnakeCase', () => {
    expect(naming.screamingSnakeCase('HELLO_WORLD')).toBe('HELLO_WORLD');
    expect(naming.screamingSnakeCase('')).toBe('');
  });

  test('naming.snakeCase', () => {
    expect(naming.snakeCase('HELLO_WORLD')).toBe('hello_world');
    expect(naming.snakeCase('HELLO')).toBe('hello');
    expect(naming.snakeCase('')).toBe('');
  });
});
