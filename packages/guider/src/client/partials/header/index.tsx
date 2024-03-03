import { useGuiderPage } from '../../hooks/use-guider-page';
import { HeaderInternal } from './header';

export function GuiderHeader() {
  const { settings } = useGuiderPage();
  const Val = settings.navigation;
  if (!Val) return null;
  if (typeof Val === 'function') return <Val />;
  return <HeaderInternal />;
}
