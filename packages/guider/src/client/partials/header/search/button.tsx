import { Icon } from '../../../components/icon';

export function SearchButton(props: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="!gd-bg-bgDark gd-gap-2 gd-py-1.5 gd-px-2 gd-text-left md:gd-w-48 hover:!gd-bg-bgLight active:gd-scale-95 hover:gd-text-textHeading gd-transition-[color,transform] gd-border gd-border-bgLightest gd-rounded-md gd-flex gd-items-center"
    >
      <Icon
        icon="mingcute:search-2-fill"
        className="gd-opacity-50 gd-text-text"
      />
      <span className="gd-flex-1 gd-hidden md:gd-inline-block">Search</span>
      <span className="gd-text-right gd-text-xs gd-hidden md:gd-inline-block">
        Ctrl K
      </span>
    </button>
  );
}
