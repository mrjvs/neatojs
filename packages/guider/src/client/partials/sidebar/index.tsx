import { useContext } from 'react';
import { GuiderLayoutContext } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { ScrollPageHeight } from '../../components/utils/scrollpageheight';
import { SidebarInternal } from './sidebar';

export function GuiderSidebar() {
  const ctx = useContext(GuiderLayoutContext);
  const { layoutSettings } = useGuider(ctx?.meta);

  if (!layoutSettings.sidebar) return null;

  return (
    <ScrollPageHeight>
      <SidebarInternal />
    </ScrollPageHeight>
  );
}
