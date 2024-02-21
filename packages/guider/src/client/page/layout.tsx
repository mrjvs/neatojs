import { type ReactNode } from 'react';
import type { MetaConf } from '../types';
import { GuiderSidebar } from '../components/sidebar';
import { Header } from '../components/header';
import { GuiderToc } from '../components/toc';
import type { MdxHeadings } from './context';
import { GuiderLayoutContext } from './context';

export type GuiderLayoutProps = {
  children?: ReactNode;
  meta?: MetaConf;
  headings?: MdxHeadings[];
};

export function GuiderLayout(props: GuiderLayoutProps) {
  return (
    <GuiderLayoutContext.Provider
      value={{ meta: props.meta ?? {}, headings: props.headings ?? [] }}
    >
      <div className="gd-w-11/12 gd-max-w-[1480px] gd-mx-auto">
        <Header />

        <div className="gd-grid gd-grid-cols-[280px,1fr,280px] gd-gap-16">
          <GuiderSidebar />
          <article>{props.children}</article>
          <div>
            <GuiderToc />
          </div>
        </div>
      </div>
    </GuiderLayoutContext.Provider>
  );
}
