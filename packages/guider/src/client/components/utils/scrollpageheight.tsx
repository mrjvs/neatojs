import { useCallback, useEffect, useRef } from 'react';

function onResize(element?: HTMLDivElement | null) {
  if (!element) return;

  const sticky = element.closest('.gd-sticky') as HTMLDivElement | undefined;
  if (!sticky) return;

  sticky.style.top = 'initial';
  element.style.height = 'auto';

  const top = element.getBoundingClientRect().top + window.scrollY;
  const height = window.innerHeight - top;
  element.style.height = `${height}px`;

  sticky.style.top = `${top}px`;
}

export function ScrollPageHeight(props: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const setRef = useCallback((node: HTMLDivElement | null) => {
    onResize(node);
    elementRef.current = node;
  }, []);

  useEffect(() => {
    function eventHandler() {
      onResize(elementRef.current);
    }
    window.addEventListener('resize', eventHandler);
    eventHandler();

    return () => {
      window.removeEventListener('resize', eventHandler);
    };
  }, [elementRef.current]);

  return (
    <div className="-gd-mt-6 gd-sticky gd-top-0">
      <div className="gd-w-full gd-relative" ref={setRef}>
        <div className="gd-absolute gd-inset-0 gd-h-full gd-overflow-y-auto gd-pb-12 gd-pt-6 gd-px-4 -gd-mx-4">
          {props.children}
        </div>
      </div>
    </div>
  );
}
