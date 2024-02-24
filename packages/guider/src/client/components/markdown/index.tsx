import { MarkdownCodeBlock } from './code';
import { MarkdownH1, MarkdownH2 } from './headings';
import { MarkdownParagraph } from './paragraph';
import type { ElementProps } from './types';

export function useMDXComponents() {
  return {
    h1(props: ElementProps) {
      return <MarkdownH1 attrs={props}>{props.children}</MarkdownH1>;
    },
    h2(props: ElementProps) {
      return <MarkdownH2 attrs={props}>{props.children}</MarkdownH2>;
    },
    p(props: ElementProps) {
      return (
        <MarkdownParagraph attrs={props}>{props.children}</MarkdownParagraph>
      );
    },
    figure(props: ElementProps) {
      if (props['data-rehype-pretty-code-figure'] !== undefined)
        return <MarkdownCodeBlock>{props.children}</MarkdownCodeBlock>;
      return null;
    },
    pre(props: ElementProps) {
      return (
        <MarkdownCodeBlock>
          <pre>{props.children}</pre>
        </MarkdownCodeBlock>
      );
    },
  };
}
