import type { CustomComponentComponent } from './component';
import type { LinkComponent, NestableLinkComponent } from './link';
import type { SeparatorComponent } from './separator';

export type GroupComponentChildren =
  | NestableLinkComponent
  | LinkComponent
  | SeparatorComponent
  | CustomComponentComponent;

export interface GroupOptions<T> {
  title: string;
  items: T[];
}

export interface GroupComponent<T> {
  type: 'group';
  title: string;
  items: T[];
}

export interface GroupBuilder {
  <T>(title: string, items: T[]): GroupComponent<T>;
  <T>(options: GroupOptions<T>): GroupComponent<T>;
}

export const group: GroupBuilder = (titleOrOptions: any, maybeItems?: any) => {
  if (typeof titleOrOptions !== 'string') {
    const options: GroupOptions<any> = titleOrOptions;
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
