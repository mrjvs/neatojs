import { type ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useLocalStorage } from '../../hooks/use-localstorage';

export interface TabsProps {
  items: string[];
  storageKey?: string;
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
  const [activeTab, setActiveTab] = useLocalStorage(
    props.default ?? 0,
    props.storageKey,
  );
  return (
    <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
      <Tab.List className="gd-relative">
        <div className="gd-grid gd-grid-cols-1 gd-whitespace-nowrap gd-text-nowrap gd-overflow-x-auto">
          <div className="gd-flex gd-flex-items-end">
            <div className="gd-absolute gd-inset-x-0 gd-bottom-px gd-border-b gd-border-line" />
            {props.items.map((v) => (
              <Tab key={v} className="focus:gd-outline-none">
                {({ selected }) => (
                  <div
                    className={classNames({
                      'gd-inline-block gd-relative gd-z-10 gd-py-2 gd-mx-1.5 hover:gd-text-textLight gd-border-transparent gd-border-b gd-mb-px gd-px-2':
                        true,
                      '!gd-text-textHeading !gd-border-primary': selected,
                    })}
                  >
                    {v}
                  </div>
                )}
              </Tab>
            ))}
          </div>
        </div>
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
