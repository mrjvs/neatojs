import { GuiderLayout } from '../partials/layout';
import * as components from '../components/public';
import type { MdxHeadings } from './context';
import type { PageMeta } from './types';

export type CreateMdxPageOptions = {
  MDXContent: (props: any) => any;
  pageOpts: {
    meta: PageMeta;
    headings?: MdxHeadings[];
    excerpt?: string;
  };
};

export function createMdxPage(opts: CreateMdxPageOptions) {
  const Content = opts.MDXContent;
  return () => (
    <GuiderLayout
      meta={opts.pageOpts.meta}
      headings={opts.pageOpts.headings}
      excerpt={opts.pageOpts.excerpt}
    >
      <Content components={{ ...components }} />
    </GuiderLayout>
  );
}
