import type { ReactNode } from 'react';
import { GuiderSidebar } from '../sidebar';
import { GuiderHeader } from '../header';
import { GuiderToc } from '../toc';

export type GuiderLayoutProps = {
  children?: ReactNode;
};

export function LayoutInternal(props: GuiderLayoutProps) {
  return (
    <div className="gd-w-11/12 gd-max-w-[1480px] gd-mx-auto">
      <GuiderHeader />

      <div className="gd-grid gd-grid-cols-[1fr] gd-gap-16 md:gd-grid-cols-[280px,1fr] xl:gd-grid-cols-[280px,1fr,280px]">
        <div className="gd-hidden md:gd-block">
          <GuiderSidebar />
        </div>
        <article>{props.children}</article>
        <div className="gd-hidden xl:gd-block">
          <GuiderToc />
        </div>
      </div>
    </div>
  );
}
