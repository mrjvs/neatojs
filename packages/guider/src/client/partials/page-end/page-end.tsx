import Link from 'next/link';
import classNames from 'classnames';
import { useGuiderPage } from '../../hooks/use-guider-page';
import { Icon } from '../../components/icon';

function PageEndLink(props: { to: string; title: string; flip?: boolean }) {
  return (
    <Link
      href={props.to}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-flex gd-items-center hover:gd-opacity-75 gd-group gd-transition-opacity',
        {
          'gd-text-right -gd-mr-1.5': props.flip,
          '-gd-ml-1.5': !props.flip,
        },
      )}
    >
      {!props.flip ? (
        <Icon
          icon="flowbite:chevron-left-outline"
          className="gd-text-lg gd-mt-0.5 gd-mr-1 gd-transition-transform group-hover:-gd-translate-x-1"
        />
      ) : null}
      {props.title}
      {props.flip ? (
        <Icon
          icon="flowbite:chevron-right-outline"
          className="gd-text-lg gd-mt-0.5 gd-ml-1 gd-transition-transform group-hover:gd-translate-x-1"
        />
      ) : null}
    </Link>
  );
}

export function PageEndInternal() {
  const { navContext } = useGuiderPage();

  const hasContent = navContext.prev || navContext.next;
  if (!hasContent) return null;

  return (
    <div className="gd-flex gd-justify-between gd-mt-12">
      <div>
        {navContext.prev ? (
          <PageEndLink
            title={navContext.prev.item.title}
            to={navContext.prev.item.to ?? '#'}
          />
        ) : null}
      </div>
      <div>
        {navContext.next ? (
          <PageEndLink
            title={navContext.next.item.title}
            to={navContext.next.item.to ?? '#'}
            flip
          />
        ) : null}
      </div>
    </div>
  );
}
