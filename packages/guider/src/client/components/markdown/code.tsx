import type { ReactNode } from 'react';

export interface MarkdownCodeBlockProps {
  children?: ReactNode;
}

export function MarkdownCodeBlock(props: MarkdownCodeBlockProps) {
  return <div className="neato-guider-codeblock">{props.children}</div>;
}
