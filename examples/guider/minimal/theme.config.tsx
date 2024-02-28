import { defineTheme, directory, link } from '@neato/guider/theme';

export default defineTheme({
  id: "main",
  directories: [
    directory({
      id: "main",
      sidebarItems: [
        link("Home", "/")
      ]
    })
  ],
});
