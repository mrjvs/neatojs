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

export function Header() {
  return (
    <header className="gd-py-6 gd-border-b gd-border-bgLight gd-flex gd-justify-between gd-mb-8">
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
    </header>
  );
}
