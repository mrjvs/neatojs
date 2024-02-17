import {
  camelCaseNaming,
  pascalCaseNaming,
  screamingSnakeCaseNaming,
  snakeCaseNaming,
} from '../../../utils/translators/conventions';

describe('naming convention translators', () => {
  test('pascalCaseNaming()', () => {
    expect(pascalCaseNaming('HELLO_WORLD')).toBe('HelloWorld');
    expect(pascalCaseNaming('HELLO')).toBe('Hello');
    expect(pascalCaseNaming('HELLO_WORLD_AGAIN')).toBe('HelloWorldAgain');
    expect(pascalCaseNaming('HELLO_WORLD_3AGAIN')).toBe('HelloWorld3again');
    expect(pascalCaseNaming('')).toBe('');
    expect(pascalCaseNaming('42')).toBe('42');
  });

  test('camelCaseNaming()', () => {
    expect(camelCaseNaming('HELLO_WORLD')).toBe('helloWorld');
    expect(camelCaseNaming('HELLO')).toBe('hello');
    expect(camelCaseNaming('HELLO_WORLD_AGAIN')).toBe('helloWorldAgain');
    expect(camelCaseNaming('HELLO_WORLD_3AGAIN')).toBe('helloWorld3again');
    expect(camelCaseNaming('')).toBe('');
    expect(camelCaseNaming('42')).toBe('42');
  });

  test('camelCaseNaming()', () => {
    expect(screamingSnakeCaseNaming('HELLO_WORLD')).toBe('HELLO_WORLD');
    expect(screamingSnakeCaseNaming('')).toBe('');
  });

  test('snakeCaseNaming()', () => {
    expect(snakeCaseNaming('HELLO_WORLD')).toBe('hello_world');
    expect(snakeCaseNaming('HELLO')).toBe('hello');
    expect(snakeCaseNaming('')).toBe('');
  });
});
