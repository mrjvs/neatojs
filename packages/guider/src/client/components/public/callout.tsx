import classNames from 'classnames';
import type { ReactNode } from 'react';

export type CalloutTypes = 'warning' | 'info' | 'error' | 'important';

export interface CalloutProps {
  type?: CalloutTypes;
  children?: ReactNode;
}

const styleMap: Record<CalloutTypes, string> = {
  error: 'gd-bg-red-400',
  important: 'gd-bg-pink-400',
  info: 'gd-bg-blue-400',
  warning: 'gd-bg-amber-400',
};

export function Callout(props: CalloutProps) {
  const type = props.type ?? 'info';
  const classes = styleMap[type];
  return (
    <div className={classNames(classes, 'gd-p-2 gd-rounded-md gd-mb-2')}>
      {props.children}
    </div>
  );
}
