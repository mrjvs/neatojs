import { defineTheme } from '@neato/guider/client';

export default defineTheme({
  defaultLayout: 'main',
  layout: {
    id: 'main',
    sidebar: {
      '/a': 'Page A',
      '/b': 'Page B',
      github: {
        title: 'Github',
        to: 'https://github.com',
        newTab: true,
      },
    },
  },
});
