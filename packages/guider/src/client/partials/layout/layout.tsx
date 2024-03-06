import type { ReactNode } from 'react';
import { GuiderSidebar } from '../sidebar';
import { GuiderHeader } from '../header';
import { GuiderToc } from '../toc';
import { GuiderContentFooter } from '../content-footer';
import { GuiderpageFooter } from '../page-footer';

export type GuiderLayoutProps = {
  children?: ReactNode;
};

export function LayoutInternal(props: GuiderLayoutProps) {
  return (
    <div className="gd-w-11/12 gd-max-w-[1480px] gd-flex gd-flex-col gd-min-h-screen gd-mx-auto">
      <GuiderHeader />

      <div className="gd-grid gd-flex-1 gd-grid-cols-[1fr] gd-gap-16 md:gd-grid-cols-[280px,1fr] xl:gd-grid-cols-[280px,1fr,280px]">
        <div className="gd-hidden md:gd-block">
          <GuiderSidebar />
        </div>
        <div>
          <article>{props.children}</article>
          <GuiderContentFooter />
        </div>
        <div className="gd-hidden xl:gd-block">
          <GuiderToc />
        </div>
      </div>

      <GuiderpageFooter />
    </div>
  );
}
