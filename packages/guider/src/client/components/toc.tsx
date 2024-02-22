import { useContext, useMemo } from 'react';
import classNames from 'classnames';
import type { MdxHeadings } from '../page/context';
import { GuiderLayoutContext } from '../page/context';
import { useToc } from '../hooks/use-toc';

export function TocLink(props: {
  heading: MdxHeadings;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <p>
      <a
        onClick={(e) => {
          e.preventDefault();
          const url = new URL(window.location.href.toString());
          url.hash = props.heading.data.id;
          history.pushState({}, '', url);
          props.onClick?.();
        }}
        href={`#${props.heading.data.id}`}
        className={classNames({
          'gd-text-primary gd-font-bold': props.active,
        })}
      >
        {props.heading.value}
      </a>
    </p>
  );
}

export function GuiderToc() {
  const ctx = useContext(GuiderLayoutContext);
  const ids = useMemo(
    () => ctx?.headings.map((v) => v.data.id) ?? [],
    [ctx?.headings],
  );
  const { activeId, scrollTo } = useToc(ids);

  return (
    <div className="gd-flex gd-flex-col">
      <div className="gd-space-y-1">
        {(ctx?.headings ?? []).map((heading, i) => (
          <TocLink
            key={i}
            active={heading.data.id === activeId}
            heading={heading}
            onClick={() => scrollTo(heading.data.id)}
          />
        ))}
      </div>
    </div>
  );
}
