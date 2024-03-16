import { Icon } from '../icon';
import { MarkdownHr } from './hr';
import type { MarkdownProps } from './types';

export function MarkdownFootnotes(props: MarkdownProps) {
  return (
    <section {...props.attrs} className="neato-guider-footnotes">
      <MarkdownHr attrs={{ className: '!gd-my-6' }} />
      {props.children}
    </section>
  );
}

export function MarkdownFootnoteLink(props: MarkdownProps) {
  return (
    <a
      {...props.attrs}
      className="gd-text-primary gd-translate-y-1 gd-inline-block gd-no-underline gd-font-bold hover:gd-text-primaryDark gd-transition-colors gd-duration-100"
    >
      <Icon
        inline
        icon="fluent:arrow-hook-down-left-16-filled"
        className=" gd-text-lg"
      />
    </a>
  );
}

export function MarkdownFootnoteNumber(props: MarkdownProps) {
  return (
    <a
      {...props.attrs}
      className="gd-inline-block gd-no-underline gd-font-bold gd-px-1 hover:gd-text-primaryDark gd-transition-colors gd-duration-100"
    >
      {props.children}
    </a>
  );
}
