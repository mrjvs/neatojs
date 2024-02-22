import { defineTheme } from '@neato/guider/client';

const github = 'movie-web/movie-web';
const topNav = {
  '/docs/guides': 'Documentation',
  '/api-ref': 'Api reference',
};

export default defineTheme([
  {
    id: 'docs',
    navigation: topNav,
    github,
    tabs: {
      '/docs/guides': 'Guides',
      '/docs/cli': 'CLI',
      '/docs/misc': 'Miscellaneous',
    },
    directories: [
      {
        id: 'guides',
        title: 'Guides',
        sidebarItems: {
          '#intro': { type: 'group', title: 'Introduction' },
          '/docs/guides/': 'Guides',
          '/docs/guides/how-to': 'How to?',
          '#other': { type: 'group', title: 'Other stuff' },
          '#/docs/guides/': 'Guides',
          '##/docs/guides/how-to': 'How to?',
          '--': { type: 'seperator' },
          '/docs/guides/troubleshooting': 'Troubleshooting',
        },
      },
      {
        id: 'cli',
        title: 'CLI',
        sidebarItems: {
          '/docs/cli/': 'Getting started',
          '/docs/cli/cli-a': 'CLI A',
          '/docs/cli/cli-b': 'CLI B',
          '#card': {
            type: 'component',
            component() {
              return (
                <div
                  style={{
                    backgroundColor: '#191924',
                    padding: 16,
                    borderRadius: 7,
                  }}
                >
                  Custom component
                </div>
              );
            },
          },
        },
      },
      {
        id: 'misc',
        title: 'Miscellaneous',
        sidebarItems: {
          '/docs/misc/': 'The misc',
          '/docs/misc/the-cure': 'The cure',
        },
      },
    ],
  },
  {
    id: 'api-ref',
    navigation: topNav,
    github,
    directories: [
      {
        id: 'ref',
        title: 'Api reference',
        sidebarItems: {
          '/api-ref/': 'The API reference',
          '/api-ref/other': 'Other info',
        },
      },
    ],
  },
]);
