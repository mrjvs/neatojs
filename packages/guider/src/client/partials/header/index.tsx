import { useGuiderPage } from '../../hooks/use-guider-page';
import { HeaderInternal } from './header';

export function GuiderHeader() {
  const { settings } = useGuiderPage();
  const enabled = settings.navigationState;
  const Comp = settings.navigationComponent ?? HeaderInternal;
  if (!enabled) return null;
  return <Comp />;
}
