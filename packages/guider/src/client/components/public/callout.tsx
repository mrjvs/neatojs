import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Icon } from '../icon';

export type CalloutTypes = 'warning' | 'note' | 'caution' | 'important' | 'tip';

export interface SpecificCalloutProps {
  children?: ReactNode;
}

export interface CalloutProps extends SpecificCalloutProps {
  type?: CalloutTypes;
}

const styleMap: Record<CalloutTypes, string> = {
  caution:
    'gd-bg-semanticCaution gd-border-semanticCaution gd-text-semanticCautionLighter',
  important:
    'gd-bg-semanticImportant gd-border-semanticImportant gd-text-semanticImportantLighter',
  tip: 'gd-bg-semanticTip gd-border-semanticTip gd-text-semanticTipLighter',
  note: 'gd-bg-semanticNote gd-border-semanticNote gd-text-semanticNoteLighter',
  warning:
    'gd-bg-semanticWarning gd-border-semanticWarning gd-text-semanticWarningLighter',
};

const iconStyleMap: Record<CalloutTypes, string> = {
  caution: 'gd-text-semanticCaution',
  important: 'gd-text-semanticImportant',
  tip: 'gd-text-semanticTip',
  note: 'gd-text-semanticNote',
  warning: 'gd-text-semanticWarning',
};

const iconMap: Record<CalloutTypes, string> = {
  caution: 'ph:warning-octagon',
  important: 'ph:chat-centered-text',
  tip: 'ph:lightbulb',
  note: 'ph:info',
  warning: 'ph:warning',
};

export function Callout(props: CalloutProps) {
  const type = props.type ?? 'note';
  const classes = styleMap[type];
  const iconClasses = iconStyleMap[type];
  return (
    <div
      className={classNames(
        classes,
        'gd-p-4 gd-rounded-md gd-my-6 gd-text-sm gd-bg-opacity-[7%] gd-border gd-border-opacity-50',
        'gd-flex',
      )}
    >
      <div
        className={classNames(
          iconClasses,
          'gd-text-lg gd-flex items-center gd-mr-3',
        )}
      >
        <Icon icon={iconMap[type]} />
      </div>
      <div className="gd-flex-1 neato-guider-callout-child">
        {props.children}
      </div>
    </div>
  );
}

export function Tip(props: SpecificCalloutProps) {
  return <Callout type="tip">{props.children}</Callout>;
}

export function Note(props: SpecificCalloutProps) {
  return <Callout type="note">{props.children}</Callout>;
}

export function Important(props: SpecificCalloutProps) {
  return <Callout type="important">{props.children}</Callout>;
}

export function Warning(props: SpecificCalloutProps) {
  return <Callout type="warning">{props.children}</Callout>;
}

export function Caution(props: SpecificCalloutProps) {
  return <Callout type="caution">{props.children}</Callout>;
}
