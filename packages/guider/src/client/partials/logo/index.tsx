import { useGuiderPage } from '../../hooks/use-guider-page';
import { LogoInternal } from './logo';

export function GuiderLogo() {
  const { settings } = useGuiderPage();
  const enabled = settings.logoState;
  const Comp = settings.logoComponent ?? LogoInternal;
  if (!enabled) return null;
  return <Comp />;
}
