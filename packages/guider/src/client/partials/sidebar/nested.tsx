import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { makeKey } from 'src/client/utils/make-key';
import { Icon } from '../../components/icon';
import type { NestableLinkComponent } from '../../../theme';
import ActiveLink, {
  useIsRouteActive,
} from '../../components/utils/activelink';
import { SidebarLink } from './link';
import { SidebarSeparator } from './separator';

function MaybeLink(props: {
  link: NestableLinkComponent;
  open?: boolean | undefined;
  onClick?: () => void;
}) {
  const contents = (
    <span className="gd-flex gd-flex-1 gd-items-center">
      {props.link.icon ? (
        <Icon
          inline
          className="gd-inline-block gd-mr-2"
          icon={props.link.icon}
        />
      ) : null}
      <span className="gd-flex-1">{props.link.title}</span>
      <Icon
        className={classNames({
          'gd-hidden': props.open === undefined,
          'gd-transition-transform gd-duration-100': true,
          'gd-rotate-90': props.open,
        })}
        icon="heroicons:chevron-right"
      />
    </span>
  );
  if (props.link.to)
    return (
      <ActiveLink
        className="gd-flex gd-items-center gd-w-full gd-py-1.5 gd-text-sm gd-px-4 gd-rounded-lg"
        activeClassName="gd-bg-bgLightest gd-text-primary"
        exact
        inactiveClassName="hover:gd-text-textLight hover:gd-bg-bgLight"
        href={props.link.to}
        target={props.link.newTab ? '_blank' : undefined}
      >
        {contents}
      </ActiveLink>
    );
  return (
    <div
      className="gd-flex gd-items-center gd-cursor-pointer gd-w-full gd-py-1.5 gd-text-sm gd-px-4 gd-rounded-lg hover:gd-text-textLight hover:gd-bg-bgLight gd-select-none"
      onClick={props.onClick}
    >
      {contents}
    </div>
  );
}

export function SidebarNested(props: { link: NestableLinkComponent }) {
  const [open, setOpen] = useState<null | boolean>(null);
  const [hasActiveChildren, setHasActiveChildren] = useState<boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const isRouteActive = useIsRouteActive({ href: props.link.to ?? '' });
  const isRealLinkOpen = props.link.to ? isRouteActive : false;
  const actuallyOpen =
    open === null ? isRealLinkOpen || Boolean(hasActiveChildren) : open;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function check() {
      setHasActiveChildren(
        Boolean(el?.querySelector('.neato-guider-active-link')),
      );
    }

    const observer = new MutationObserver(() => {
      check();
    });

    observer.observe(ref.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    check();

    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  // TODO icon randomly rotating on route switch
  return (
    <>
      <MaybeLink
        link={props.link}
        open={hasActiveChildren === null ? undefined : actuallyOpen}
        onClick={() => {
          setOpen(!actuallyOpen);
        }}
      />
      <div
        ref={ref}
        className={classNames({
          'gd-hidden': !actuallyOpen,
        })}
      >
        {props.link.items.map((link, i) => {
          const key = makeKey(i, link);
          if (link.type === 'link')
            return <SidebarLink key={key} link={link} indent />;
          if (link.type === 'separator') return <SidebarSeparator key={key} />;
          return null;
        })}
      </div>
    </>
  );
}
