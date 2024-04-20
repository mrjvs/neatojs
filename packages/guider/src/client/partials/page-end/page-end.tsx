import { useGuiderPage } from '../../hooks/use-guider-page';

export function PageEndInternal() {
  const { navContext } = useGuiderPage();

  return (
    <div>
      {navContext.prev ? <div>prev: {navContext.prev.item.title}</div> : null}
      {navContext.current ? (
        <div>
          current: {navContext.current.item.title} ({navContext.current.group})
        </div>
      ) : null}
      {navContext.next ? <div>next: {navContext.next.item.title}</div> : null}
    </div>
  );
}
