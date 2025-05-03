import { z } from 'zod';
import { createConfig, loaders, SchemaTransformer } from '../..';
import Joi from 'joi';
import { DeepReadonly } from 'utils/freeze';

describe('integration tests - type inference', () => {
  test('load without schema', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
    });
    expectTypeOf(config).toEqualTypeOf<DeepReadonly<any>>();
  });

  test('load with zod schema', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      schema: z.object({
        hi: z.string(),
      }),
    });
    expectTypeOf(config).toEqualTypeOf<DeepReadonly<{
      hi: string;
    }>>();
  });

  test('load with joi schema', () => {
    const config = createConfig({
      assert: 'throw',
      loaders: [loaders.environment()],
      schema: Joi.object<{ hello: string }>({
        hello: Joi.string(),
      })
    });
    expectTypeOf(config).toEqualTypeOf<DeepReadonly<{
      hello: string;
    }>>();
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
    expectTypeOf(config).toEqualTypeOf<DeepReadonly<{
      goodbye: string;
    }>>();
  });

  test('load with freeze', () => {
    const frozenConf = createConfig({
      loaders: [],
      schema: z.object({
        hi: z.string(),
      }),
      freeze: null,
    });
    const frozenConf2 = createConfig({
      loaders: [],
      schema: z.object({
        hi: z.string(),
      }),
      freeze: undefined,
    });
    const frozenConf3 = createConfig({
      loaders: [],
      schema: z.object({
        hi: z.string(),
      }),
      freeze: true,
    });
    expectTypeOf(frozenConf).toEqualTypeOf<DeepReadonly<{
      hi: string;
    }>>();
    expectTypeOf(frozenConf2).toEqualTypeOf<DeepReadonly<{
      hi: string;
    }>>();
    expectTypeOf(frozenConf3).toEqualTypeOf<DeepReadonly<{
      hi: string;
    }>>();
  });

  test('load without freeze', () => {
    const unfrozenConfig = createConfig({
      loaders: [],
      schema: z.object({
        hi: z.string(),
      }),
      freeze: false,
    });
    expectTypeOf(unfrozenConfig).toEqualTypeOf<{
      hi: string;
    }>();
  });
});
