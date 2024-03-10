import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import { GuiderSidebarContent } from '../sidebar';
import { Button } from '../../components/public';
import { Icon } from '../../components/icon';
import type { TabsChildren } from '../../../theme/components/site';
import type { CustomComponentComponent } from '../../../theme/components/component';
import { SidebarStarLink } from '../sidebar/star-link';

function CustomComponentTab(props: { component: CustomComponentComponent }) {
  return <Fragment>{props.component.component?.()}</Fragment>;
}

export function MobileNav(props: { tabs: TabsChildren[] }) {
  const [navOpen, setNavOpen] = useState(false);

  const ToggleButton = (
    <Button
      type="secondary"
      className="gd-flex gd-items-center"
      onClick={() => {
        setNavOpen(!navOpen);
      }}
    >
      <Icon icon="mingcute:menu-fill" />
    </Button>
  );

  useEffect(() => {
    document.body.setAttribute(
      'data-stop-overflow',
      navOpen ? 'true' : 'false',
    );
    return () => {
      document.body.removeAttribute('data-stop-overflow');
    };
  }, [navOpen]);

  return (
    <div className="gd-py-4">
      {ToggleButton}
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
          'gd-fixed gd-w-[350px] gd-top-0 gd-left-0 gd-h-screen gd-bg-bg gd-z-[100] gd-px-6 gd-py-10 gd-transition-transform gd-duration-150 gd-border-r gd-border-line gd-overflow-y-auto gd-space-y-4',
          navOpen ? 'gd-translate-x-0' : '-gd-translate-x-full',
        )}
      >
        {ToggleButton}
        <div className="-gd-mx-4">
          {props.tabs.map((v, i) => {
            const key = `--${i}`;
            if (v.type === 'component')
              return <CustomComponentTab key={key} component={v} />;
            if (v.type === 'link')
              return <SidebarStarLink key={key} link={v} />;
            return null;
          })}
        </div>
        <div>
          <GuiderSidebarContent />
        </div>
      </aside>
    </div>
  );
}