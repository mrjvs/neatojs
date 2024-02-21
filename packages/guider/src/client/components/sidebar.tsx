import { useContext } from 'react';
import { useGuider } from '../page/use-guider';
import { GuiderLayoutContext } from '../page/context';
import { GuiderSidebarLink } from './sidebar-link';

export function GuiderSidebar() {
  const ctx = useContext(GuiderLayoutContext);
  const { directory } = useGuider(ctx?.meta ?? {});

  return (
    <div className="gd-flex gd-flex-col">
      <h3 className="gd-text-sm gd-text-textHeading gd-font-medium gd-mb-2">
        Getting Started
      </h3>
      <div className="gd-space-y-1">
        {directory.sidebarItems.map((link, i) => (
          <GuiderSidebarLink key={`${link.to}--${i}`} link={link} />
        ))}
      </div>
    </div>
  );
}
