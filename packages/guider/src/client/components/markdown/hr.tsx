import classNames from 'classnames';
import type { MarkdownProps } from './types';

export function MarkdownHr(props: MarkdownProps) {
  return (
    <hr
      {...props.attrs}
      className={classNames(
        'gd-my-4 gd-border-0 gd-h-px gd-bg-line',
        props.attrs.className,
      )}
    />
  );
}
