import { buildObjectFromKeys } from '../../utils/build';

describe('buildObjectFromKeys()', () => {
  test('Basic usage', () => {
    expect(
      buildObjectFromKeys([
        { key: 'L1V2', value: 't3' },
        { key: 'L1__L2__L3', value: 't1' },
        { key: 'L1__L2V2', value: 't2' },
      ]),
    ).toStrictEqual({
      L1: {
        L2: {
          L3: 't1',
        },
        L2V2: 't2',
      },
      L1V2: 't3',
    });
    expect(
      buildObjectFromKeys([
        { key: 'L1__L2__L3', value: 't1' },
        { key: 'L1__L2V2', value: 't2' },
        { key: 'L1V2', value: 't3' },
      ]),
    ).toStrictEqual({
      L1: {
        L2: {
          L3: 't1',
        },
        L2V2: 't2',
      },
      L1V2: 't3',
    });
  });

  test('Conflicting keys', () => {
    // TODO check specific error
    expect(() =>
      buildObjectFromKeys([
        { key: 'L1__L2__L3', value: 't1' },
        { key: 'L1__L2', value: 't2' },
      ]),
    ).toThrowError();
    expect(() =>
      buildObjectFromKeys([
        { key: 'L1__L2', value: 't2' },
        { key: 'L1__L2__L3', value: 't1' },
      ]),
    ).toThrowError();
  });
});
