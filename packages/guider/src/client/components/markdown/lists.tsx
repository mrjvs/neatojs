import classNames from 'classnames';
import type { MarkdownProps } from './headings';

export function MarkdownUl(props: MarkdownProps) {
  return (
    <ul
      {...props.attrs}
      className={classNames('gd-pl-7 gd-mb-3 gd-relative', props.attrs.class)}
    >
      {props.children}
    </ul>
  );
}

export function MarkdownLi(props: MarkdownProps) {
  return (
    <li {...props.attrs} className={classNames('gd-mb-3', props.attrs.class)}>
      <span className="gd-absolute gd-inline-block gd-left-0 gd-mt-3 gd-h-px gd-w-3 gd-bg-text" />
      {props.children}
    </li>
  );
}

export function MarkdownOl(props: MarkdownProps) {
  return (
    <ol
      {...props.attrs}
      className={classNames('gd-pl-7 gd-mb-3 gd-relative', props.attrs.class)}
    >
      {props.children}
    </ol>
  );
}
