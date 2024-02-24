import { MarkdownCodeBlock } from './code';
import { MarkdownH1, MarkdownH2 } from './headings';
import { MarkdownItalic, MarkdownStrike, MarkdownStrong } from './inline';
import { MarkdownLi, MarkdownOl, MarkdownUl } from './lists';
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
      return <figure {...props} />;
    },
    pre(props: ElementProps) {
      return (
        <MarkdownCodeBlock>
          <pre>{props.children}</pre>
        </MarkdownCodeBlock>
      );
    },
    em(props: ElementProps) {
      return <MarkdownItalic attrs={props}>{props.children}</MarkdownItalic>;
    },
    del(props: ElementProps) {
      return <MarkdownStrike attrs={props}>{props.children}</MarkdownStrike>;
    },
    strong(props: ElementProps) {
      return <MarkdownStrong attrs={props}>{props.children}</MarkdownStrong>;
    },
    ul(props: ElementProps) {
      return <MarkdownUl attrs={props}>{props.children}</MarkdownUl>;
    },
    li(props: ElementProps) {
      return <MarkdownLi attrs={props}>{props.children}</MarkdownLi>;
    },
    ol(props: ElementProps) {
      return <MarkdownOl attrs={props}>{props.children}</MarkdownOl>;
    },
  };
}
