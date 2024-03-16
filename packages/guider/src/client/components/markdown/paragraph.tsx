import type { ReactNode } from 'react';
import Link from 'next/link';
import type { ElementProps, MarkdownProps } from './types';

export type MarkdownParagraphProps = {
  attrs: ElementProps;
  children?: ReactNode;
};

export function MarkdownParagraph(props: MarkdownParagraphProps) {
  return (
    <p className="gd-mb-3 gd-leading-relaxed" {...props.attrs}>
      {props.children}
    </p>
  );
}

export function MarkdownLink(props: MarkdownProps) {
  return (
    <Link
      {...props.attrs}
      href={props.attrs.href ?? '#'}
      className="gd-text-primary gd-underline gd-font-bold hover:gd-text-primaryDark gd-transition-colors gd-duration-100"
    >
      {props.children}
    </Link>
  );
}
