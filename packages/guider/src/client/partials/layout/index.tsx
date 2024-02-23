import type { ReactNode } from 'react';
import type { MetaConf } from '../../types';
import { GuiderLayoutContext, type MdxHeadings } from '../../page/context';
import { LayoutInternal } from './layout';

export type InternalGuiderLayoutProps = {
  children?: ReactNode;
  meta?: MetaConf;
  headings?: MdxHeadings[];
};

export function GuiderLayout(props: InternalGuiderLayoutProps) {
  return (
    <GuiderLayoutContext.Provider
      value={{ meta: props.meta ?? {}, headings: props.headings ?? [] }}
    >
      <LayoutInternal {...props} />
    </GuiderLayoutContext.Provider>
  );
}
