import { GithubDisplay } from './github';
import ActiveLink from './utils/activelink';

export function Logo() {
  return (
    <div className="gd-flex gd-items-center gd-gap-3">
      <img
        src="https://jipfr.nl/img/cats/pudding-12.jpeg"
        className="gd-w-8 gd-h-8 gd-object-cover"
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
  return (
    <header className="gd-p-6 gd-pb-0 -gd-mx-6 gd-box-content gd-border-b gd-border-bgLight gd-mb-8">
      <div className="gd-flex gd-justify-between gd-mb-6">
        <Logo />
        <div className="gd-flex gd-items-center gd-space-x-6">
          <ActiveLink activeClassName="gd-text-textHeading" href="/">
            Documentation
          </ActiveLink>
          <ActiveLink activeClassName="gd-text-textHeading" href="/a">
            API Reference
          </ActiveLink>
          <ActiveLink activeClassName="gd-text-textHeading" href="/b">
            API Reference
          </ActiveLink>
          <GithubDisplay org="movie-web" repo="movie-web" />
        </div>
      </div>
      <div className="gd-border-t gd-border-bgLight gd-pt-3 gd-px-6 gd-pb-0 -gd-mx-6 gd-space-x-6">
        <TabLink href="/">Guides</TabLink>
        <TabLink href="/a">Components</TabLink>
        <TabLink href="/b">Integrations</TabLink>
      </div>
    </header>
  );
}
