import type { ReactNode } from 'react';
import type { MetaConf } from '../../../theme';
import { GuiderLayoutContext, type MdxHeadings } from '../../page/context';
import { useGuider } from '../../hooks/use-guider';
import { LayoutInternal } from './layout';
import { ThemeProvider } from './theme';
import { LayoutHead } from './head';
import { LayoutBackground } from './background';

export type InternalGuiderLayoutProps = {
  children?: ReactNode;
  meta?: MetaConf;
  headings?: MdxHeadings[];
  excerpt?: string;
};

export function GuiderLayout(props: InternalGuiderLayoutProps) {
  const { settings } = useGuider(props.meta);
  const Comp = settings.pageLayoutComponent ?? LayoutInternal;
  return (
    <GuiderLayoutContext.Provider
      value={{
        meta: props.meta ?? {},
        headings: props.headings ?? [],
        excerpt: props.excerpt,
      }}
    >
      <LayoutHead />
      <LayoutBackground />
      <ThemeProvider />
      <Comp>
        <div id="guider-content">{props.children}</div>
      </Comp>
    </GuiderLayoutContext.Provider>
  );
}
