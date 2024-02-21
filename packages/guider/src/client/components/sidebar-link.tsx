import type { NavItemDescriptor } from '../types';
import { Icon } from './icon';
import ActiveLink from './utils/activelink';

export function GuiderSidebarLink(props: { link: NavItemDescriptor }) {
  const link = props.link;
  return (
    <ActiveLink
      className="gd-block gd-w-full gd-py-2 gd-px-4 -gd-mx-4 gd-box-content gd-rounded-lg"
      activeClassName="gd-bg-bgLightest gd-text-primary"
      inActiveClassName="hover:gd-text-textLight hover:gd-bg-bgLight"
      href={link.to}
      target={link.newTab ? '_blank' : undefined}
    >
      {link.icon ? (
        <Icon className="gd-inline-block gd-mr-2" icon={link.icon} />
      ) : null}
      {link.title}
    </ActiveLink>
  );
}
