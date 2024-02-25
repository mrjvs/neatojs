import type { ReactNode } from 'react';
import type { MetaConf } from '../../types';
import { GuiderLayoutContext, type MdxHeadings } from '../../page/context';
import { LayoutInternal } from './layout';
import { ThemeProvider } from './theme';
import { LayoutHead } from './head';

export type InternalGuiderLayoutProps = {
  children?: ReactNode;
  meta?: MetaConf;
  headings?: MdxHeadings[];
  excerpt?: string;
};

export function GuiderLayout(props: InternalGuiderLayoutProps) {
  return (
    <GuiderLayoutContext.Provider
      value={{
        meta: props.meta ?? {},
        headings: props.headings ?? [],
        excerpt: props.excerpt,
      }}
    >
      <LayoutHead />
      <ThemeProvider />
      <LayoutInternal {...props} />
    </GuiderLayoutContext.Provider>
  );
}
