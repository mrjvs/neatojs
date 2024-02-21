import { useContext } from 'react';
import { useGuider } from '../page/use-guider';
import { GuiderLayoutContext } from '../page/context';
import { GuiderSidebarLink } from './sidebar-link';

export function GuiderSidebar() {
  const meta = useContext(GuiderLayoutContext);
  const { directory } = useGuider(meta);

  return (
    <div className="gd-flex gd-flex-col">
      {directory.sidebarItems.map((link) => (
        <GuiderSidebarLink link={link} />
      ))}
    </div>
  );
}
