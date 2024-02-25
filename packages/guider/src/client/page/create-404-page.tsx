import type { ReactNode } from 'react';
import { createMdxPage } from './create-mdx-page';

export type CreateNotFoundPage = {
  content?: ReactNode;
};

export function createNotFoundPage(opts?: CreateNotFoundPage) {
  const content = (
    <>
      <h1>Not found!</h1>
    </>
  );
  return createMdxPage({
    MDXContent: () => opts?.content ?? content,
    pageOpts: {
      meta: {
        layout: 'page',
      },
    },
  });
}
