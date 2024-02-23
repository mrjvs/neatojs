import { useContext } from 'react';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { SidebarInternal } from './sidebar';

export function GuiderSidebar() {
  const ctx = useContext(GuiderLayoutContext);
  const { layoutSettings } = useGuider(ctx?.meta);

  if (!layoutSettings.sidebar) return null;
  return <SidebarInternal />;
}
