import type {
  GuiderConfig,
  NavItemDescriptor,
  PopulatedSiteConf,
  SiteConf,
  NavItem,
  PopulatedSiteLayout,
  SiteLayout,
  PopulatedSiteDirectory,
  SiteDirectory,
  LayoutSettings,
} from '../virtuals';
import { mergeSiteLayoutSettings } from './merge';

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

function navItemsToDescriptors(key: string, item: NavItem): NavItemDescriptor {
  const obj = typeof item === 'string' ? { title: item } : item;
  return {
    title: obj.title,
    to: key,
    items: navRecordToDescriptors(obj.items ?? {}),
    newTab: obj.newTab ?? false,
    icon: obj.icon,
  };
}

function navRecordToDescriptors(
  map: Record<string, NavItem>,
): NavItemDescriptor[] {
  return Object.entries(map).map((v) => navItemsToDescriptors(v[0], v[1]));
}

function populateLayout(
  rootSettings: LayoutSettings,
  layout: SiteLayout,
): PopulatedSiteLayout {
  return {
    id: layout.id,
    settings: mergeSiteLayoutSettings(rootSettings, layout.settings ?? {}),
  };
}

function populateDirectory(
  defaultLayout: string,
  dir: SiteDirectory,
): PopulatedSiteDirectory {
  return {
    layout: dir.layout ?? defaultLayout,
    layoutSetings: dir.layoutSetings ?? {},
    sidebarItems: navRecordToDescriptors(dir.sidebarItems ?? {}),
    title: dir.title,
  };
}

function addDefaultLayouts(layouts: SiteLayout[]): SiteLayout[] {
  const out = [...layouts];
  if (!layouts.find((v) => v.id === 'default'))
    out.push({
      id: 'default',
    });
  if (!layouts.find((v) => v.id === 'article'))
    out.push({
      id: 'article',
    });
  if (!layouts.find((v) => v.id === 'page'))
    out.push({
      id: 'page',
    });
  if (!layouts.find((v) => v.id === 'raw'))
    out.push({
      id: 'raw',
    });
  return out;
}

function populateSiteConfig(site: SiteConf): PopulatedSiteConf {
  const layouts = addDefaultLayouts(site.layouts ?? []);
  const layoutSettings = mergeSiteLayoutSettings(
    {
      colors: {
        primary: '#fff',
      },
    },
    site.layoutSettings ?? {},
  );
  const siteLayout = site.layout ?? 'default';
  return {
    layoutSettings,
    navItems: navRecordToDescriptors(site.navItems ?? {}),
    layout: siteLayout,
    directories: site.directories.map((dir) =>
      populateDirectory(siteLayout, dir),
    ),
    layouts: layouts.map((layout) => populateLayout(layoutSettings, layout)),
  };
}

export function defineTheme(obj: GuiderConfig): PopulatedSiteConf[] {
  let sites = obj;
  if (!Array.isArray(sites)) sites = [sites];

  return sites.map((site) => populateSiteConfig(site));
}
