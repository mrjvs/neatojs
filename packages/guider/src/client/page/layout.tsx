import type { ReactNode } from 'react';
import { useGuider } from './use-guider';

export function GuiderLayout(props: { children?: ReactNode }) {
  const { layout } = useGuider();

  return (
    <div>
      <p>Layout: {layout.id}</p>
      <p>Sidebar: {JSON.stringify(layout.sidebar)}</p>
      <hr />
      {props.children}
    </div>
  );
}
