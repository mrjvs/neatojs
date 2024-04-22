import classNames from 'classnames';
import { Icon } from '../icon';
import type { MarkdownProps } from './types';

export function MarkdownUl(props: MarkdownProps) {
  return (
    <ul
      {...props.attrs}
      className={classNames(
        'gd-pl-7 neato-guider-list gd-mb-3 gd-relative',
        props.attrs.class,
      )}
    >
      {props.children}
    </ul>
  );
}

export function MarkdownLi(props: MarkdownProps) {
  return (
    <li {...props.attrs} className={classNames('gd-mb-3', props.attrs.class)}>
      <span className="gd-absolute neato-guider-list-line gd-opacity-75 gd-whitespace-nowrap gd-inline-block gd-left-0 gd-mt-3 gd-h-px gd-w-3 gd-bg-text" />
      <span className="gd-absolute gd-text-[.7rem] neato-guider-task gd-hidden gd-border gd-border-line gd-left-0 gd-mt-1 gd-size-4 gd-rounded-[5px] gd-text-textHeading gd-items-center gd-justify-center">
        <Icon
          icon="ph:check-bold"
          className="neato-guider-task-icon gd-hidden"
        />
      </span>
      {props.children}
    </li>
  );
}

export function MarkdownOl(props: MarkdownProps) {
  return (
    <ol
      {...props.attrs}
      className={classNames(
        'gd-pl-7 neato-guider-list gd-mb-3 gd-relative',
        props.attrs.class,
      )}
    >
      {props.children}
    </ol>
  );
}
