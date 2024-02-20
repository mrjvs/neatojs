import { mergeSiteLayoutSettings } from '../theme/merge';
import { sites, pageMap } from '../virtuals';

export function useGuider() {
  const site = sites[0];
  const directory = site.directories[0];
  const layoutId = directory.layout;
  const layout = site.layouts.find((v) => v.id === layoutId);
  if (!layout) throw new Error('No layout found');
  const layoutSettings = mergeSiteLayoutSettings(
    layout.settings,
    directory.layoutSetings,
  );

  return {
    pageMap,
    layoutSettings,
    directory,
    layout,
  };
}
