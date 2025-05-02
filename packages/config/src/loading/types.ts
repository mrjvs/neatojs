export type KeyCollection = {
  key: string;
  value: string;
}[];

// TODO make this a proper context object
export type KeyLoaderContext = {
  envPrefix: string | null;
};

export type KeyLoader = {
  name: string;
  load: (ctx: KeyLoaderContext) => KeyCollection;
};
