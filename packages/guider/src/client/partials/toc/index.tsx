import { useGuiderPage } from '../../hooks/use-guider-page';
import { TocInternal } from './toc';

export function GuiderToc() {
  const { settings } = useGuiderPage();
  const Val = settings.toc;
  if (!Val) return null;
  if (typeof Val === 'function') return <Val />;
  return <TocInternal />;
}
