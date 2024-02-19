import { theme } from '../virtuals';

export function useGuider() {
  const layoutId = theme.defaultLayout;
  const layouts = Array.isArray(theme.layout) ? theme.layout : [theme.layout];

  const currentLayout = layouts.find((v) => v.id === layoutId) ?? layouts[0];

  return {
    layout: currentLayout,
    theme,
  };
}
