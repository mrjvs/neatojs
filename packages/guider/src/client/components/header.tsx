import { useContext } from 'react';
import { GuiderLayoutContext } from '../page/context';
import { useGuider } from '../page/use-guider';
import { GithubDisplay } from './github';
import ActiveLink from './utils/activelink';

export function Logo() {
  return (
    <div className="gd-flex gd-items-center gd-gap-3">
      <img
        src="https://jipfr.nl/img/cats/pudding-12.jpeg"
        className="gd-w-8 gd-h-8 gd-object-cover gd-rounded-full"
        alt="Cat!"
      />
      <span className="gd-text-base gd-font-bold gd-text-textHeading">
        Guider
      </span>
    </div>
  );
}

function TabLink(props: { href: string; children: React.ReactNode }) {
  return (
    <ActiveLink
      className="gd-inline-block gd-py-2 gd-border-b -gd-mb-px gd-px-1 -gd-ml-1"
      activeClassName="gd-text-textHeading gd-border-primary"
      inActiveClassName="gd-border-transparent"
      href={props.href}
    >
      {props.children}
    </ActiveLink>
  );
}

export function Header() {
  const ctx = useContext(GuiderLayoutContext);
  const { site } = useGuider(ctx?.meta ?? {});

  return (
    <header className="gd-p-6 gd-pb-0 -gd-mx-6 gd-box-content gd-border-b gd-border-bgLight gd-mb-8">
      <div className="gd-flex gd-justify-between gd-mb-6">
        <Logo />
        <div className="gd-flex gd-items-center gd-space-x-6">
          {site.navigation
            .filter((v) => v.type === 'link' || v.type === 'seperator')
            .map((v, i) => {
              const key = v.to + i;
              if (v.type === 'seperator') return <hr key={key} />;
              if (v.type === 'link')
                return (
                  <ActiveLink
                    key={key}
                    activeClassName="gd-text-textHeading"
                    href={v.to}
                  >
                    {v.title}
                  </ActiveLink>
                );
              return null;
            })}
          {site.github ? (
            <GithubDisplay
              org={site.github.split('/')[0]}
              repo={site.github.split('/', 2)[1]}
            />
          ) : null}
        </div>
      </div>
      {site.tabs.length > 0 ? (
        <div className="gd-border-t gd-border-bgLight gd-pt-3 gd-px-6 gd-pb-0 -gd-mx-6 gd-space-x-6">
          {site.tabs
            .filter((v) => v.type === 'link')
            .map((v, i) => {
              const key = v.to + i;
              return (
                <TabLink key={key} href={v.to}>
                  {v.title}
                </TabLink>
              );
            })}
        </div>
      ) : null}
    </header>
  );
}
