import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app.js';
import type { ReactElement, ReactNode } from 'react';

export type GuiderPageWithLayout = NextComponentType & {
  getLayout?: (content: ReactElement) => ReactNode;
};

export function createGuiderApp(): (props: AppProps) => ReactNode {
  return function GuiderApp(props: AppProps) {
    const Comp = props.Component as GuiderPageWithLayout;
    const getLayout = Comp.getLayout ?? ((page) => page);
    return getLayout(<Comp {...props.pageProps} />);
  };
}
