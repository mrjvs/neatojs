import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { MarkdownProps } from './types';

export function MarkdownImage(props: MarkdownProps) {
  const router = useRouter();
  const srcInput = props.attrs.src;
  const src = srcInput?.startsWith('/') ? router.basePath + srcInput : srcInput;

  return (
    <img
      {...props.attrs}
      src={src}
      className={classNames('gd-rounded-lg', props.attrs.className)}
    />
  );
}
