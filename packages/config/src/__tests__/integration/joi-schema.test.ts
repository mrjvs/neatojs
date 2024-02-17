import * as Joi from 'joi';
import { createConfigLoader } from '../..';

describe('integration tests - joi schema', () => {
  test('normal usage, valid', () => {
    process.env = {
      CONF_HI: 'test2',
    };
    const schema = Joi.object({
      HI: Joi.string(),
    });
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment('CONF_')
      .addJOISchema<any>(schema)
      .load();
    expect(config).toStrictEqual({
      HI: 'test2',
    });
  });

  test('normal usage, invalid', () => {
    process.env = {
      CONF_HI: 'test2',
    };
    const schema = Joi.object({
      HI: Joi.number(),
    });
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment('CONF_')
      .addJOISchema<any>(schema);
    expect(() => config.load()).toThrowError(); // TODO better errors;
  });

  test('invalid schema', () => {
    function trySchema(s: any) {
      expect(() =>
        createConfigLoader({ assert: 'throw' }).addJOISchema(s),
      ).toThrowError(); // TODO better errors
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

    process.env = {
      CONF_HI: 'abc',
      CONF_L1__L2__L3: 'def',
    };
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment('CONF_')
      .addJOISchema(schema)
      .load();

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
    process.env = {
      CONF_HI: 'a',
      CONF_HELLO: 'a',
      CONF_HELLO_WORLD: 'a',
      'CONF_hi-again': 'a',
    };
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment('CONF_')
      .addJOISchema(schema)
      .load();

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
    process.env = {
      CONF_HI: 'AAAA',
    };
    const config = createConfigLoader({ assert: 'throw' })
      .addFromEnvironment('CONF_')
      .addJOISchema(schema)
      .load();

    expect(config).toStrictEqual({
      hi: 'aaaa',
      hoi: 'yike',
    });
  });
});

// TODO add case transforms to builder
