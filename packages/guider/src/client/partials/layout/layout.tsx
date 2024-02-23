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

      <div className="gd-grid gd-grid-cols-[280px,1fr,280px] gd-gap-16">
        <GuiderSidebar />
        <article>{props.children}</article>
        <div>
          <GuiderToc />
        </div>
      </div>
    </div>
  );
}
