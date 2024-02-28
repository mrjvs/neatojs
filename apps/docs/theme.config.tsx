import { defineTheme, directory, link } from '@neato/guider/theme';

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
]);
