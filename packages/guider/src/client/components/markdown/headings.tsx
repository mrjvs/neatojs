import type { ReactNode } from 'react';
import classNames from 'classnames';
import type { ElementProps } from './types';

export type MarkdownProps = {
  attrs: ElementProps;
  children?: ReactNode;
};

const headingClasses = 'gd-relative gd-group';

function HeadingAnchor(props: { attrs: ElementProps }) {
  if (!props.attrs.id) return null;
  return (
    <a
      href={`#${props.attrs.id}`}
      className="group-hover:gd-opacity-50 gd-hidden md:gd-inline gd-text-textLight gd-transition-opacity gd-duration-50 gd-select-none gd-absolute gd-left-0 gd-opacity-0 gd-pr-[.3em] -gd-ml-[1em] hover:!gd-opacity-75 gd-font-normal"
    >
      #
    </a>
  );
}

export function MarkdownH1(props: MarkdownProps) {
  return (
    <h1
      {...props.attrs}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-text-2xl gd-mb-3',
        props.attrs.class,
        headingClasses,
      )}
    >
      {props.children}
      <HeadingAnchor attrs={props.attrs} />
    </h1>
  );
}

export function MarkdownH2(props: MarkdownProps) {
  return (
    <h2
      {...props.attrs}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-text-xl gd-mt-10 gd-mb-4',
        props.attrs.class,
        headingClasses,
      )}
    >
      {props.children}
      <HeadingAnchor attrs={props.attrs} />
    </h2>
  );
}
