import {
  Button,
  Card,
  CardGrid,
  GuiderLayout,
  Hero,
} from '@neato/guider/client';

export default function LandingPage() {
  return (
    <GuiderLayout meta={{ layout: 'page', site: 'config' }}>
      <Hero>
        <Hero.Title>Simple type-safe configuration</Hero.Title>
        <Hero.Subtitle>
          Configure your app with JSON files or environment variables without
          losing type-safety
        </Hero.Subtitle>
        <Hero.Actions>
          <Button to="/docs/config/guide/why-neat-config">Get started</Button>
          <Button to="https://github.com/mrjvs/neatojs" type="secondary">
            View on GitHub
          </Button>
        </Hero.Actions>
      </Hero>
      <CardGrid>
        <Card icon="material-symbols:lock" title="Schema-first config">
          Define your config structure using strictly typed and validated
          schemas.
        </Card>
        <Card icon="material-symbols:cloud" title="Cloud-native">
          Easily configure applications in the cloud using multiple environment
          agnostic sources.
        </Card>
        <Card icon="eos-icons:configuration-file" title="Multiple formats">
          Supports a wide range of configuration sources including JSON files,
          environment variables and CLI arguments.
        </Card>
      </CardGrid>
    </GuiderLayout>
  );
}
