import type { LinkComponent } from '../../theme/components';
import { Icon } from '../../components/icon';
import ActiveLink from '../../components/utils/activelink';

export function SidebarStarLink(props: { link: LinkComponent }) {
  const link = props.link;
  return (
    <ActiveLink
      className="gd-flex gd-w-full gd-items-center gd-gap-2 gd-py-2 gd-px-4"
      exactMatchClassName="gd-text-primary"
      inactiveClassName="hover:gd-text-textLight"
      href={link.to}
      target={link.newTab ? '_blank' : undefined}
    >
      <span className="gd-size-8 gd-flex gd-bg-bgLight gd-border-t-2 gd-border-bgLightest gd-justify-center gd-items-center gd-rounded-md">
        {link.icon ? <Icon icon={link.icon} /> : null}
      </span>
      <span className="gd-flex-1">{link.title}</span>
    </ActiveLink>
  );
}
