import { defineTheme, directory, link, site } from '@neato/guider/theme';

export default defineTheme(
  site('main', {
  directories: [
    directory('main', {
      sidebar: [
        link("Home", "/")
      ]
    })
  ],
}));
