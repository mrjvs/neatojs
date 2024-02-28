import { useContext } from 'react';
import Head from 'next/head';
import { GuiderLayoutContext } from '../../page/context';

export function LayoutHead() {
  const ctx = useContext(GuiderLayoutContext);

  const title = ctx?.meta?.title ?? ctx?.headings[0]?.value;
  const desc = ctx?.meta?.description ?? ctx?.excerpt;

  return (
    <Head>
      {title ? <title>{title}</title> : null}
      {desc ? <meta key="gd-desc" name="decription" content={desc} /> : null}
      <meta key="gd-robots" name="robots" content="index,follow" />
      <meta
        key="gd-viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
    </Head>
  );
}
