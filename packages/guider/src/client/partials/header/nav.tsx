import { Fragment } from 'react';
import type {
  CustomComponentComponent,
  LinkComponent,
  TopNavChildren,
} from '../../theme/components';
import { Icon } from '../../components/icon';
import ActiveLink from '../../components/utils/activelink';

function NavLink(props: { link: LinkComponent }) {
  return (
    <ActiveLink activeClassName="gd-text-textHeading" href={props.link.to}>
      {props.link.icon ? (
        <Icon
          className="gd-inline-block text-[1.3rem] gd-mr-2"
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

function NavSeperator() {
  return <hr className="gd-w-px gd-h-full gd-border-0 gd-bg-line" />;
}

export function HeaderNav(props: { items: TopNavChildren[] }) {
  return (
    <>
      {props.items.map((v, i) => {
        const key = `--${i}`;
        if (v.type === 'component')
          return <NavCustomComponent key={key} component={v} />;
        if (v.type === 'link') return <NavLink key={key} link={v} />;
        if (v.type === 'seperator') return <NavSeperator key={key} />;
        return null;
      })}
    </>
  );
}
