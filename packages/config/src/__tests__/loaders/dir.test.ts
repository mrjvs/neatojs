import * as PathMod from 'node:path';
import * as fs from 'node:fs';
import { getKeysFromDir } from '../../loaders/dir';

vi.mock('fs', (originalModule) => {
  let files: [string, string][] = [];
  let path: any;

  return {
    __esModule: true,
    ...originalModule,
    readFileSync: (p: string) => {
      const fileName = `f:${PathMod.basename(p)}`;
      const foundFile = files.find((v) => v[0] === fileName);
      if (!foundFile) throw new Error('FILE NOT FOUND');
      if (PathMod.resolve(path, foundFile[0].slice(2)) !== p)
        throw new Error('DOESNT RESOLVE THE SAME');
      return foundFile[1];
    },
    readdirSync: (p: string) => {
      if (!p || path !== p) throw new Error('WRONG PATH');
      return files.map((v) => ({
        isFile: () => v[0].startsWith('f:'),
        name: v[0].slice(2),
      }));
    },
    _setFilesToRead: (p: string, f: Record<string, string>) => {
      path = p;
      files = Object.entries(f);
    },
    _clearFilesToRead: () => {
      path = null;
      files = [];
    },
  };
});

describe('directory loader', () => {
  function checkIfArrayHas(test: any, value: any) {
    expect(test).toBeInstanceOf(Array);
    expect(test.length).toBe(value.length);
    for (const obj of test) {
      const found = value.find((v: any) => v.key === obj.key);
      expect(found).toBeTruthy();
      expect(obj).toStrictEqual(found);
    }
  }

  afterEach(() => {
    (fs as any)._clearFilesToRead();
  });
  function mockFiles(path: string, files: Record<string, string>) {
    (fs as any)._setFilesToRead(path, files);
  }

  test('simple key loading', () => {
    mockFiles('test-dir', {
      'f:test1': 'abc',
      'f:test2': 'def',
      'f:test3': 'ghi',
    });
    checkIfArrayHas(getKeysFromDir([{ path: 'test-dir', prefix: '' }]), [
      { key: 'test1', value: 'abc' },
      { key: 'test2', value: 'def' },
      { key: 'test3', value: 'ghi' },
    ]);
  });

  test('ignore other types of files', () => {
    mockFiles('test-dir', {
      'f:test1': 'abc',
      'f:test2': 'def',
      'd:test3': 'ghi',
      's:test4': 'aaaa',
    });
    checkIfArrayHas(getKeysFromDir([{ path: 'test-dir', prefix: '' }]), [
      { key: 'test1', value: 'abc' },
      { key: 'test2', value: 'def' },
    ]);
  });

  test('prefixes', () => {
    mockFiles('test-dir', {
      'f:test1': 'abc',
      'f:test2': 'def',
    });
    checkIfArrayHas(getKeysFromDir([{ path: 'test-dir', prefix: 'test' }]), [
      { key: '1', value: 'abc' },
      { key: '2', value: 'def' },
    ]);
  });

  test('multiple prefixes', () => {
    mockFiles('test-dir', {
      'f:test1': 'abc',
      'f:test2': 'def',
    });
    checkIfArrayHas(
      getKeysFromDir([
        { path: 'test-dir', prefix: 'test' },
        { path: 'test-dir', prefix: '' },
      ]),
      [
        { key: 'test1', value: 'abc' },
        { key: 'test2', value: 'def' },
        { key: '1', value: 'abc' },
        { key: '2', value: 'def' },
      ],
    );
  });
});
