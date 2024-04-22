import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { SearchScreen } from './screen';

export function SearchModal(props: {
  onClose?: () => void;
  searchKey: string;
}) {
  return (
    <div className="gd-inset-0 gd-fixed gd-z-[75]">
      <Transition.Child
        as={Fragment}
        enter="gd-transition-opacity gd-duration-300"
        enterFrom="gd-opacity-0"
        enterTo="gd-opacity-100"
        leave="gd-duration-100 gd-transition-opacity"
        leaveFrom="gd-opacity-100"
        leaveTo="gd-opacity-0"
      >
        <div className="gd-inset-0 gd-fixed gd-bg-opacity-75 gd-bg-black" />
      </Transition.Child>
      <div className="gd-inset-0 gd-absolute" onClick={props.onClose} />
      <Transition.Child
        as={Fragment}
        enter="gd-transition-[transform,opacity] gd-duration-300"
        enterFrom="gd-opacity-0 gd-scale-95"
        enterTo="gd-opacity-100 gd-scale-100"
        leave="gd-duration-300 gd-transition-[transform,opacity]"
        leaveFrom="gd-opacity-100 gd-scale-100"
        leaveTo="gd-opacity-0 gd-scale-95"
      >
        <div className="gd-max-w-[800px] gd-relative gd-mx-auto gd-mt-[25vh]">
          <SearchScreen searchKey={props.searchKey} onClose={props.onClose} />
        </div>
      </Transition.Child>
    </div>
  );
}
