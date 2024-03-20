import { GuiderLayout } from '@neato/guider/client';
import { Showcase } from 'components/showcase-layout';
import { ShowcaseCard, ShowcaseCardContainer } from 'components/showcase-card';

type Tags = 'guider' | 'config';

interface Showcase {
  imageUrl: string;
  href: string;
  title: string;
  description: string;
  tags: Tags[];
}

const showcases: Showcase[] = [
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
        <ShowcaseCardContainer>
          {showcases.map((v) => (
            <ShowcaseCard key={v.href} showcase={v} />
          ))}
        </ShowcaseCardContainer>
      </Showcase.Container>
    </GuiderLayout>
  );
}
