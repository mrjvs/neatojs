import { theme } from '@neato/guider/client';

export type CreateMdxPageOptions = {
  MDXContent: (props: any) => any;
  pageOpts: {
    meta: {
      layout?: string;
    };
  };
};

export function createMdxPage(opts: CreateMdxPageOptions) {
  const Content = opts.MDXContent;
  return () => (
    <div>
      <p>theme: {theme}</p>
      <p>layout: {opts.pageOpts.meta.layout}</p>
      <Content />
    </div>
  );
}
