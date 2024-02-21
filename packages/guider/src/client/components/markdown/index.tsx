import { MarkdownH1, MarkdownH2 } from './headings';
import type { ElementProps } from './types';

export function useMDXComponents() {
  return {
    h1(props: ElementProps) {
      return <MarkdownH1 attrs={props}>{props.children}</MarkdownH1>;
    },
    h2(props: ElementProps) {
      return <MarkdownH2 attrs={props}>{props.children}</MarkdownH2>;
    },
  };
}
