import { useGuiderPage } from '../../hooks/use-guider-page';

export function Breadcrumb() {
  const { navContext } = useGuiderPage();

  if (!navContext.current?.group) return null;
  return (
    <p className="gd-font-bold gd-mb-2 gd-text-primary gd-text-sm">
      {navContext.current.group}
    </p>
  );
}
