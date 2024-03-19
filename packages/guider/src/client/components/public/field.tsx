import { Disclosure, Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import { Icon } from '../icon';

export interface FieldProps {
  type?: string;
  required?: boolean;
  title?: string;
  children?: ReactNode;
}

export interface FieldPropertiesProps {
  text?:
    | string
    | {
        show?: string;
        hide?: string;
      };
  defaultOpen?: boolean;
  children?: ReactNode;
}

function FieldFunc(props: FieldProps) {
  return (
    <div className="neato-guider-field gd-py-5">
      <h3 className="gd-space-x-2 gd-mb-4">
        <span className="gd-text-textHeading">{props.title}</span>
        {props.type ? (
          <span className="gd-text-text gd-text-sm gd-text-opacity-75">
            {props.type}
          </span>
        ) : null}
        {props.required ? (
          <span className="gd-text-primary gd-text-sm">required</span>
        ) : null}
      </h3>
      {props.children}
    </div>
  );
}

function Properties(props: FieldPropertiesProps) {
  const texts =
    typeof props.text === 'string'
      ? { hide: props.text, show: props.text }
      : props.text;
  const showText = texts?.show ?? 'Show properties';
  const hideText = texts?.hide ?? 'Hide properties';
  return (
    <Disclosure as="div" className="gd-my-4" defaultOpen={props.defaultOpen}>
      {({ open }) => (
        <div
          className={classNames(
            'gd-border gd-rounded-2xl gd-inline-flex gd-overflow-hidden gd-flex-col gd-border-line',
            {
              '!gd-flex': open,
            },
          )}
        >
          <Disclosure.Button className="gd-relative gd-transition-[color] gd-duration-100 gd-text-text gd-text-sm hover:gd-text-textHeading">
            <div className="gd-flex gd-items-center gd-py-2 gd-px-4 gd-space-x-2">
              <Icon
                icon="mingcute:close-fill"
                inline
                className={
                  open
                    ? 'gd-transition-[color,transform]'
                    : 'gd-transition-[color,transform] gd-rotate-45'
                }
              />
              <span>{open ? hideText : showText}</span>
            </div>
          </Disclosure.Button>
          <Transition
            enter="gd-transition-transform gd-transform gd-duration-[50ms] gd-ease-out"
            enterFrom="-gd-translate-y-5 gd-opacity-0"
            enterTo="gd-opacity-100 gd-translate-y-0"
            leave="gd-transition-transform gd-transform gd-duration-[50ms] gd-ease-out"
            leaveFrom="gd-opacity-100 gd-translate-y-0"
            leaveTo="-gd-translate-y-5 gd-opacity-0"
          >
            <Disclosure.Panel className="gd-relative">
              <hr
                className={classNames({
                  'gd-h-px gd-bg-line gd-border-none gd-inset-x-0 gd-absolute gd-transition-opacity gd-duration-100 gd-top-0 gd-opacity-0':
                    true,
                  '!gd-opacity-100': open,
                })}
              />
              <div className="gd-px-4 neato-guider-field-props-children">
                {props.children}
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}

export interface FieldComponent {
  (props: FieldProps): ReactNode;
  Properties: (props: FieldPropertiesProps) => ReactNode;
}

export const Field = FieldFunc as FieldComponent;
Field.Properties = Properties;
