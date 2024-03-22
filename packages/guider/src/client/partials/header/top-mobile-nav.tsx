import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { usePageSwitch } from 'src/client/hooks/use-page-switch';
import { Icon } from '../../components/icon';
import type { TopNavChildren } from '../../../theme';
import { GithubDisplay } from '../../components/github';
import { HeaderNav } from './nav';

export function TopMobileNav(props: {
  items: TopNavChildren[];
  github: { org?: string; repo?: string };
}) {
  const [navOpen, setNavOpen] = useState(false);
  usePageSwitch(() => {
    setNavOpen(false);
  }, []);

  const toggleButton = (
    <button
      className="gd-flex gd-items-center gd-p-2 hover:gd-text-textHeading"
      onClick={() => {
        setNavOpen(!navOpen);
      }}
    >
      <Icon icon="mingcute:more-2-fill" />
    </button>
  );

  const closeButton = (
    <button
      className="gd-flex gd-items-center gd-p-2 hover:gd-text-textHeading"
      onClick={() => {
        setNavOpen(!navOpen);
      }}
    >
      <Icon icon="mingcute:close-fill" />
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
    <div>
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
            'gd-absolute gd-inset-x-0 gd-top-0 gd-bg-bg gd-z-[100] gd-flex gd-flex-col gd-px-6 gd-pb-8 gd-pt-4 gd-transition-transform gd-duration-150 gd-overflow-y-auto gd-space-y-4',
            navOpen ? 'gd-translate-y-0' : '-gd-translate-y-full',
          )}
        >
          <div className="gd-flex gd-justify-end">{closeButton}</div>
          <HeaderNav items={props.items} />
          {props.github.org && props.github.repo ? (
            <GithubDisplay org={props.github.org} repo={props.github.repo} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
