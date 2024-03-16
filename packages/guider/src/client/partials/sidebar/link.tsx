import classNames from 'classnames';
import type { LinkComponent } from '../../../theme';
import { Icon } from '../../components/icon';
import ActiveLink from '../../components/utils/activelink';

export function SidebarLink(props: { link: LinkComponent; indent?: boolean }) {
  const link = props.link;
  return (
    <ActiveLink
      className={classNames({
        'gd-flex gd-items-center gd-w-full gd-py-1.5 gd-text-sm gd-px-4 gd-rounded-lg':
          true,
        'gd-pl-8': props.indent,
      })}
      activeClassName="gd-bg-bgLightest gd-text-primary"
      exact
      inactiveClassName="hover:gd-text-textLight hover:gd-bg-bgLight"
      href={link.to}
      target={link.newTab ? '_blank' : undefined}
    >
      {link.icon ? (
        <Icon inline className="gd-inline-block gd-mr-2" icon={link.icon} />
      ) : null}
      {link.title}
    </ActiveLink>
  );
}
