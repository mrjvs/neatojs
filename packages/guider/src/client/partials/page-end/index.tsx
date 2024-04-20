import { useGuiderPage } from '../../hooks/use-guider-page';
import { PageEndInternal } from './page-end';

export function GuiderPageEnd() {
  const { settings } = useGuiderPage();
  const enabled = settings.pageEndState;
  const Comp = settings.pageEndComponent ?? PageEndInternal;
  if (!enabled) return null;
  return <Comp />;
}
