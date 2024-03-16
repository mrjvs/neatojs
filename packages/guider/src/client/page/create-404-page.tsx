import type { ReactNode } from 'react';
import { Button } from '../components/public/button';
import { createMdxPage } from './create-mdx-page';

export type CreateNotFoundPage = {
  content?: ReactNode;
};

export function createNotFoundPage(opts?: CreateNotFoundPage) {
  const content = (
    <div className="gd-flex gd-min-h-[70vh] gd-flex-col gd-items-center gd-justify-center">
      <div className="gd-flex gd-flex-col gd-items-center gd-justify-center gd-text-center gd-relative">
        <div className="gd-absolute -gd-top-48 -gd-z-10 gd-overflow-hidden">
          <p className="gd-font-bold gd-text-[15rem] gd-text-bgLightest gd-tracking-tighter">
            404
          </p>
          <div className="gd-absolute gd-inset-0 gd-bg-gradient-to-t gd-from-bg gd-from-40% gd-to-60% gd-to-transparent" />
        </div>
        <p className="gd-text-sm gd-font-bold gd-text-primary">Not found</p>
        <h1 className="gd-text-xl gd-font-bold gd-my-2 gd-text-textHeading">
          We couldn't find that page
        </h1>
        <p className="gd-text-base gd-mb-8 gd-text-text gd-max-w-56">
          Maybe you can find your way on the home page?
        </p>
        <Button to="/">Back to home</Button>
      </div>
    </div>
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
