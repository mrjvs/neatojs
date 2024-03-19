import classNames from 'classnames';
import type { ElementProps, MarkdownProps } from './types';

const headingClasses =
  'gd-relative neato-guider-heading gd-group gd-scroll-m-48';

function HeadingAnchor(props: { attrs: ElementProps }) {
  if (!props.attrs.id) return null;
  return (
    <a
      href={`#${props.attrs.id}`}
      className="neato-guider-heading-anchor gd-top-0 group-hover:gd-opacity-50 gd-hidden md:gd-inline gd-text-textLight gd-transition-opacity gd-duration-100 gd-select-none gd-absolute gd-left-0 gd-opacity-0 gd-pr-[.3em] -gd-ml-[1em] hover:!gd-opacity-75 gd-font-normal"
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
        'gd-font-bold gd-text-textHeading gd-mt-12 gd-text-2xl gd-mb-3',
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

export function MarkdownH3(props: MarkdownProps) {
  return (
    <h3
      {...props.attrs}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-text-lg gd-mt-10 gd-mb-4',
        props.attrs.class,
        headingClasses,
      )}
    >
      {props.children}
      <HeadingAnchor attrs={props.attrs} />
    </h3>
  );
}

export function MarkdownH4(props: MarkdownProps) {
  return (
    <h3
      {...props.attrs}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-text-lg gd-mt-10 gd-mb-4',
        props.attrs.class,
        headingClasses,
      )}
    >
      {props.children}
      <HeadingAnchor attrs={props.attrs} />
    </h3>
  );
}

export function MarkdownH5(props: MarkdownProps) {
  return (
    <h3
      {...props.attrs}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-text-lg gd-mt-10 gd-mb-4',
        props.attrs.class,
        headingClasses,
      )}
    >
      {props.children}
      <HeadingAnchor attrs={props.attrs} />
    </h3>
  );
}

export function MarkdownH6(props: MarkdownProps) {
  return (
    <h3
      {...props.attrs}
      className={classNames(
        'gd-font-bold gd-text-textHeading gd-text-lg gd-mt-10 gd-mb-4',
        props.attrs.class,
        headingClasses,
      )}
    >
      {props.children}
      <HeadingAnchor attrs={props.attrs} />
    </h3>
  );
}
