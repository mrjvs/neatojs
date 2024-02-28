import { useCallback, useRef, useState } from 'react';
import { Icon } from '../icon';
import type { MarkdownProps } from './types';

function useCopy() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);
  const copy = useCallback((contents: string) => {
    navigator.clipboard
      .writeText(contents)
      .then(() => {
        setCopied(true);
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console -- need to do something with the error :P
        console.error('Failed to copy to clipboard', err);
      });
  }, []);

  return { copied, copy };
}

export function CopyButton(props: { copied?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="gd-rounded neato-guider-copy gd-text-text gd-text-opacity-50 hover:gd-bg-text hover:gd-text-white hover:gd-text-opacity-100 hover:gd-bg-opacity-25 gd-text-lg gd-size-8 gd-flex gd-items-center gd-justify-center active:gd-scale-110 gd-transition-[transform,background-color,opacity,color] gd-duration-150"
    >
      {props.copied ? (
        <Icon icon="ph:check-bold" className="gd-text-semanticTipLighter" />
      ) : (
        <Icon icon="mingcute:copy-2-fill" />
      )}
    </button>
  );
}

export function MarkdownCodeBlock(props: MarkdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { copy, copied } = useCopy();
  const copyCode = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const code = el.querySelector('code');
    if (!code) return;
    copy(code.innerText);
  }, [copy]);

  if (props.attrs['data-theme']) return props.children;

  return (
    <figure className="neato-guider-codeblock" ref={ref} {...props.attrs}>
      <CopyButton copied={copied} onClick={copyCode} />
      {props.children}
    </figure>
  );
}
