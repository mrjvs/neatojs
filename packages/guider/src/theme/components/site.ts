import type { DirectoryComponent } from './directory';
import type { LinkComponent } from './link';
import type { CustomComponentComponent } from './component';
import type { SeperatorComponent } from './seperator';
import type { DeepPartial, LayoutSettings } from './settings';
import {
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
  settings?: DeepPartial<LayoutSettings>;
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
  meta?: any; // TODO
  settings: DeepPartial<LayoutSettings>;
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

// TODO make extending work

export const site: SiteBuilder = function (id, ops) {
  const settings = mergeWithRoot(ops.settings ?? {});
  const layouts = addDefaultLayouts(ops.layouts ?? []);
  return {
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
};
