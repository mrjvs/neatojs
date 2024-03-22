import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { makeKey } from 'src/client/utils/make-key';
import ActiveLink, {
  useAreRoutesActive,
} from '../../components/utils/activelink';
import type {
  DropdownChildren,
  GroupComponent,
  LinkComponent,
} from '../../../theme';
import { Icon } from '../../components/icon';

function DropdownItem(props: { link: LinkComponent; active?: boolean }) {
  return (
    <div
      className={classNames({
        'gd-py-2 gd-px-3 gd-flex gd-items-center gd-transition-colors gd-duration-100 hover:gd-bg-bgLight gd-rounded':
          true,
        'gd-text-primary': props.active,
      })}
    >
      <div className="gd-flex-1">{props.link.title}</div>
      {props.active ? <Icon icon="ph:check-bold" /> : null}
    </div>
  );
}

function DropdownLink(props: { link: LinkComponent }) {
  return (
    <Menu.Item>
      {({ close }) => (
        <span>
          <ActiveLink
            href={props.link.to}
            exact={props.link.exact}
            onClick={close}
          >
            {({ isActive }) => (
              <DropdownItem link={props.link} active={isActive} />
            )}
          </ActiveLink>
        </span>
      )}
    </Menu.Item>
  );
}

function DropdownGroup(props: { group: GroupComponent<LinkComponent> }) {
  return (
    <div>
      <p className="gd-px-3 gd-opacity-50 gd-text-xs gd-font-bold gd-mt-4 gd-pb-1 gd-mb-1 gd-uppercase gd-border-b gd-border-b-line">
        {props.group.title}
      </p>
      {props.group.items.map((item, i) => {
        if (item.type === 'link')
          return <DropdownLink key={makeKey(i, item)} link={item} />;
        return null;
      })}
    </div>
  );
}

function UpdateHead(props: { active?: boolean }) {
  useEffect(() => {
    if (props.active)
      document.body.setAttribute('data-header-dropdown-open', 'true');
    return () => {
      document.body.removeAttribute('data-header-dropdown-open');
    };
  });
  return null;
}

export function HeaderDropdown(props: { dropdown: DropdownChildren[] }) {
  const links = props.dropdown
    .map((v) => (v.type === 'group' ? v.items : [v]))
    .flat();
  const actives = useAreRoutesActive(
    links.map((v) => ({ href: v.to, exact: v.exact })),
  );

  const activeItem = useMemo(() => {
    const activeIndex = actives.indexOf(true);
    if (activeIndex === -1) return undefined;
    return links[activeIndex];
  }, [actives, links]);

  return (
    <Menu
      as="div"
      className="sm:gd-relative -gd-ml-2 gd-inline-block gd-z-[70]"
    >
      <Menu.Button>
        {({ open }) => (
          <div
            className={classNames({
              'gd-bg-bg gd-border gd-text-left gd-flex gd-items-center gd-transition-colors gd-duration-100 gd-border-bgLightest gd-py-1 gd-rounded-md gd-px-4 hover:gd-bg-bgLight gd-border-opacity-0':
                true,
              '!gd-border-opacity-100 gd-text-textHeading': open,
            })}
          >
            <span className="gd-mr-2">
              {activeItem?.title ?? 'Select site'}
            </span>
            <Icon icon="flowbite:chevron-sort-solid" className="gd-text-text" />
            <UpdateHead active={open} />
          </div>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="gd-transition gd-ease-out gd-duration-100"
        enterFrom="gd-transform gd-opacity-0 gd-scale-95"
        enterTo="gd-transform gd-opacity-100 gd-scale-100"
        leave="gd-transition gd-ease-in gd-duration-75"
        leaveFrom="gd-transform gd-opacity-100 gd-scale-100"
        leaveTo="gd-transform gd-opacity-0 gd-scale-95"
      >
        <Menu.Items className="gd-absolute gd-p-2 gd-left-5 gd-right-5 sm:gd-left-0 sm:gd-right-auto gd-mt-2 sm:gd-w-72 gd-origin-top-left gd-rounded-md gd-bg-bg gd-border gd-border-bgLightest">
          {props.dropdown.map((item, i) => {
            if (item.type === 'group')
              return <DropdownGroup key={makeKey(i, item)} group={item} />;
            if (item.type === 'link')
              return <DropdownLink key={makeKey(i, item)} link={item} />;
            return null;
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
