import { defineTheme, directory, link } from '@neato/guider/theme';

export default defineTheme({
  directories: [
    directory('main', {
      sidebar: [
        link("Home", "/")
      ]
    })
  ],
});
