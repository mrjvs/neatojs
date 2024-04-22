import { Fragment, useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { SearchButton } from './button';
import { SearchModal } from './modal';
import { usePreloadSearch } from './content';

function UpdateHead(props: { active?: boolean }) {
  useEffect(() => {
    if (props.active)
      document.body.setAttribute('data-header-search-open', 'true');
    return () => {
      document.body.removeAttribute('data-header-search-open');
    };
  });
  return null;
}

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  const searchKey = 'default';
  usePreloadSearch(searchKey);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (openRef.current && e.key === 'Escape') {
        setOpen(false);
        e.preventDefault();
        return;
      }
      if (e.key === 'k' && e.ctrlKey) {
        setOpen(true);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className="gd-ml-2">
      <SearchButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <UpdateHead active={open} />
      <Transition as={Fragment} show={open}>
        <div>
          <SearchModal
            searchKey={searchKey}
            onClose={() => {
              setOpen(false);
            }}
          />
        </div>
      </Transition>
    </div>
  );
}
