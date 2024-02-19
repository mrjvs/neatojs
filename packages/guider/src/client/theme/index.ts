import type { GuiderThemeConfig } from '../virtuals';

/*
config requirements:
- customize entire layout as a whole
- use a preset layout with settings:
  - custom color theme
  - disable darkmode toggle
  - primary navigation items
  - sidebar navigation items
  - disable table of contents
- change core parts of a layout:
  - navigation bar
  - footer
  - sidebar
  - navigation items
- all layouts settings:
  - default components for mdx
  - extra global components for mdx
  - extra icons
- default presets:
  - default - topnav + sidebar + toc
  - article - topnav + toc
  - page - topnav
  - raw - empty slate
- navigation item settings:
  - internal links or external links
  - open in new tab or replace (replace by default)
  - specify optional icon
  - nested navigation items (collapsable in sidebar, dropdown on topnav)
  - make it a seperator (not an actual item, just a seperator)
  - make it a special highlighted link (like at the top of tailwind doc sidebar)
*/

export function defineTheme(obj: GuiderThemeConfig) {
  return obj;
}
