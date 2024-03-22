import {
  Button,
  Card,
  CardGrid,
  GuiderLayout,
  Hero,
} from '@neato/guider/client';

export default function LandingPage() {
  return (
    <GuiderLayout meta={{ layout: 'page' }}>
      <Hero>
        <Hero.Badge title="V1.0.0" to="/docs/guider/guides">
          Just went out of alpha!
        </Hero.Badge>
        <Hero.Title>Documentation that looks great out of the box</Hero.Title>
        <Hero.Subtitle>
          Flexible but beautiful documentation, easy to write and easier to
          extend. Exactly what you need everytime.
        </Hero.Subtitle>
        <Hero.Actions>
          <Button to="/docs/guider/guides">Get started</Button>
          <Button to="https://github.com/mrjvs/neatojs" type="secondary">
            View on GitHub
          </Button>
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
