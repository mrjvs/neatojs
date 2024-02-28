import { Menu, Transition } from '@headlessui/react';
import { Fragment, useMemo } from 'react';
import classNames from 'classnames';
import ActiveLink, {
  useAreRoutesActive,
} from '../../components/utils/activelink';
import type { DropdownChildren, LinkComponent } from '../../theme/components';
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
      <ActiveLink href={props.link.to} exact>
        {({ isActive }) => <DropdownItem link={props.link} active={isActive} />}
      </ActiveLink>
    </Menu.Item>
  );
}

export function HeaderDropdown(props: { dropdown: DropdownChildren[] }) {
  const actives = useAreRoutesActive(
    props.dropdown.map((v) => ({ href: v.to, exact: true })),
  );

  const activeItem = useMemo(() => {
    const activeIndex = actives.indexOf(true);
    if (activeIndex === -1) return props.dropdown[0];
    return props.dropdown[activeIndex];
  }, [actives, props.dropdown]);

  return (
    <Menu as="div" className="gd-relative -gd-ml-2 gd-inline-block">
      <Menu.Button>
        {({ open }) => (
          <div
            className={classNames({
              'gd-bg-bg gd-border gd-flex gd-items-center gd-transition-colors gd-duration-100 gd-border-bgLightest gd-py-1 gd-rounded-md gd-px-4 hover:gd-bg-bgLight gd-border-opacity-0':
                true,
              '!gd-border-opacity-100 gd-text-textHeading': open,
            })}
          >
            <span className="gd-mr-2 gd-pb-0.5">{activeItem.title}</span>
            <Icon icon="flowbite:chevron-sort-solid" className="gd-text-text" />
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
        <Menu.Items className="gd-absolute gd-p-2 gd-left-0 gd-mt-2 gd-w-72 gd-origin-top-left gd-rounded-md gd-bg-bg gd-border gd-border-bgLightest">
          {props.dropdown.map((item, i) => {
            const key = `--${i}-${item.to}`;
            if (item.type === 'link')
              return <DropdownLink key={key} link={item} />;
            return null;
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
