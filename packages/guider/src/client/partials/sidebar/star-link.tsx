import classNames from 'classnames';
import type { LinkComponent } from '../../../theme';
import { Icon } from '../../components/icon';
import ActiveLink from '../../components/utils/activelink';

export function SidebarStarLink(props: { link: LinkComponent }) {
  const link = props.link;
  return (
    <ActiveLink
      className="gd-flex gd-w-full gd-items-center gd-gap-3 gd-py-1.5 gd-text-sm gd-px-4 !gd-my-0 gd-group"
      activeClassName="gd-text-primary"
      exact={props.link.exact ?? true}
      inactiveClassName="hover:gd-text-textLight"
      href={link.to}
      target={link.newTab ? '_blank' : undefined}
    >
      {({ isActive }) => (
        <>
          <span
            className={classNames({
              'gd-size-7 gd-flex gd-text-sm gd-border-t-2 gd-justify-center gd-items-center gd-rounded-md gd-transition-[background-color,color,border-color] gd-duration-100':
                true,
              'group-hover:gd-bg-bgLightest group-hover:gd-text-textHeading':
                true,
              '!gd-border-primary !gd-bg-primaryDark !gd-text-textHeading':
                isActive,
              'gd-border-bgLightest gd-bg-bgLight': !isActive,
            })}
          >
            {link.icon ? <Icon icon={link.icon} /> : null}
          </span>
          <span className="gd-flex-1 gd-transition-colors gd-duration-100">
            {link.title}
          </span>
        </>
      )}
    </ActiveLink>
  );
}
