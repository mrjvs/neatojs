import {
  component,
  defineTheme,
  directory,
  group,
  link,
  separator,
  site,
  type SiteComponent,
} from '@neato/guider/theme';

const siteTemplate = site('docs', {
  dropdown: [
    link('Documentation', '/docs/guides', { icon: 'fa6-solid:house' }),
    link('API reference', '/api-ref'),
  ],
  navigation: [
    link('Documentation', '/docs/guides', { icon: 'fa6-solid:house' }),
    link('API reference', '/api-ref'),
    link('Documentation', '/docs/guides', { icon: 'fa6-solid:house' }),
    link('API reference', '/api-ref'),
    separator(),
  ],
  github: 'movie-web/movie-web',
});

export default defineTheme([
  site('docs', {
    extends: [siteTemplate],
    meta: () => <></>,
    contentFooter: {
      socials: [],
      text: 'Copyright (c) 2023',
      editRepositoryBase: 'https://github.com/mrjvs/neatojs',
    },
    pageFooter: {
      text: 'Made with love <3',
    },
    directories: [
      directory('guides', {
        sidebar: [
          link('Guides', '/docs/guides/', {
            style: 'star',
            icon: 'fa6-solid:house',
          }),
          link('How to?', '/docs/guides/how-to', { style: 'star' }),
          link('GFM', '/docs/guides/github', {
            style: 'star',
            icon: 'radix-icons:github-logo',
          }),

          group('Introduction', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          group('Other stuff', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          separator(),
          link.nested('Troubleshooting', '/docs/guides/troubleshooting', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
          link.nested('Troubleshooting 2', [
            link('Guides', '/docs/guides/'),
            link('How to?', '/docs/guides/how-to'),
          ]),
        ],
        settings: {
          colors: {
            primary: '#50EA8E',
            primaryDarker: '#1BA965',
            primaryLighter: '#89FFAA',
          },
        },
      }),
      directory('cli', {
        sidebar: [
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
      directory('misc', {
        sidebar: [
          link('The misc', '/docs/misc/'),
          link('The cure', '/docs/misc/the-cure'),
        ],
      }),
    ],
  }),
  site('api-ref', {
    extends: [siteTemplate],
    directories: [
      directory('ref', {
        sidebar: [
          link('The API reference', '/api-ref/'),
          link('Other info', '/api-ref/other'),
        ],
      }),
    ],
  }),
]) satisfies SiteComponent[];
