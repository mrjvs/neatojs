import { GuiderLayout } from '../partials/layout';
import * as components from '../components/public';
import type { GuiderPageWithLayout } from './create-guider-app';
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
  const page: GuiderPageWithLayout = () => (
    <Content components={{ ...components }} />
  );
  page.getLayout = (content) => {
    return (
      <GuiderLayout
        meta={opts.pageOpts.meta}
        headings={opts.pageOpts.headings}
        excerpt={opts.pageOpts.excerpt}
      >
        {content}
      </GuiderLayout>
    );
  };
  return page;
}
