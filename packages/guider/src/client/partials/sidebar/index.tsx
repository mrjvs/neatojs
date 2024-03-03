import { useGuiderPage } from '../../hooks/use-guider-page';
import { ScrollPageHeight } from '../../components/utils/scrollpageheight';
import { SidebarInternal } from './sidebar';

export function GuiderSidebar() {
  const { settings } = useGuiderPage();
  const Val = settings.sidebar;
  if (!Val) return null;
  if (typeof Val === 'function')
    return (
      <ScrollPageHeight>
        <Val />
      </ScrollPageHeight>
    );

  return (
    <ScrollPageHeight>
      <SidebarInternal />
    </ScrollPageHeight>
  );
}
