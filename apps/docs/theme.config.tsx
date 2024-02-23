import {
  component,
  defineTheme,
  directory,
  group,
  link,
  seperator,
} from '@neato/guider/client';

const github = 'movie-web/movie-web';
const topNav = [
  link('Documentation', '/docs/guides'),
  link('API reference', '/api-ref'),
];

export default defineTheme([
  {
    id: 'docs',
    navigation: topNav,
    github,
    tabs: [
      link('Guides', '/docs/guides'),
      link('CLI', '/docs/cli'),
      link('Miscellaneous', '/docs/misc'),
    ],
    directories: [
      directory({
        id: 'guides',
        sidebarItems: [
          group('Introduction', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          group('Other stuff', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          seperator(),
          link('Troubleshooting', '/docs/guides/troubleshooting'),
        ],
      }),
      directory({
        id: 'cli',
        sidebarItems: [
          link('Getting started', '/docs/cli/'),
          link('CLI A', '/docs/cli/cli-a'),
          link('CLI B', '/docs/cli/cli-b'),
          component(() => (
            <div
              style={{
                backgroundColor: '#191924',
                padding: 16,
                borderRadius: 7,
              }}
            >
              Custom component
            </div>
          )),
        ],
      }),
      directory({
        id: 'misc',
        sidebarItems: [
          link('The misc', '/docs/misc/'),
          link('The cure', '/docs/misc/the-cure'),
        ],
      }),
    ],
  },
  {
    id: 'api-ref',
    navigation: topNav,
    github,
    directories: [
      directory({
        id: 'ref',
        sidebarItems: [
          link('The API reference', '/api-ref/'),
          link('Other info', '/api-ref/other'),
        ],
      }),
    ],
  },
]);
