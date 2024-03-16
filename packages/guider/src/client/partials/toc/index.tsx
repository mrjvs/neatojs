import { useGuiderPage } from '../../hooks/use-guider-page';
import { TocInternal } from './toc';

export function GuiderToc() {
  const { settings } = useGuiderPage();
  const enabled = settings.tocState;
  const Comp = settings.tocComponent ?? TocInternal;
  if (!enabled) return null;
  return <Comp />;
}
