import { type ReactNode } from 'react';
import { Icon } from '../components/icon';
import type { MetaConf } from '../types';
import { GuiderSidebar } from '../components/sidebar';
import { Header } from '../components/header';
import { useGuider } from './use-guider';
import { GuiderLayoutContext } from './context';

export function GuiderLayout(props: { children?: ReactNode; meta?: MetaConf }) {
  const { directory, layout, site, layoutSettings } = useGuider(props.meta);

  return (
    <GuiderLayoutContext.Provider value={props.meta}>
      <div className="gd-w-11/12 gd-max-w-[1480px] gd-mx-auto">
        <Header />

        <div className="gd-grid gd-grid-cols-[280px,1fr,280px] gd-gap-16">
          <GuiderSidebar />
          <article>{props.children}</article>
          <div>
            <Icon icon="house" />
            <p>Site: {site.id}</p>
            <p>Layout: {layout.id}</p>
            <p>Settings: {JSON.stringify(layoutSettings)}</p>
            <p>Directory: {JSON.stringify(directory.id)}</p>
          </div>
        </div>
      </div>
    </GuiderLayoutContext.Provider>
  );
}
