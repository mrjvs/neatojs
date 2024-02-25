import type { MetaConf } from '..';

export type FrontmatterConf = {
  title?: string;
  description?: string;
};

export type PageMeta = MetaConf & FrontmatterConf;
