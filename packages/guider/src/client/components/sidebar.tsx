import { Fragment, useContext } from 'react';
import { useGuider } from '../page/use-guider';
import { GuiderLayoutContext } from '../page/context';
import { GuiderSidebarLink } from './sidebar-link';

export function GuiderSidebar() {
  const ctx = useContext(GuiderLayoutContext);
  const { directory } = useGuider(ctx?.meta ?? {});

  return (
    <div className="gd-flex gd-flex-col">
      <div className="gd-space-y-1">
        {directory.sidebarItems.map((link, i) => {
          const key = `${link.to}--${i}`;
          if (link.type === 'link')
            return <GuiderSidebarLink key={key} link={link} />;
          if (link.type === 'component')
            return <Fragment key={key}>{link.component?.() ?? null}</Fragment>;
          if (link.type === 'seperator') return <hr key={key} />;
          if (link.type === 'group')
            return (
              <h3
                key={key}
                className="gd-text-sm gd-text-textHeading gd-font-medium gd-mb-2"
              >
                {link.title ?? ''}
              </h3>
            );
          return null;
        })}
      </div>
    </div>
  );
}
