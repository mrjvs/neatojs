import * as Joi from 'joi';
import { setEnv } from '__tests__/test';
import { createConfig, loaders } from '../..';

describe('integration tests - joi schema', () => {
  test('normal usage, valid', () => {
    setEnv({
      CONF_HI: 'test2',
    });
    const schema = Joi.object({
      HI: Joi.string(),
    });
    const config = createConfig({
      assert: 'throw',
      envPrefix: 'CONF_',
      loaders: [loaders.environment()],
      schema,
    });
    expect(config).toStrictEqual({
      HI: 'test2',
    });
  });

  test('normal usage, invalid', () => {
    setEnv({
      CONF_HI: 'test2',
    });
    const schema = Joi.object({
      HI: Joi.number(),
    });
    expect(() => {
      createConfig({
        assert: 'throw',
        envPrefix: 'CONF_',
        loaders: [loaders.environment()],
        schema,
      });
    }).toThrowError(); // TODO better errors;
  });

  test('invalid schema', () => {
    function trySchema(s: any) {
      expect(() => {
        createConfig({
          assert: 'throw',
          loaders: [],
          schema: s,
        });
      }).toThrowError(); // TODO better errors
    }

    trySchema({ hi: 42 });
    trySchema(null);
    trySchema(undefined);
    trySchema(Joi.string().email());
  });

  test('complex object usage', () => {
    const schema = Joi.object({
      HI: Joi.string(),
      L1: Joi.object({
        L2: Joi.object({
          L3: Joi.string(),
        }),
      }),
    });

    setEnv({
      CONF_HI: 'abc',
      CONF_L1__L2__L3: 'def',
    });
    const config = createConfig({
      assert: 'throw',
      envPrefix: 'CONF_',
      loaders: [loaders.environment()],
      schema,
    });

    expect(config).toStrictEqual({
      HI: 'abc',
      L1: { L2: { L3: 'def' } },
    });
  });

  test('translations', () => {
    const schema = Joi.object({
      hi: Joi.string(),
      Hello: Joi.string(),
      HelloWorld: Joi.string(),
      HI_AGAIN: Joi.string(),
    });
    setEnv({
      CONF_HI: 'a',
      CONF_HELLO: 'a',
      CONF_HELLO_WORLD: 'a',
      'CONF_hi-again': 'a',
    });
    const config = createConfig({
      assert: 'throw',
      envPrefix: 'CONF_',
      loaders: [loaders.environment()],
      schema,
    });

    expect(config).toStrictEqual({
      hi: 'a',
      Hello: 'a',
      HelloWorld: 'a',
      HI_AGAIN: 'a',
    });
  });

  test('transformations & defaults', () => {
    const schema = Joi.object({
      hi: Joi.string().lowercase(),
      hoi: Joi.string().default('yike'),
    });
    setEnv({
      CONF_HI: 'AAAA',
    });
    const config = createConfig({
      assert: 'throw',
      envPrefix: 'CONF_',
      loaders: [loaders.environment()],
      schema,
    });

    expect(config).toStrictEqual({
      hi: 'aaaa',
      hoi: 'yike',
    });
  });
});

// TODO add case transforms to builder
