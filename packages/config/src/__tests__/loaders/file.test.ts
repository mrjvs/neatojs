import * as fs from 'node:fs';
import { loaderCtx, runKeyLoader } from '__tests__/test';
import { getExtension } from 'loading/loaders/file';
import { loaders } from '../..';

vi.mock('fs');

function checkIfArrayHas(test: any, value: any) {
  expect(test).toBeInstanceOf(Array);
  expect(test.length).toBe(value.length);
  for (const obj of test) {
    const found = value.find((v: any) => v.key === obj.key);
    expect(found).toBeTruthy();
    expect(obj).toStrictEqual(found);
  }
}

describe('file loader - basics', () => {
  test('extension loading - json', () => {
    expect(getExtension('hi.json')).toBe('json');
    expect(getExtension('.json')).toBe('json');
    expect(getExtension('.test.json')).toBe('json');
  });
  test('extension loading - env', () => {
    expect(getExtension('.env')).toBe('env');
    expect(getExtension('prod.env')).toBe('env');
    expect(getExtension('.prod.env')).toBe('env');
  });
});

describe('file loader - json', () => {
  function mockJsonFile(obj: any) {
    (fs.readFileSync as any).mockReturnValueOnce(JSON.stringify(obj));
  }

  test('simple key loading', () => {
    mockJsonFile({
      test1: 'abc',
      test2: true,
      test3: 42,
    });
    checkIfArrayHas(runKeyLoader(loaders.file('hi', { type: 'JSON' })), [
      { key: 'test1', value: 'abc' },
      { key: 'test2', value: 'true' },
      { key: 'test3', value: '42' },
    ]);
  });

  test('deep key loading', () => {
    mockJsonFile({
      test1: 'abc',
      l1: {
        l2: {
          l3: 'def',
        },
        l2v2: 'ghi',
      },
    });
    checkIfArrayHas(runKeyLoader(loaders.file('hi', { type: 'JSON' })), [
      { key: 'test1', value: 'abc' },
      { key: 'l1__l2__l3', value: 'def' },
      { key: 'l1__l2v2', value: 'ghi' },
    ]);
  });
});

describe('file loader - env', () => {
  function mockEnvFile(str: string) {
    (fs.readFileSync as any).mockReturnValueOnce(str);
  }

  test('simple key loading', () => {
    mockEnvFile(`TEST=abc`);
    checkIfArrayHas(runKeyLoader(loaders.file('hi', { type: 'ENV' })), [
      { key: 'TEST', value: 'abc' },
    ]);
  });

  test('prefixes', () => {
    mockEnvFile(`
      TEST=abc
      A_TEST=def
    `);
    checkIfArrayHas(
      runKeyLoader(loaders.file('hi', { type: 'ENV' }), loaderCtx('A_')),
      [{ key: 'TEST', value: 'def' }],
    );
  });

  test('newlines', () => {
    mockEnvFile(`TEST=abc\r\n\r\nTEST2=2\nTEST3=3`);
    checkIfArrayHas(runKeyLoader(loaders.file('hi', { type: 'ENV' })), [
      { key: 'TEST', value: 'abc' },
      { key: 'TEST2', value: '2' },
      { key: 'TEST3', value: '3' },
    ]);
  });

  test('comments & whitespace', () => {
    mockEnvFile(
      `# test comments
      TEST=abc
      TEST2=2 # more comments

      TEST3=3#another comment
    `,
    );
    checkIfArrayHas(runKeyLoader(loaders.file('hi', { type: 'ENV' })), [
      { key: 'TEST', value: 'abc' },
      { key: 'TEST2', value: '2' },
      { key: 'TEST3', value: '3' },
    ]);
  });

  test('quotes', () => {
    mockEnvFile(
      `TEST="abc"
      TEST2='2'
    `,
    );
    checkIfArrayHas(runKeyLoader(loaders.file('hi', { type: 'ENV' })), [
      { key: 'TEST', value: 'abc' },
      { key: 'TEST2', value: '2' },
    ]);
  });
});
