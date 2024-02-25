import { Menu } from '@headlessui/react';
import ActiveLink from '../../components/utils/activelink';
import type { DropdownChildren, LinkComponent } from '../../theme/components';

function DropdownItem(props: { link: LinkComponent; active?: boolean }) {
  return <div>{props.link.title}</div>;
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
  // TODO find active item
  const activeItem = props.dropdown[0];
  return (
    <Menu>
      <Menu.Button>
        <DropdownItem link={activeItem} />
      </Menu.Button>
      <Menu.Items>
        {props.dropdown.map((item, i) => {
          const key = `--${i}-${item.to}`;
          if (item.type === 'link')
            return <DropdownLink key={key} link={item} />;
          return null;
        })}
      </Menu.Items>
    </Menu>
  );
}
