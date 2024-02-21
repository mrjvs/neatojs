import type { ReactNode } from 'react';
import { Icon } from '../components/icon';
import type { MetaConf } from '../types';
import { useGuider } from './use-guider';

export function GuiderLayout(props: { children?: ReactNode; meta?: MetaConf }) {
  const { directory, layout, site, layoutSettings } = useGuider(props.meta);

  return (
    <div>
      <Icon icon="house" />
      <p>Site: {site.id}</p>
      <p>Layout: {layout.id}</p>
      <p>Settings: {JSON.stringify(layoutSettings)}</p>
      <p>Directory: {JSON.stringify(directory.id)}</p>
      <hr />
      {props.children}
    </div>
  );
}
