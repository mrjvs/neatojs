import type { ReactNode } from 'react';
import type { ElementProps } from './types';

export type MarkdownProps = {
  attrs: ElementProps;
  children?: ReactNode;
};

export function MarkdownH1(props: MarkdownProps) {
  return (
    <h1
      className="gd-font-bold gd-text-textHeading gd-text-2xl gd-mb-3"
      {...props.attrs}
    >
      {props.children}
    </h1>
  );
}

export function MarkdownH2(props: MarkdownProps) {
  return (
    <h1
      className="gd-font-bold gd-text-textHeading gd-text-xl gd-mt-10 gd-mb-4"
      {...props.attrs}
    >
      {props.children}
    </h1>
  );
}
