import type { MetaConf } from '../types';
import type { MdxHeadings } from './context';
import { GuiderLayout } from './layout';

export type CreateMdxPageOptions = {
  MDXContent: (props: any) => any;
  pageOpts: {
    meta: MetaConf;
    headings: MdxHeadings[];
  };
};

export function createMdxPage(opts: CreateMdxPageOptions) {
  const Content = opts.MDXContent;
  return () => (
    <GuiderLayout meta={opts.pageOpts.meta} headings={opts.pageOpts.headings}>
      <Content />
    </GuiderLayout>
  );
}
