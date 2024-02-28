import type {
  GuiderConfig,
  PopulatedSiteConf,
  SiteConf,
  PopulatedSiteLayout,
  SiteLayout,
  LayoutSettings,
} from '../types';
import { mergeSiteLayoutSettings } from './merge';

function populateLayout(
  rootSettings: LayoutSettings,
  layout: SiteLayout,
): PopulatedSiteLayout {
  return {
    id: layout.id,
    settings: mergeSiteLayoutSettings(rootSettings, layout.settings ?? {}),
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
      settings: {
        toc: false,
      },
    });
  if (!layouts.find((v) => v.id === 'page'))
    out.push({
      id: 'page',
      settings: {
        sidebar: false,
        toc: false,
      },
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
        primary: '#50A0EA',
        primaryDarker: '#1B65A9',
        primaryLighter: '#89C6FF',
        text: '#4A7181',
        textLighter: '#789CAB',
        textHighlight: '#FFFFFF',
        background: '#050F13',
        backgroundLighter: '#07171C',
        backgroundLightest: '#081E24',
      },
      sidebar: true,
      toc: true,
    },
    site.layoutSettings ?? {},
  );
  const siteLayout = site.layout ?? 'default';
  if (site.directories.length === 0)
    throw new Error('Site may not have an empty directory list');
  return {
    id: site.id,
    layoutSettings,
    navigation: site.navigation ?? [],
    dropdown: site.dropdown ?? [],
    tabs: site.tabs ?? [],
    github: site.github,
    layout: siteLayout,
    directories: site.directories,
    layouts: layouts.map((layout) => populateLayout(layoutSettings, layout)),
  };
}

export function defineTheme(obj: GuiderConfig): PopulatedSiteConf[] {
  let sites = obj;
  if (!Array.isArray(sites)) sites = [sites];

  if (sites.length === 0) throw new Error('Site list may not be empty');
  return sites.map((site) => populateSiteConfig(site));
}
