import classNames from 'classnames';
import type { MarkdownProps } from './types';

export function MarkdownTable(props: MarkdownProps) {
  return (
    <div
      className={classNames(
        'gd-rounded-xl gd-border gd-border-line gd-overflow-x-auto gd-grid gd-grid-cols-1 gd-my-8',
        props.attrs.class,
      )}
    >
      <table
        className={'gd-text-sm neato-guider-table gd-w-full gd-border-hidden'}
        {...props.attrs}
      >
        {props.children}
      </table>
    </div>
  );
}

export function MarkdownTHead(props: MarkdownProps) {
  return (
    <thead
      className={classNames(
        'gd-bg-bgLight gd-text-textHeading gd-font-semibold',
        props.attrs.class,
      )}
      {...props.attrs}
    >
      {props.children}
    </thead>
  );
}

export function MarkdownTBody(props: MarkdownProps) {
  return <tbody {...props.attrs}>{props.children}</tbody>;
}

export function MarkdownTR(props: MarkdownProps) {
  return <tr {...props.attrs}>{props.children}</tr>;
}

export function MarkdownTH(props: MarkdownProps) {
  return (
    <th
      className={classNames(
        'gd-px-4 gd-py-3 gd-border gd-border-line gd-text-left',
        props.attrs.class,
      )}
      {...props.attrs}
    >
      {props.children}
    </th>
  );
}

export function MarkdownTD(props: MarkdownProps) {
  return (
    <td
      className={classNames(
        'gd-px-4 gd-py-3 gd-border gd-border-line',
        props.attrs.class,
      )}
      {...props.attrs}
    >
      {props.children}
    </td>
  );
}
