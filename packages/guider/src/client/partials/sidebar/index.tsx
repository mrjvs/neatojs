import { useGuiderPage } from '../../hooks/use-guider-page';
import { ScrollPageHeight } from '../../components/utils/scrollpageheight';
import { SidebarInternal } from './sidebar';

export function GuiderSidebar() {
  const { settings } = useGuiderPage();
  const enabled = settings.sidebarState;
  const Comp = settings.sidebarComponent ?? SidebarInternal;
  if (!enabled) return null;

  return (
    <ScrollPageHeight>
      <Comp />
    </ScrollPageHeight>
  );
}
