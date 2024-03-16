import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Button } from '../../components/public';
import { Icon } from '../../components/icon';
import type { TopNavChildren } from '../../../theme';
import { GithubDisplay } from '../../components/github';
import { HeaderNav } from './nav';

export function TopMobileNav(props: {
  items: TopNavChildren[];
  github: { org?: string; repo?: string };
}) {
  const [navOpen, setNavOpen] = useState(false);

  const toggleButton = (
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
      <div className="gd-fixed gd-inset-x-0 gd-top-0 gd-z-[100]">
        <div
          className={classNames(
            'gd-absolute gd-inset-x-0 gd-top-0 gd-bg-bg gd-z-[100] gd-px-6 gd-py-10 gd-transition-transform gd-duration-150 gd-border-r gd-border-line gd-overflow-y-auto gd-space-y-4',
            navOpen ? 'gd-translate-y-0' : '-gd-translate-y-full',
          )}
        >
          {toggleButton}
          <HeaderNav items={props.items} />
          {props.github.org && props.github.repo ? (
            <GithubDisplay org={props.github.org} repo={props.github.repo} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
