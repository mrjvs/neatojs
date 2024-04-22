import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { GithubDisplay } from '../../components/github';
import { GuiderLogo } from '../logo';
import { HeaderTabs } from './tabs';
import { HeaderNav } from './nav';
import { HeaderDropdown } from './dropdown';
import { SidebarMobileNav } from './sidebar-mobile-nav';
import { TopMobileNav } from './top-mobile-nav';
import { HeaderSearch } from './search';

export function HeaderInternal() {
  const ctx = useContext(GuiderLayoutContext);
  const { site, settings } = useGuider(ctx?.meta);

  const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledFromTop(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={classNames(
        'gd-sticky gd-z-50 gd-top-0 gd-bg-bg gd-transition-colors gd-duration-300 gd-mb-8',
        isScrolledFromTop ? 'gd-bg-opacity-100' : 'gd-bg-opacity-0',
      )}
    >
      <header
        className={classNames(
          'gd-max-w-[1480px] gd-mx-auto',
          'gd-p-6 gd-pb-0 gd-border-b gd-border-line',
          isScrolledFromTop ? 'gd-bg-opacity-100' : 'gd-bg-opacity-0',
        )}
      >
        <div className="gd-fixed neato-guider-overlay gd-transition-opacity gd-duration-150 gd-opacity-0 gd-inset-0 gd-bg-gradient-to-b gd-from-black/80 gd-to-transparent gd-z-[60] gd-pointer-events-none" />
        <div className="gd-flex gd-justify-between gd-mb-6">
          <div className="gd-flex gd-items-center">
            <GuiderLogo />
            {site.dropdown.length > 0 ? (
              <>
                <div className="gd-w-px gd-h-6 gd-bg-line gd-rotate-12 gd-mx-4" />
                <HeaderDropdown dropdown={site.dropdown} />
              </>
            ) : null}
            <HeaderSearch />
          </div>
          <div className="gd-hidden md:gd-flex gd-items-center gd-space-x-3">
            <HeaderNav items={site.navigation} />
            {site.github ? (
              <GithubDisplay
                org={site.github.split('/')[0]}
                repo={site.github.split('/', 2)[1]}
              />
            ) : null}
          </div>
          <div className="gd-flex md:gd-hidden gd-items-center">
            {site.navigation.length > 0 || site.github ? (
              <TopMobileNav
                items={site.navigation}
                github={{
                  org: site.github?.split('/')[0],
                  repo: site.github?.split('/', 2)[1],
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="gd-hidden md:gd-block">
          {site.tabs.length > 0 ? <HeaderTabs tabs={site.tabs} /> : null}
        </div>
        <div className="gd-block md:gd-hidden gd-border-t gd-border-line gd-px-6 -gd-mx-6">
          {site.tabs.length > 0 || settings.sidebarState ? (
            <SidebarMobileNav tabs={site.tabs} />
          ) : null}
        </div>
      </header>
    </div>
  );
}
