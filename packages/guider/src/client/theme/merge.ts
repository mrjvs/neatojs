import type { LayoutSettings, DeepPartial } from '../types';

export function mergeSiteLayoutSettings(
  root: LayoutSettings,
  target: DeepPartial<LayoutSettings>,
): LayoutSettings {
  return {
    ...root,
    ...target,
    colors: {
      ...root.colors,
      ...target.colors,
    },
  };
}
