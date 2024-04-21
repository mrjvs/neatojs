import { SearchScreen } from './screen';

export function SearchModal(props: {
  onClose?: () => void;
  searchKey: string;
}) {
  return (
    <div className="gd-inset-0 gd-fixed gd-bg-black gd-bg-opacity-75 gd-z-[75]">
      <div className="gd-inset-0 gd-absolute" onClick={props.onClose} />
      <div className="gd-max-w-[800px] gd-relative gd-mx-auto gd-mt-52">
        <SearchScreen searchKey={props.searchKey} />
      </div>
    </div>
  );
}
