import type { PartialDeep } from 'type-fest';
import type { LinkComponent, NestableLinkComponent } from './link';
import type { SeperatorComponent } from './seperator';
import type { CustomComponentComponent } from './component';
import type { GroupComponent } from './group';
import type { LayoutSettings } from './settings';

type DirectoryComponentChildren =
  | NestableLinkComponent
  | LinkComponent
  | SeperatorComponent
  | CustomComponentComponent
  | GroupComponent;

interface DirectoryOptions {
  layout?: string;
  settings?: PartialDeep<LayoutSettings>;
  sidebar: DirectoryComponentChildren[];
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
    settings: {},
    layout: 'default',
    ...ops,
  };
};