import type { ReactNode } from 'react';
import type { ElementProps } from './types';

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
