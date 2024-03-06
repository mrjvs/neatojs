import {
  Button,
  Card,
  CardGrid,
  GuiderLayout,
  Hero,
} from '@neato/guider/client';

export default function LandingPage() {
  return (
    <GuiderLayout meta={{ layout: 'page', site: 'guider' }}>
      <Hero>
        <Hero.Badge title="V1.2.3" to="/test">
          Create your own new layouts
        </Hero.Badge>
        <Hero.Title>Documentation that looks great out of the box</Hero.Title>
        <Hero.Subtitle>
          Flexible but beautiful documentation, easy to write and easier to
          extend. Exactly what you need everytime.
        </Hero.Subtitle>
        <Hero.Actions>
          <Button>Get started</Button>
          <Button type="secondary">View on github</Button>
        </Hero.Actions>
      </Hero>
      <CardGrid>
        <Card icon="mdi:cube-outline" title="Focus on writing">
          Effortlessly create beautiful documentation sites with just markdown.
        </Card>
        <Card icon="mdi:cube-outline" title="Focus on writing">
          Effortlessly create beautiful documentation sites with just markdown.
        </Card>
        <Card icon="mdi:cube-outline" title="Focus on writing">
          Effortlessly create beautiful documentation sites with just markdown.
        </Card>
      </CardGrid>
    </GuiderLayout>
  );
}
