import { GuiderLayout } from '@neato/guider/client';
import { useMemo, useState } from 'react';
import { Showcase } from 'components/showcase-layout';
import type { ShowcaseTag, ShowcaseType } from 'components/showcase-card';
import { ShowcaseCard, ShowcaseCardContainer } from 'components/showcase-card';

const showcases: ShowcaseType[] = [
  {
    title: 'Pretendo',
    description: 'Uses Guider for protocol documentation.',
    href: 'https://developer.pretendo.network/',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['guider'],
  },
  {
    title: 'movie-web docs',
    description: 'Uses Guider for self-hosting documentation.',
    href: 'https://movie-web.github.io/docs/',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['guider'],
  },
  {
    title: 'movie-web account',
    description: 'Uses Config for their account service.',
    href: 'https://github.com/movie-web/movie-web/',
    imageUrl: 'https://placehold.co/600x400',
    tags: ['config'],
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
          NeatoJS can make your life easier — it has for them!
        </Showcase.Title>
        <Showcase.Subtitle>
          Below you can find out who uses NeatoJS, inspire yourself and figure
          out how we can best be of service.
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
