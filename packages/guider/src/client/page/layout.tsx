import type { ReactNode } from 'react';
import { Icon } from '../components/icon';
import { useGuider } from './use-guider';

// TODO get current applicable page from page map
export function GuiderLayout(props: { children?: ReactNode }) {
  const { directory, layout, pageMap } = useGuider();

  return (
    <div>
      <p className="gd-font-bold">
        <Icon icon="house" />
        Layout: {layout.id}
      </p>
      <p>Sidebar: {JSON.stringify(directory.sidebarItems)}</p>
      <p>pagemap: {JSON.stringify(pageMap)}</p>
      <hr />
      {props.children}
    </div>
  );
}
