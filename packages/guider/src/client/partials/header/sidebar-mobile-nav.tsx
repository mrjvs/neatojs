import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import { makeKey } from 'src/client/utils/make-key';
import { usePageSwitch } from 'src/client/hooks/use-page-switch';
import { GuiderSidebarContent } from '../sidebar';
import { Icon } from '../../components/icon';
import type { TabsChildren } from '../../../theme/components/site';
import type { CustomComponentComponent } from '../../../theme/components/component';
import { SidebarStarLink } from '../sidebar/star-link';
import { SidebarSeparator } from '../sidebar/separator';

function CustomComponentTab(props: { component: CustomComponentComponent }) {
  return <Fragment>{props.component.component?.()}</Fragment>;
}

export function SidebarMobileNav(props: { tabs: TabsChildren[] }) {
  const [navOpen, setNavOpen] = useState(false);
  usePageSwitch(() => {
    setNavOpen(false);
  }, []);

  const toggleButton = (
    <button
      className="gd-flex gd-items-center gd-p-4 -gd-ml-4 hover:gd-text-textHeading gd-transition-colors"
      onClick={() => {
        setNavOpen(!navOpen);
      }}
    >
      <Icon icon="mingcute:menu-fill" className="gd-mr-2" /> Menu
    </button>
  );

  useEffect(() => {
    document.body.setAttribute(
      'data-mobile-stop-overflow',
      navOpen ? 'true' : 'false',
    );
    return () => {
      document.body.removeAttribute('data-mobile-stop-overflow');
    };
  }, [navOpen]);

  return (
    <div className="gd-py-1">
      {toggleButton}
      <div
        className={classNames(
          'gd-fixed gd-top-0 gd-left-0 gd-w-full gd-h-full gd-bg-black gd-bg-opacity-50',
          navOpen ? 'gd-opacity-100' : 'gd-opacity-0 gd-pointer-events-none',
        )}
        onClick={() => {
          setNavOpen(false);
        }}
      />
      <aside
        className={classNames(
          'gd-fixed gd-w-[350px] gd-max-w-[75vw] gd-top-0 gd-left-0 gd-h-screen !gd-h-[100dvh] gd-bg-bg gd-z-[100] gd-px-6 gd-py-10 gd-transition-transform gd-duration-150 gd-border-r gd-border-line gd-overflow-y-auto gd-space-y-4',
          navOpen ? 'gd-translate-x-0' : '-gd-translate-x-full',
        )}
      >
        <div className="-gd-mx-4">
          {props.tabs.map((v, i) => {
            const key = makeKey(i, v);
            if (v.type === 'component')
              return <CustomComponentTab key={key} component={v} />;
            if (v.type === 'link')
              return (
                <SidebarStarLink
                  key={key}
                  link={{
                    ...v,
                    icon: v.icon ?? 'ph:book-open-fill',
                    exact: v.exact ?? false,
                  }}
                />
              );
            return null;
          })}
          {props.tabs.length > 0 ? <SidebarSeparator /> : null}
        </div>
        <div>
          <GuiderSidebarContent />
        </div>
      </aside>
    </div>
  );
}
