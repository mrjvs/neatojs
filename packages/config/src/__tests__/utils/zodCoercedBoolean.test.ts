import { zodCoercedBoolean } from '../../utils/zod-types';

describe('zodCoercedBoolean()', () => {
  function check(val: any) {
    return expect(zodCoercedBoolean().parse(val));
  }

  test('Basic usage', () => {
    check(true).toBe(true);
    check(false).toBe(false);
    check('true').toBe(true);
    check('false').toBe(false);
    check('yes').toBe(true);
    check('no').toBe(false);
    check('Yes').toBe(true);
    check('No').toBe(false);
    check('True').toBe(true);
    check('False').toBe(false);
    check('TRuE').toBe(true);
    check('FalSe').toBe(false);
    check('yES').toBe(true);
    check('nO').toBe(false);
    check('  true   ').toBe(true);
    check('      false ').toBe(false);
    check('  yes').toBe(true);
    check('no     ').toBe(false);
  });

  test('Unexpected values', () => {
    check(() => {}).toBe(false);
    check(BigInt('123')).toBe(false);
    check(1251254).toBe(false);
    check(-126).toBe(false);
    check({}).toBe(false);
    check([]).toBe(false);
    check('').toBe(false);
    check(null).toBe(false);
    check(undefined).toBe(false);
  });
});
