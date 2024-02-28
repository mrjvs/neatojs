import { defineTheme, directory, group, link } from '@neato/guider/theme';

const github = 'mrjvs/neatojs';
const dropdown = [
  link('Guider', '/docs/guider'),
  link('Config', '/docs/config'),
];

export default defineTheme([
  {
    id: 'guider',
    dropdown,
    github,
    tabs: [
      link('Documentation', '/docs/guider/docs'),
      link('Writing', '/docs/guider/writing'),
    ],
    directories: [
      directory({
        id: 'guider-docs',
        sidebarItems: [link('Getting started', '/docs/guider/docs')],
      }),
      directory({
        id: 'guider-writing',
        sidebarItems: [link('Getting started', '/docs/guider')],
      }),
    ],
  },
  {
    id: 'config',
    dropdown,
    github,
    directories: [
      directory({
        id: 'main',
        sidebarItems: [
          group('Guide', [
            link('Why use @neato/config', '/docs/config/guide/why-neat-config'),
            link('Installation', '/docs/config/guide/installation'),
            link('Usage', '/docs/config/guide/usage'),
            link('Basic example', '/docs/config/guide/basic-example'),
          ]),
          group('API', [
            link('Loaders', '/docs/config/api/loaders'),
            link('Schemas', '/docs/config/api/schemas'),
            link('Formatting', '/docs/config/api/formatting'),
            link('Fragments', '/docs/config/api/fragments'),
            link('Error handling', '/docs/config/api/errors'),
            link('Utilities', '/docs/config/api/utils'),
          ]),
          group('Miscellaneous', [
            link('Security', '/docs/config/misc/security'),
            link('Changelog', '/docs/config/misc/changelog'),
          ]),
        ],
      }),
    ],
  },
]);
