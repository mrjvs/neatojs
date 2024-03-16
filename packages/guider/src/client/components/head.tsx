import { NextSeo } from 'next-seo';
import type { MetaTagComponent } from '../../theme';
import { useGuiderPage } from '../hooks/use-guider-page';

type PageMeta = {
  title?: string;
  description?: string;
};

export function GuiderMetaComponent(props: {
  meta: MetaTagComponent;
  pageMeta: PageMeta;
}) {
  if (typeof props.meta === 'function') return props.meta(props.pageMeta);

  return (
    <NextSeo
      title={props.pageMeta?.title}
      description={props.pageMeta?.description}
      {...props.meta}
    />
  );
}

export function GuiderMeta() {
  const { page, site } = useGuiderPage();

  const pageMeta = {
    title: page?.meta?.title ?? page?.headings[0]?.value,
    description: page?.meta?.description ?? page?.excerpt,
  };

  return (
    <GuiderMetaComponent meta={site.meta ?? pageMeta} pageMeta={pageMeta} />
  );
}
