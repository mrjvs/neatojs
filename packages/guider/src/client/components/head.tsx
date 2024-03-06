import { DefaultSeo, NextSeo } from 'next-seo';
import type { MetaTagComponent } from '../../theme';
import { useGuiderPage } from '../hooks/use-guider-page';

export function GuiderMetaComponent(props: { meta: MetaTagComponent }) {
  if (typeof props.meta === 'function') return props.meta();

  return <NextSeo {...props.meta} />;
}

export function GuiderMeta() {
  const { page, site } = useGuiderPage();

  const title = page?.meta?.title ?? page?.headings[0]?.value;
  const desc = page?.meta?.description ?? page?.excerpt;

  return (
    <>
      <DefaultSeo title={title} description={desc} />
      {site.meta ? <GuiderMetaComponent meta={site.meta} /> : null}
    </>
  );
}
