import { MarkdownCodeBlock } from './code';
import {
  MarkdownH1,
  MarkdownH2,
  MarkdownH3,
  MarkdownH4,
  MarkdownH5,
  MarkdownH6,
} from './headings';
import { MarkdownItalic, MarkdownStrike, MarkdownStrong } from './inline';
import { MarkdownLi, MarkdownOl, MarkdownUl } from './lists';
import { MarkdownParagraph } from './paragraph';
import {
  MarkdownTBody,
  MarkdownTD,
  MarkdownTH,
  MarkdownTHead,
  MarkdownTR,
  MarkdownTable,
} from './table';
import type { ElementProps } from './types';

export function useMDXComponents() {
  return {
    h1(props: ElementProps) {
      return <MarkdownH1 attrs={props}>{props.children}</MarkdownH1>;
    },
    h2(props: ElementProps) {
      return <MarkdownH2 attrs={props}>{props.children}</MarkdownH2>;
    },
    h3(props: ElementProps) {
      return <MarkdownH3 attrs={props}>{props.children}</MarkdownH3>;
    },
    h4(props: ElementProps) {
      return <MarkdownH4 attrs={props}>{props.children}</MarkdownH4>;
    },
    h5(props: ElementProps) {
      return <MarkdownH5 attrs={props}>{props.children}</MarkdownH5>;
    },
    h6(props: ElementProps) {
      return <MarkdownH6 attrs={props}>{props.children}</MarkdownH6>;
    },
    p(props: ElementProps) {
      return (
        <MarkdownParagraph attrs={props}>{props.children}</MarkdownParagraph>
      );
    },
    figure(props: ElementProps) {
      if (props['data-rehype-pretty-code-figure'] !== undefined)
        return (
          <MarkdownCodeBlock attrs={props}>{props.children}</MarkdownCodeBlock>
        );
      return <figure {...props} />;
    },
    pre(props: ElementProps) {
      return <pre>{props.children}</pre>;
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
    table(props: ElementProps) {
      return <MarkdownTable attrs={props}>{props.children}</MarkdownTable>;
    },
    thead(props: ElementProps) {
      return <MarkdownTHead attrs={props}>{props.children}</MarkdownTHead>;
    },
    tbody(props: ElementProps) {
      return <MarkdownTBody attrs={props}>{props.children}</MarkdownTBody>;
    },
    tr(props: ElementProps) {
      return <MarkdownTR attrs={props}>{props.children}</MarkdownTR>;
    },
    td(props: ElementProps) {
      return <MarkdownTD attrs={props}>{props.children}</MarkdownTD>;
    },
    th(props: ElementProps) {
      return <MarkdownTH attrs={props}>{props.children}</MarkdownTH>;
    },
  };
}
