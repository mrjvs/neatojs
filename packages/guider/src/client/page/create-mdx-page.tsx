import { GuiderLayout } from './layout';

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
    <GuiderLayout>
      <Content />
    </GuiderLayout>
  );
}
