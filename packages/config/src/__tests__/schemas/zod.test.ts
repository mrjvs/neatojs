import { z } from 'zod';
import { zodSchemaToTransformer } from 'schemas/zod';

describe('schemas - zod schema', () => {
  test('key extraction', () => {
    const schema = zodSchemaToTransformer(
      z.object({
        key_one: z.string(),
        obj_one: z.object({
          my_key: z.string(),
        }),
        obj_two: z
          .object({
            my_key: z.string().default('default'),
          })
          .default({}),
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
  });
});
