import type {
  LinkComponent,
  NestableLinkComponent,
  SeperatorComponent,
  GroupComponent,
  CustomComponentComponent,
} from 'src/theme';

export type KeyableComponets =
  | LinkComponent
  | NestableLinkComponent
  | SeperatorComponent
  | CustomComponentComponent
  | GroupComponent<any>;

export function makeKey(index: number, item: KeyableComponets): string {
  const link =
    item.type === 'link' || item.type === 'nested-link' ? item.to ?? '#' : '#';
  return `${index}-${link}-${item.type}`;
}
