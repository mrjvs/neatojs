import type { MarkdownProps } from './types';

export function MarkdownQuote(props: MarkdownProps) {
  return (
    <blockquote
      {...props.attrs}
      className="neato-guider-blockquote gd-border-l-4 gd-border-bgLightest gd-p-1 gd-pl-4 gd-mb-3"
    >
      {props.children}
    </blockquote>
  );
}
