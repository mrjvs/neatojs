import { NextSeo } from 'next-seo';
import type { MetaTagComponent } from '../../theme';
import { useGuiderPage } from '../hooks/use-guider-page';

export function GuiderMetaComponent(props: { meta: MetaTagComponent }) {
  if (typeof props.meta === 'function') return props.meta();

  return <NextSeo {...props.meta} />;
}

export function GuiderMeta() {
  const { page, site } = useGuiderPage();

  if (site.meta.length === 0) {
    const title = page?.meta?.title ?? page?.headings[0]?.value;
    const desc = page?.meta?.description ?? page?.excerpt;
    return <NextSeo title={title} description={desc} />;
  }

  // TODO default meta for titles and stuff
  // TODO pass in frontmatter and meta config
  return site.meta.map((v, i) => <GuiderMetaComponent meta={v} key={i} />);
}
