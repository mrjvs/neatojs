import {
  useRef,
  type ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

export interface CodeGroupProps {
  default?: number;
  children?: ReactNode;
}

export interface CodeGroupChildProps {
  title: string;
  children?: ReactNode;
}

export interface CodeGroupComponent {
  (props: CodeGroupProps): ReactNode;
  Code: (props: CodeGroupChildProps) => ReactNode;
}

const CodeGroupContainer = (props: CodeGroupProps) => {
  const panelsRef = useRef<HTMLDivElement>(null);
  const [tabs, setTabs] = useState<string[]>([]);

  const collectTabs = useCallback(() => {
    const el = panelsRef.current;
    if (!el) {
      setTabs([]);
      return;
    }
    const groups = [...el.querySelectorAll('[data-code-group-title]')];
    setTabs(
      groups
        .map((v) => v.getAttribute('data-code-group-title'))
        .filter((v): v is string => Boolean(v)),
    );
  }, [panelsRef]);

  useEffect(() => {
    const el = panelsRef.current;
    collectTabs();
    if (!el) return;

    const observer = new MutationObserver(() => {
      collectTabs();
    });
    observer.observe(el, { attributes: true, childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, [panelsRef, collectTabs]);
  return (
    <div className="gd-rounded-lg gd-overflow-hidden gd-mt-4 gd-mb-8">
      <Tab.Group>
        <Tab.List className="gd-bg-bgDark gd-grid gd-grid-cols-1 gd-whitespace-nowrap gd-text-nowrap gd-overflow-x-auto">
          <div className="gd-flex gd-flex-items-end gd-py-2">
            {tabs.map((v) => (
              <Tab key={v} className="focus:gd-outline-none">
                {({ selected }) => (
                  <div
                    className={classNames({
                      'gd-text-textLight gd-py-1 gd-mx-2 gd-px-3 gd-text-sm gd-rounded-md hover:gd-bg-bgLightest gd-transition-colors gd-duration-100':
                        true,
                      '!gd-text-textHeading !gd-bg-bgLightest': selected,
                    })}
                  >
                    {v}
                  </div>
                )}
              </Tab>
            ))}
          </div>
        </Tab.List>
        <Tab.Panels className="neato-guider-codegroup" ref={panelsRef}>
          {props.children}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const CodeGroupChild = (props: CodeGroupChildProps) => {
  return (
    <Tab.Panel
      unmount={false}
      data-code-group-title={props.title}
      className="neato-guider-codegroup-child"
    >
      {props.children}
    </Tab.Panel>
  );
};

export const CodeGroup = CodeGroupContainer as CodeGroupComponent;
CodeGroup.Code = CodeGroupChild;
