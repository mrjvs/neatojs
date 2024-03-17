import Head from 'next/head.js';
import { GuiderMeta } from '../../components/head';

export function LayoutHead() {
  return (
    <>
      <GuiderMeta />
      <Head>
        <meta
          key="gd-viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
    </>
  );
}
