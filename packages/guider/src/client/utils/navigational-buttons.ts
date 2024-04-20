import type {
  DirectoryComponent,
  LinkComponent,
  NestableLinkComponent,
} from 'src/theme';
import { isRouteAtive } from '../components/utils/activelink';

type SidebarLink = LinkComponent | NestableLinkComponent;
type WrappedSidebarLink = {
  item: SidebarLink;
  group?: string;
};
type DeepArray<T> = DeepArray<T>[] | T;

function wrapLink(item: SidebarLink, group?: string): WrappedSidebarLink {
  return {
    group,
    item,
  };
}

function flattenSidebar(items: DirectoryComponent['sidebar'], group?: string) {
  return items
    .map((item): DeepArray<WrappedSidebarLink> => {
      if (item.type === 'link') return wrapLink(item, group);
      if (item.type === 'group') return flattenSidebar(item.items, item.title);
      if (item.type === 'nested-link' && item.to)
        return [wrapLink(item, group), ...flattenSidebar(item.items, group)];
      if (item.type === 'nested-link' && !item.to)
        return flattenSidebar(item.items, group);
      return [];
    })
    .filter((v) => {
      if (Array.isArray(v)) return true;
      if (v.item.type === 'link' || v.item.type === 'nested-link') return true;
      return false;
    });
}

export function getCurrentPageContext(
  pagePathName: string,
  dir: DirectoryComponent,
) {
  const navMap = flattenSidebar(dir.sidebar).flat(4) as WrappedSidebarLink[];

  for (let i = 0; i < navMap.length; i++) {
    const item = navMap[i];
    const isActive = isRouteAtive(
      item.item.to ?? '/',
      pagePathName,
      item.item.exact ?? false,
    );
    if (!isActive) continue;

    return {
      prev: i > 0 ? navMap[i - 1] : null,
      current: item,
      next: i + 1 < navMap.length ? navMap[i + 1] : null,
    };
  }

  return {
    prev: null,
    current: null,
    next: null,
  };
}
