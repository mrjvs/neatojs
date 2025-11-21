import * as z3 from 'zod/v3';
import * as z4 from 'zod/v4';
import { zodV3SchemaToTransformer } from 'schemas/zod.v3';
import { zodV4SchemaToTransformer } from 'schemas/zod.v4';

describe('schemas - zod v3 schema', () => {
  test('key extraction', () => {
    const schema = zodV3SchemaToTransformer(
      z3.object({
        key_one: z3.string(),
        obj_one: z3.object({
          my_key: z3.string(),
        }),
        obj_two: z3
          .object({
            my_key: z3.string().default('default'),
          })
          .default({}),
        obj_three: z3.discriminatedUnion('type', [
          z3.object({
            type: z3.literal('type_one'),
            my_first_key: z3.string(),
          }),
          z3.object({
            type: z3.literal('type_two'),
            my_second_key: z3.string(),
          }),
        ]),
      }),
    );
    const keys = schema.extract();
    expect(keys).toContainEqual({
      normalizedKey: 'KEY_ONE',
      outputKey: 'key_one',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_ONE__MY_KEY',
      outputKey: 'obj_one__my_key',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_TWO__MY_KEY',
      outputKey: 'obj_two__my_key',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_THREE__TYPE',
      outputKey: 'obj_three__type',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_THREE__MY_FIRST_KEY',
      outputKey: 'obj_three__my_first_key',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_THREE__MY_SECOND_KEY',
      outputKey: 'obj_three__my_second_key',
    });
  });
});

describe('schemas - zod v4 schema', () => {
  test('key extraction', () => {
    const schema = zodV4SchemaToTransformer(
      z4.object({
        key_one: z4.string(),
        obj_one: z4.object({
          my_key: z4.string(),
        }),
        obj_two: z4
          .object({
            my_key: z4.string().default('default'),
          })
          .prefault({}),
        obj_three: z4.discriminatedUnion('type', [
          z4.object({
            type: z4.literal('type_one'),
            my_first_key: z4.string(),
          }),
          z4.object({
            type: z4.literal('type_two'),
            my_second_key: z4.string(),
          }),
        ]),
      }),
    );
    const keys = schema.extract();
    expect(keys).toContainEqual({
      normalizedKey: 'KEY_ONE',
      outputKey: 'key_one',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_ONE__MY_KEY',
      outputKey: 'obj_one__my_key',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_TWO__MY_KEY',
      outputKey: 'obj_two__my_key',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_THREE__TYPE',
      outputKey: 'obj_three__type',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_THREE__MY_FIRST_KEY',
      outputKey: 'obj_three__my_first_key',
    });
    expect(keys).toContainEqual({
      normalizedKey: 'OBJ_THREE__MY_SECOND_KEY',
      outputKey: 'obj_three__my_second_key',
    });
  });
});
