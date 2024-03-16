import { useGuiderPage } from '../../hooks/use-guider-page';
import { GuiderLogo } from '../logo';

export function PageFooterInternal() {
  const { site } = useGuiderPage();

  return (
    <footer className="gd-py-6 gd-gap-8 gd-border-t gd-border-line gd-mt-6 gd-text-text gd-flex-col md:gd-flex-row gd-flex gd-items-start md:gd-items-center gd-justify-between">
      <div>
        <GuiderLogo />
      </div>
      {site.pageFooter?.text ? (
        <p className="md:gd-text-right">{site.pageFooter.text}</p>
      ) : null}
    </footer>
  );
}
