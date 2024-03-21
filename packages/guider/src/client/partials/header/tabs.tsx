import { Fragment } from 'react';
import { makeKey } from 'src/client/utils/make-key';
import ActiveLink from '../../components/utils/activelink';
import type {
  CustomComponentComponent,
  LinkComponent,
  TabsChildren,
} from '../../../theme';
import { Icon } from '../../components/icon';

function TabLink(props: { link: LinkComponent }) {
  return (
    <ActiveLink
      className="gd-inline-block gd-py-4 gd-border-b -gd-mb-px gd-px-1 -gd-ml-1"
      activeClassName="gd-text-textHeading gd-border-primary"
      inactiveClassName="gd-border-transparent hover:gd-text-textLight"
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

function CustomComponentTab(props: { component: CustomComponentComponent }) {
  return <Fragment>{props.component.component?.()}</Fragment>;
}

export function HeaderTabs(props: { tabs: TabsChildren[] }) {
  return (
    <div className="gd-border-t gd-border-line gd-px-6 gd-pb-0 -gd-mx-6 gd-space-x-6">
      {props.tabs.map((v, i) => {
        const key = makeKey(i, v);
        if (v.type === 'component')
          return <CustomComponentTab key={key} component={v} />;
        if (v.type === 'link') return <TabLink key={key} link={v} />;
        return null;
      })}
    </div>
  );
}
