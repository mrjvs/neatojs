import type { SiteComponent, SiteOptions } from './components/site';

export type GuiderConfig = SiteOptions | SiteComponent[];

export type MetaConf = {
  site?: string;
  directory?: string;
  layout?: string;
};

export type PageMapItem = {
  sitePath: string;
  fileContents: Record<string, any>;
  config: MetaConf;
};
