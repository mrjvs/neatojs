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
} from '../types';
import { mergeSiteLayoutSettings } from './merge';

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
  if (site.directories.length === 0)
    throw new Error('Site may not have an empty directory list');
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

  if (sites.length === 0) throw new Error('Site list may not be empty');
  return sites.map((site) => populateSiteConfig(site));
}
