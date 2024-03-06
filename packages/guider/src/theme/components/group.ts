import type { CustomComponentComponent } from './component';
import type { LinkComponent, NestableLinkComponent } from './link';
import type { SeperatorComponent } from './seperator';

export type GroupComponentChildren =
  | NestableLinkComponent
  | LinkComponent
  | SeperatorComponent
  | CustomComponentComponent;

export interface GroupOptions {
  title: string;
  items: GroupComponentChildren[];
}

export interface GroupComponent {
  type: 'group';
  title: string;
  items: GroupComponentChildren[];
}

export interface GroupBuilder {
  (title: string, items: GroupComponentChildren[]): GroupComponent;
  (options: GroupOptions): GroupComponent;
}

export const group: GroupBuilder = (titleOrOptions: any, maybeItems?: any) => {
  if (typeof titleOrOptions !== 'string') {
    const options: GroupOptions = titleOrOptions;
    return {
      ...options,
      type: 'group',
    };
  }

  const items: GroupComponentChildren[] = maybeItems;
  return {
    title: titleOrOptions,
    type: 'group',
    items,
  };
};
