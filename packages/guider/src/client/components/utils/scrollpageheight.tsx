import { useEffect, useRef } from 'react';

export function ScrollPageHeight(props: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  function onResize() {
    if (!elementRef.current) return;

    elementRef.current.style.top = 'initial';
    elementRef.current.style.maxHeight = 'auto';

    const top = elementRef.current.getBoundingClientRect().top + window.scrollY;
    const height = window.innerHeight - top;
    elementRef.current.style.maxHeight = `${height}px`;
    elementRef.current.style.top = `${top}px`;
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

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
