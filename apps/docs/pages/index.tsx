import { Button, GuiderLayout } from '@neato/guider/client';
import { Home } from 'components/home';
import { HomeCard, HomeCardContainer } from 'components/home-card';

interface Project {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export default function LandingPage() {
  const projects: Project[] = [
    {
      title: '@neato/guider',
      description: 'Flexible documentation that looks good out of the box.',
      href: '/docs/guider',
      icon: 'ic:round-menu-book',
    },
    {
      title: '@neato/config',
      description:
        'NodeJS configuration loader with strict typing and autocomplete.',
      href: '/docs/config',
      icon: 'material-symbols:settings-heart-rounded',
    },
  ];
  return (
    <GuiderLayout meta={{ layout: 'page' }}>
      <Home.Container>
        <Home.Title>
          NeatoJS — A collection of libraries made to simplify
        </Home.Title>
        <Home.Subtitle>
          Tools that follow the philosophy of doing only one thing, and doing it
          right!
        </Home.Subtitle>
        <HomeCardContainer>
          {projects.map((v) => (
            <HomeCard.Card
              key={v.href}
              icon={v.icon}
              right={
                <Button to={v.href} type="secondary">
                  View project
                </Button>
              }
            >
              <HomeCard.Title href={v.href}>{v.title}</HomeCard.Title>
              <HomeCard.Description>{v.description}</HomeCard.Description>
            </HomeCard.Card>
          ))}
        </HomeCardContainer>
      </Home.Container>
    </GuiderLayout>
  );
}
