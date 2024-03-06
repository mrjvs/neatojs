import type { MetaConf } from '../../theme';

export type FrontmatterConf = {
  title?: string;
  description?: string;
};

export type PageMeta = MetaConf & FrontmatterConf;
