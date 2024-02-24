import { type ReactNode } from 'react';
import { Tab } from '@headlessui/react';

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
      <Tab.List>
        {props.items.map((v) => (
          <Tab>{v}</Tab>
        ))}
      </Tab.List>
      <Tab.Panels>{props.children}</Tab.Panels>
    </Tab.Group>
  );
};

const TabsChild = (props: TabsChildProps) => {
  return <Tab.Panel>{props.children}</Tab.Panel>;
};

export const Tabs = TabsContainer as TabsComponent;
Tabs.Tab = TabsChild;
