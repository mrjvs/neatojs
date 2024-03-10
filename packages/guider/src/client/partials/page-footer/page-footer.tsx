import { useGuiderPage } from '../../hooks/use-guider-page';
import { LogoInternal } from '../logo/logo';

export function PageFooterInternal() {
  const { site } = useGuiderPage();

  return (
    <footer className="gd-py-6 gd-border-t gd-border-line gd-mt-12 gd-text-text gd-flex gd-items-center gd-justify-between">
      <div>
        <LogoInternal />
      </div>
      {site.pageFooter?.text ? (
        <p className="gd-text-right">{site.pageFooter.text}</p>
      ) : null}
    </footer>
  );
}
