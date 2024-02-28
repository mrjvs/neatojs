import { type ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

export interface TabsProps {
  items: string[];
  default?: number;
  children?: ReactNode;
}

export interface TabsChildProps {
  children?: ReactNode;
}

export interface TabsComponent {
  (props: TabsProps): ReactNode;
  Tab: (props: TabsChildProps) => ReactNode;
}

const TabsContainer = (props: TabsProps) => {
  return (
    <Tab.Group>
      <Tab.List className="gd-border-b gd-border-line gd-pb-0 gd-space-x-3">
        {props.items.map((v) => (
          <Tab key={v} className="focus:gd-outline-none">
            {({ selected }) => (
              <div
                className={classNames({
                  'gd-inline-block gd-py-2 hover:gd-text-textLight gd-border-transparent gd-border-b -gd-mb-px gd-px-2':
                    true,
                  '!gd-text-textHeading !gd-border-primary': selected,
                })}
              >
                {v}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="gd-mt-4 gd-mb-8">{props.children}</Tab.Panels>
    </Tab.Group>
  );
};

const TabsChild = (props: TabsChildProps) => {
  return <Tab.Panel>{props.children}</Tab.Panel>;
};

export const Tabs = TabsContainer as TabsComponent;
Tabs.Tab = TabsChild;
