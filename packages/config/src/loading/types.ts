import type { NormalizedConfigCreatorOptions } from 'entrypoint';

export type KeyCollection = {
  key: string;
  value: string;
}[];

export type KeyLoaderContext = {
  /**
   * The configured env prefix
   */
  envPrefix: string;

  /**
   * The options used to create the config
   */
  config: NormalizedConfigCreatorOptions<any>;
};

export type KeyLoader = {
  name: string;
  load: (ctx: KeyLoaderContext) => KeyCollection;
};
