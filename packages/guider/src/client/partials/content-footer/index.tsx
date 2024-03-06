import { useGuiderPage } from '../../hooks/use-guider-page';
import { ContentFooterInternal } from './content-footer';

export function GuiderContentFooter() {
  const { settings } = useGuiderPage();
  const enabled = settings.contentFooterState;
  const Comp = settings.contentFooterComponent ?? ContentFooterInternal;
  if (!enabled) return null;
  return <Comp />;
}
