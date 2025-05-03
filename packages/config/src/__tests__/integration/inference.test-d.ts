import { z } from 'zod';
import { createConfig, loaders, SchemaTransformer } from '../..';
import Joi from 'joi';

describe('integration tests - type inference', () => {
  test('load without schema', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
    });
    expectTypeOf(config).toBeAny();
  });

  test('load with zod schema', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      schema: z.object({
        hi: z.string(),
      }),
    });
    expectTypeOf(config).toEqualTypeOf<{
      hi: string;
    }>();
  });

  test('load with joi schema', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      schema: Joi.object<{ hello: string }>({
        hello: Joi.string(),
      })
    });
    expectTypeOf(config).toEqualTypeOf<{
      hello: string;
    }>();
  });

  test('load with custom schema', () => {
    const makeMySchema = <T>(obj: T): SchemaTransformer<T> => {
      return {
        extract() {
          return [];
        },
        validate(_ctx) {
          return obj;
        },
      }
    }
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      schema: makeMySchema({
        goodbye: 'string',
      })
    });
    expectTypeOf(config).toEqualTypeOf<{
      goodbye: string;
    }>();
  });
});
