import classNames from 'classnames';
import Image from 'next/image';
import type { MarkdownProps } from './types';

export function MarkdownImage(props: MarkdownProps) {
  return (
    <Image
      {...props.attrs}
      src={props.attrs.src}
      alt={props.attrs.alt}
      className={classNames('gd-rounded-sm', props.attrs.className)}
    />
  );
}
