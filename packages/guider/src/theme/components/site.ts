import type { PartialDeep } from 'type-fest';
import type { DirectoryComponent } from './directory';
import type { LinkComponent } from './link';
import type { CustomComponentComponent } from './component';
import type { SeperatorComponent } from './seperator';
import type { LayoutSettings } from './settings';
import {
  mergeLayoutSettings,
  mergeWithRoot,
  populateLayout,
  type SiteLayoutComponent,
  type SiteLayoutOptions,
} from './layout';
import {
  populateContentFooter,
  type ContentFooterComponent,
  type ContentFooterOptions,
  type PageFooterComponent,
  type PageFooterOptions,
} from './footer';

export type TopNavChildren =
  | LinkComponent
  | SeperatorComponent
  | CustomComponentComponent;

export type TabsChildren = LinkComponent | CustomComponentComponent;
export type DropdownChildren = LinkComponent;

export interface SiteOptions {
  navigation?: TopNavChildren[];
  extends?: SiteComponent[];
  tabs?: TabsChildren[];
  meta?: any; // TODO
  dropdown?: DropdownChildren[];
  github?: string;
  layout?: string;
  settings?: PartialDeep<LayoutSettings>;
  directories?: DirectoryComponent[];
  layouts?: SiteLayoutOptions[];
  contentFooter?: ContentFooterOptions;
  pageFooter?: PageFooterOptions;
}

export interface SiteComponent {
  type: 'site';
  id: string;
  navigation: TopNavChildren[];
  tabs: TabsChildren[];
  dropdown: DropdownChildren[];
  github?: string;
  layout: string;
  meta?: any; // TODO add meta tags
  settings: PartialDeep<LayoutSettings>;
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

// TODO add custom layout component support
// TODO merge correctly

function mergeSites(root: SiteComponent, target: SiteComponent): SiteComponent {
  const base = root;
  if (target.directories.length > 0) base.directories = target.directories;
  if (target.dropdown.length > 0) base.dropdown = target.dropdown;
  if (target.navigation.length > 0) base.navigation = target.navigation;
  if (target.tabs.length > 0) base.tabs = target.tabs;
  if (target.github) base.github = target.github;
  base.layouts = [...base.layouts, ...target.layouts];
  base.id = target.id;
  base.layout = target.layout;
  base.settings = mergeLayoutSettings(
    mergeWithRoot(base.settings ?? {}),
    target.settings,
  );
  // TODO contentFooter, pageFooter, meta, layout (default)
  return base;
}

export const site: SiteBuilder = function (id, ops) {
  const settings = mergeWithRoot(ops.settings ?? {});
  const layouts = addDefaultLayouts(ops.layouts ?? []);
  const theSite: SiteComponent = {
    id,
    directories: ops.directories ?? [],
    dropdown: ops.dropdown ?? [],
    navigation: ops.navigation ?? [],
    settings,
    tabs: ops.tabs ?? [],
    layouts: layouts.map((v) => populateLayout(settings, v)),
    layout: ops.layout ?? 'default',
    github: ops.github,
    type: 'site',
    meta: ops.meta,
    contentFooter: ops.contentFooter
      ? populateContentFooter(ops.contentFooter)
      : undefined,
    pageFooter: ops.pageFooter,
  };
  const [firstSite, ...extendables] = [...(ops.extends ?? []), theSite];
  return extendables.reduce((a, v) => mergeSites(a, v), firstSite);
};
