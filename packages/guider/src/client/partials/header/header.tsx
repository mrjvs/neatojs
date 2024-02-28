import { useContext } from 'react';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { GithubDisplay } from '../../components/github';
import { HeaderTabs } from './tabs';
import { HeaderNav } from './nav';
import { Logo } from './logo';
import { HeaderDropdown } from './dropdown';

export function HeaderInternal() {
  const ctx = useContext(GuiderLayoutContext);
  const { site } = useGuider(ctx?.meta);

  return (
    <header className="gd-p-6 gd-pb-0 -gd-mx-6 gd-box-content gd-border-b gd-border-line gd-mb-8 gd-sticky gd-z-50 gd-top-0 gd-bg-bg">
      <div className="gd-fixed neato-guider-overlay gd-transition-opacity gd-duration-150 gd-opacity-0 gd-inset-0 gd-bg-gradient-to-b gd-from-black/80 gd-to-transparent gd-z-[60] gd-pointer-events-none" />
      <div className="gd-flex gd-justify-between gd-mb-6">
        <div className="gd-flex gd-items-center">
          <Logo />
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
        <p>Mobile nav will go here</p>
      </div>
    </header>
  );
}
