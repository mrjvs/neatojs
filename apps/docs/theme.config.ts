import { defineTheme } from '@neato/guider/client';

export default defineTheme({
  id: 's1',
  directories: [
    {
      title: 'Directory title',
      id: 'd1',
      sidebarItems: {
        '/': 'Homepage',
        '/a': 'Page A',
        '/b': 'Page B',
      },
    },
  ],
});
