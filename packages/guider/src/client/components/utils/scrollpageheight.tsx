import { useEffect, useRef } from 'react';

function onResize(element?: HTMLDivElement | null) {
  if (!element) return;

  element.style.top = 'initial';
  element.style.maxHeight = 'auto';

  const top = element.getBoundingClientRect().top + window.scrollY;
  const height = window.innerHeight - top;
  element.style.maxHeight = `${height}px`;
  element.style.top = `${top}px`;
}

export function ScrollPageHeight(props: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function eventHandler() {
      console.log('you get called?');
      onResize(elementRef.current);
    }
    window.addEventListener('resize', eventHandler);
    onResize();

    return () => {
      window.removeEventListener('resize', eventHandler);
    };
  }, []);

  return (
    <div className="-gd-mt-6 gd-sticky gd-top-0" ref={elementRef}>
      <div className="gd-w-full gd-h-full gd-relative">
        {/* Gradients */}
        <div className="gd-h-6 gd-bg-gradient-to-b gd-from-bg gd-to-transparent gd-absolute gd-w-full gd-top-0 gd-left-0 pointer-events-none" />
        <div className="gd-h-6 gd-bg-gradient-to-t gd-from-bg gd-to-transparent gd-absolute gd-w-full gd-bottom-0 gd-left-0 pointer-events-none" />

        {/* Scrollable section */}
        <div className="gd-overflow-y-auto gd-h-full gd-pb-12 gd-pt-6 gd-px-4 -gd-mx-4">
          {props.children}
        </div>
      </div>
    </div>
  );
}
