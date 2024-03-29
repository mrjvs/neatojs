import type { PartialDeep } from 'type-fest';
import type { ReactNode } from 'react';
import type { NextSeoProps } from 'next-seo';
import type { DirectoryComponent } from './directory';
import type { LinkComponent } from './link';
import type { CustomComponentComponent } from './component';
import type { SeparatorComponent } from './separator';
import type { LayoutSettings, PopulatedLayoutSettings } from './settings';
import {
  makeLayoutSettings,
  mergeLayoutSettings,
  mergeWithRoot,
  populateLayout,
  type SiteLayoutComponent,
  type SiteLayoutOptions,
} from './layout';
import {
  type ContentFooterComponent,
  type ContentFooterOptions,
  type PageFooterComponent,
  type PageFooterOptions,
} from './footer';
import type { GroupComponent } from './group';

export type TopNavChildren =
  | LinkComponent
  | SeparatorComponent
  | CustomComponentComponent;

export type TabsChildren = LinkComponent | CustomComponentComponent;
export type DropdownChildren = LinkComponent | GroupComponent<LinkComponent>;

export interface SiteOptions {
  navigation?: TopNavChildren[];
  extends?: SiteComponent[];
  tabs?: TabsChildren[];
  meta?: MetaTagComponent;
  dropdown?: DropdownChildren[];
  github?: string;
  layout?: string;
  logo?: {
    to?: string;
    name?: string;
  };
  settings?: PartialDeep<LayoutSettings>;
  directories?: DirectoryComponent[];
  layouts?: SiteLayoutOptions[];
  contentFooter?: ContentFooterOptions;
  pageFooter?: PageFooterOptions;
}

export type MetaTagPageMeta = {
  title?: string;
  description?: string;
};

export type MetaTagComponent =
  | ((pageMeta: MetaTagPageMeta) => ReactNode)
  | NextSeoProps;

export interface SiteComponent {
  type: 'site';
  id: string;
  navigation: TopNavChildren[];
  tabs: TabsChildren[];
  dropdown: DropdownChildren[];
  github?: string;
  logo: {
    to?: string;
    name?: string;
  };
  layout?: string;
  meta?: MetaTagComponent;
  settingOverrides: PartialDeep<PopulatedLayoutSettings>;
  settings: PopulatedLayoutSettings;
  directories: DirectoryComponent[];
  layouts: SiteLayoutComponent[];
  contentFooter?: ContentFooterComponent;
  pageFooter?: PageFooterComponent;
}

export type SiteBuilder = (id: string, options: SiteOptions) => SiteComponent;

function addDefaultLayouts(layouts: SiteLayoutOptions[]): SiteLayoutOptions[] {
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
        contentFooter: false,
      },
    });
  if (!layouts.find((v) => v.id === 'page'))
    out.push({
      id: 'page',
      settings: {
        sidebar: false,
        contentFooter: false,
        toc: false,
      },
    });
  if (!layouts.find((v) => v.id === 'raw'))
    out.push({
      id: 'raw',
      settings: {
        sidebar: false,
        contentFooter: false,
        toc: false,
        navigation: false,
        backgroundPattern: false,
        pageFooter: false,
      },
    });
  return out;
}

function mergeSites(root: SiteComponent, target: SiteComponent): SiteComponent {
  const base = { ...root }; // making a hard copy
  if (target.directories.length > 0) base.directories = target.directories;
  if (target.dropdown.length > 0) base.dropdown = target.dropdown;
  if (target.navigation.length > 0) base.navigation = target.navigation;
  if (target.tabs.length > 0) base.tabs = target.tabs;
  if (target.github) base.github = target.github;
  if (target.meta) base.meta = target.meta;
  if (target.contentFooter)
    base.contentFooter = {
      ...base.contentFooter,
      ...target.contentFooter,
    };
  if (target.pageFooter)
    base.pageFooter = {
      ...base.pageFooter,
      ...target.pageFooter,
    };

  const newSettings = mergeLayoutSettings(
    base.settings,
    target.settingOverrides,
  );
  const newLayoutIds = target.layouts.map((v) => v.id);
  const newLayouts = [
    ...base.layouts.filter((v) => !newLayoutIds.includes(v.id)),
    ...target.layouts,
  ];
  base.layouts = newLayouts.map((layout) => {
    layout.settings = mergeLayoutSettings(
      newSettings,
      layout.settingsOverrides,
    );
    return layout;
  });

  base.id = target.id;
  base.layout = target.layout;
  base.settings = newSettings;
  base.logo = {
    ...base.logo,
    ...target.logo,
  };
  return base;
}

export const site: SiteBuilder = function (id, ops) {
  const settings = mergeWithRoot(makeLayoutSettings(ops.settings ?? {}));
  const layouts = addDefaultLayouts(ops.layouts ?? []);
  const theSite: SiteComponent = {
    id,
    directories: ops.directories ?? [],
    dropdown: ops.dropdown ?? [],
    navigation: ops.navigation ?? [],
    settingOverrides: ops.settings ?? {},
    settings,
    tabs: ops.tabs ?? [],
    layouts: layouts.map((v) => populateLayout(settings, v)),
    layout: ops.layout,
    github: ops.github,
    type: 'site',
    meta: ops.meta,
    logo: ops.logo ?? {},
    contentFooter: ops.contentFooter,
    pageFooter: ops.pageFooter,
  };
  const [firstSite, ...extendables] = [...(ops.extends ?? []), theSite];
  return extendables.reduce((a, v) => mergeSites(a, v), firstSite);
};

export function siteTemplate(ops: SiteOptions) {
  return site('gd:template', ops);
}
