import { GuiderLayout } from '@neato/guider/client';
import { useMemo, useState } from 'react';
import { Showcase } from 'components/showcase-layout';
import type { ShowcaseTag, ShowcaseType } from 'components/showcase-card';
import { ShowcaseCard, ShowcaseCardContainer } from 'components/showcase-card';
import pretendoImg from 'public/showcases/pretendo.png';
import mwAccountImg from 'public/showcases/movie-web-account.png';
import mwDocsImg from 'public/showcases/movie-web-docs.png';

const showcases: ShowcaseType[] = [
  {
    title: 'Pretendo',
    description: 'Uses Guider to document their protocols and libaries.',
    href: 'https://developer.pretendo.network/',
    imageUrl: pretendoImg.src,
    tags: ['guider'],
  },
  {
    title: 'movie-web backend',
    description: 'Uses Config for their account service.',
    href: 'https://github.com/movie-web/backend/',
    imageUrl: mwAccountImg.src,
    tags: ['config'],
  },
  {
    title: 'movie-web docs',
    description: 'Uses Guider for their documentation',
    href: 'https://github.com/movie-web/docs/',
    imageUrl: mwDocsImg.src,
    tags: ['guider'],
  },
];

export default function ShowcasePage() {
  const [filter, setFilter] = useState<null | ShowcaseTag>(null);
  const filtered = useMemo(() => {
    if (filter === null) return showcases;
    return showcases.filter((v) => v.tags.includes(filter));
  }, [filter]);

  return (
    <GuiderLayout meta={{ layout: 'page' }}>
      <Showcase.Container>
        <Showcase.Tag>Showcase</Showcase.Tag>
        <Showcase.Title>
          NeatoJS increases your development speed — it has for them!
        </Showcase.Title>
        <Showcase.Subtitle>
          Below you can find out who uses NeatoJS, inspire yourself and figure
          out how NeatoJS can work best for you!
        </Showcase.Subtitle>
        <ShowcaseCardContainer selected={filter} onSelect={setFilter}>
          {filtered.map((v) => (
            <ShowcaseCard key={v.href} showcase={v} />
          ))}
        </ShowcaseCardContainer>
      </Showcase.Container>
    </GuiderLayout>
  );
}
