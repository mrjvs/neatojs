import type { ReactNode } from 'react';
import { useGuider } from './use-guider';

export function GuiderLayout(props: { children?: ReactNode }) {
  const { directory, layout } = useGuider();

  return (
    <div>
      <p className="gd-font-bold">Layout: {layout.id}</p>
      <p>Sidebar: {JSON.stringify(directory.sidebarItems)}</p>
      <hr />
      {props.children}
    </div>
  );
}
