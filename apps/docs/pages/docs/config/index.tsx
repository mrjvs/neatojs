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
        <Hero.Title>Simple type-safe configuration</Hero.Title>
        <Hero.Subtitle>
          Configure with json files or environment variables, without losing
          type-safety
        </Hero.Subtitle>
        <Hero.Actions>
          <Button to="/docs/config/guide/why-neat-config">Get started</Button>
          <Button to="https://github.com/mrjvs/neatojs" type="secondary">
            View on github
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
