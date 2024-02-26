import type { MarkdownProps } from './types';

export function MarkdownCodeBlock(props: MarkdownProps) {
  if (props.attrs['data-theme']) {
    return props.children;
  }
  return (
    <div className="neato-guider-codeblock" {...props.attrs}>
      {props.children}
    </div>
  );
}
