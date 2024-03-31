import type { PartialDeep } from 'type-fest';
import type { LinkComponent, NestableLinkComponent } from './link';
import type { SeparatorComponent } from './separator';
import type { CustomComponentComponent } from './component';
import type { GroupComponent, GroupComponentChildren } from './group';
import type { LayoutSettings } from './settings';
import { makeLayoutSettings } from './layout';

type DirectoryComponentChildren =
  | NestableLinkComponent
  | LinkComponent
  | SeparatorComponent
  | CustomComponentComponent
  | GroupComponent<GroupComponentChildren>;

interface DirectoryOptions {
  layout?: string;
  settings?: PartialDeep<LayoutSettings>;
  sidebar?: DirectoryComponentChildren[];
}

export interface DirectoryComponent {
  id: string;
  layout: string;
  settings: PartialDeep<LayoutSettings>;
  sidebar: DirectoryComponentChildren[];
}

export type DirectoryBuilder = (
  id: string,
  options: DirectoryOptions,
) => DirectoryComponent;

export const directory: DirectoryBuilder = function (id, ops) {
  return {
    id,
    layout: 'default',
    sidebar: ops.sidebar ?? [],
    settings: makeLayoutSettings(ops.settings ?? {}),
  };
};
