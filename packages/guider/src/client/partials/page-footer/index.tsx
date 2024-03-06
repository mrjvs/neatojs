import { useGuiderPage } from '../../hooks/use-guider-page';
import { PageFooterInternal } from './page-footer';

export function GuiderpageFooter() {
  const { settings } = useGuiderPage();
  const enabled = settings.pageFooterState;
  const Comp = settings.pageFooterComponent ?? PageFooterInternal;
  if (!enabled) return null;
  return <Comp />;
}
