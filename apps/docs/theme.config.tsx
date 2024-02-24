import {
  component,
  defineTheme,
  directory,
  group,
  link,
  seperator,
} from '@neato/guider/theme';

const github = 'movie-web/movie-web';
const topNav = [
  link('Documentation', '/docs/guides', { icon: 'fas:house' }),
  link('API reference', '/api-ref'),
  seperator(),
];

export default defineTheme([
  {
    id: 'docs',
    navigation: topNav,
    github,
    tabs: [
      link('Guides', '/docs/guides', { icon: 'fas:house' }),
      link('CLI', '/docs/cli'),
      link('Miscellaneous', '/docs/misc'),
    ],
    directories: [
      directory({
        id: 'guides',
        sidebarItems: [
          link('Guides', '/docs/guides/', { style: 'star', icon: 'fas:house' }),
          link('How to?', '/docs/guides/how-to', { style: 'star' }),
          link('GFM', '/docs/guides/github', {
            style: 'star',
            icon: 'fab:github',
          }),

          group('Introduction', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          group('Other stuff', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          seperator(),
          link.nested('Troubleshooting', '/docs/guides/troubleshooting', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
        ],
      }),
      directory({
        id: 'cli',
        sidebarItems: [
          link('Getting started', '/docs/cli/'),
          link('CLI A', '/docs/cli/cli-a'),
          link('CLI B', '/docs/cli/cli-b'),
          link('David Tennant', '/docs/cli/tennant'),
          component(() => (
            <div
              style={{
                backgroundColor: '#000',
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
