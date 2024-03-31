import { Fragment } from 'react';
import { makeKey } from 'src/client/utils/make-key';
import type {
  CustomComponentComponent,
  LinkComponent,
  TopNavChildren,
} from '../../../theme';
import { Icon } from '../../components/icon';
import ActiveLink from '../../components/utils/activelink';

function NavLink(props: { link: LinkComponent }) {
  return (
    <ActiveLink
      className="hover:gd-text-textHeading gd-p-2 gd-transition-colors gd-duration-100"
      activeClassName="gd-text-textHeading"
      href={props.link.to}
      exact={props.link.exact}
    >
      {props.link.icon ? (
        <Icon
          inline
          className="gd-inline-block gd-mr-2"
          icon={props.link.icon}
        />
      ) : null}
      {props.link.title}
    </ActiveLink>
  );
}

function NavCustomComponent(props: { component: CustomComponentComponent }) {
  return <Fragment>{props.component.component?.()}</Fragment>;
}

function NavSeparator() {
  return (
    <hr className="gd-w-full gd-h-px md:gd-w-px md:gd-h-full gd-border-0 gd-bg-line" />
  );
}

export function HeaderNav(props: { items: TopNavChildren[] }) {
  return (
    <>
      {props.items.map((v, i) => {
        const key = makeKey(i, v);
        if (v.type === 'component')
          return <NavCustomComponent key={key} component={v} />;
        if (v.type === 'link') return <NavLink key={key} link={v} />;
        if (v.type === 'separator') return <NavSeparator key={key} />;
        return null;
      })}
    </>
  );
}
