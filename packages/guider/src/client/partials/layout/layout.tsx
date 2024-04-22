import type { ReactNode } from 'react';
import classNames from 'classnames';
import { GuiderSidebar } from '../sidebar';
import { GuiderHeader } from '../header';
import { GuiderToc } from '../toc';
import { GuiderContentFooter } from '../content-footer';
import { GuiderpageFooter } from '../page-footer';
import { useGuiderPage } from '../../hooks/use-guider-page';
import { GuiderPageEnd } from '../page-end';
import { Breadcrumb } from './breadcrumb';

export type GuiderLayoutProps = {
  children?: ReactNode;
};

export function LayoutInternal(props: GuiderLayoutProps) {
  const { settings } = useGuiderPage();

  return (
    <div className="gd-flex gd-flex-col gd-min-h-screen">
      <GuiderHeader />

      <div className="gd-w-full gd-px-6 gd-max-w-[1480px] gd-flex-1 gd-flex gd-flex-col gd-mx-auto">
        <div
          className={classNames({
            'gd-grid gd-flex-1 gd-gap-16': true,
            'gd-grid-cols-[1fr] md:gd-grid-cols-[280px,1fr]':
              !settings.tocState && settings.sidebarState,
            'gd-grid-cols-[1fr]': !settings.tocState && !settings.sidebarState,
            'gd-grid-cols-[1fr] md:gd-grid-cols-[280px,1fr] xl:gd-grid-cols-[280px,1fr,280px]':
              settings.tocState && settings.sidebarState,
            'gd-grid-cols-[1fr] md:gd-grid-cols-[1fr]':
              settings.tocState && !settings.sidebarState,
          })}
        >
          <div
            className={classNames({
              'gd-hidden md:gd-block': true,
              '!gd-hidden': !settings.sidebarState,
            })}
          >
            <GuiderSidebar />
          </div>
          <article className="gd-mb-16 gd-break-words">
            <Breadcrumb />
            {props.children}
            <GuiderPageEnd />
            <GuiderContentFooter />
          </article>
          <div
            className={classNames({
              'gd-hidden xl:gd-block': true,
              '!gd-hidden': !settings.tocState,
            })}
          >
            <GuiderToc />
          </div>
        </div>

        <GuiderpageFooter />
      </div>
    </div>
  );
}
