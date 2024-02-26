import type { ReactNode } from 'react';

export type ElementProps = Record<string, string>;

export type MarkdownProps = {
  attrs: ElementProps;
  children?: ReactNode;
};
