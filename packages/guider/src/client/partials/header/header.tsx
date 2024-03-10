import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { GithubDisplay } from '../../components/github';
import { GuiderLogo } from '../logo';
import { HeaderTabs } from './tabs';
import { HeaderNav } from './nav';
import { HeaderDropdown } from './dropdown';
import { MobileNav } from './mobilenav';

export function HeaderInternal() {
  const ctx = useContext(GuiderLayoutContext);
  const { site } = useGuider(ctx?.meta);

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
          'gd-w-11/12 gd-max-w-[1480px] gd-mx-auto',
          'gd-p-6 gd-pb-0 -gd-mx-6 gd-box-content gd-border-b gd-border-line',
          isScrolledFromTop ? 'gd-bg-opacity-100' : 'gd-bg-opacity-0',
        )}
      >
        <div className="gd-fixed neato-guider-overlay gd-transition-opacity gd-duration-150 gd-opacity-0 gd-inset-0 gd-bg-gradient-to-b gd-from-black/80 gd-to-transparent gd-z-[60] gd-pointer-events-none" />
        <div className="gd-flex gd-justify-between gd-mb-6">
          <div className="gd-flex gd-items-center">
            <GuiderLogo />
            {site.dropdown.length > 0 ? (
              <>
                <div className="gd-w-px gd-h-full gd-bg-line gd-rotate-12 gd-mx-6" />
                <HeaderDropdown dropdown={site.dropdown} />
              </>
            ) : null}
          </div>
          <div className="gd-flex gd-items-center gd-space-x-6">
            <HeaderNav items={site.navigation} />
            {site.github ? (
              <GithubDisplay
                org={site.github.split('/')[0]}
                repo={site.github.split('/', 2)[1]}
              />
            ) : null}
          </div>
        </div>
        <div className="gd-hidden md:gd-block">
          {site.tabs.length > 0 ? <HeaderTabs tabs={site.tabs} /> : null}
        </div>
        <div className="gd-block md:gd-hidden gd-border-t gd-border-line gd-px-6 -gd-mx-6">
          <MobileNav tabs={site.tabs} />
        </div>
      </header>
    </div>
  );
}
