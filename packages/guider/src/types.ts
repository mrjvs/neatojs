import type { ShikiTransformer } from 'shiki';
import type { PluggableList } from 'unified';

export type GuiderInitConfig = {
  /**
   * The location of the theme config
   */
  themeConfig: string;

  /**
   * Extra shiki transformers added to syntax highlighted code
   */
  extraShikiTransformers?: ShikiTransformer[];

  /**
   * Replaces all shiki transformers added to syntax highlighted code
   */
  shikiTransformers?: ShikiTransformer[];

  /**
   * Extra remark plugins added to markdown parsing
   */
  extraRemarkPlugins?: PluggableList;

  /**
   * Replaces all remark plugins added to markdown parsing
   * NOTE: This disables and breaks a lot of features of Guider, use at your own risk.
   */
  remarkPlugins?: PluggableList;
};
