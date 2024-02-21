import type { MetaConf } from '../types';
import { GuiderLayout } from './layout';

export type CreateMdxPageOptions = {
  MDXContent: (props: any) => any;
  pageOpts: {
    meta: MetaConf;
  };
};

export function createMdxPage(opts: CreateMdxPageOptions) {
  const Content = opts.MDXContent;
  return () => (
    <GuiderLayout meta={opts.pageOpts.meta}>
      <Content />
    </GuiderLayout>
  );
}
