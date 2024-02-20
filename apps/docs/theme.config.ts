import { defineTheme } from '@neato/guider/client';

export default defineTheme({
  directories: [
    {
      title: 'Directory title',
      sidebarItems: {
        '/a': 'Page A',
        '/b': 'Page B',
      },
    },
  ],
});
