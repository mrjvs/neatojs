import { useThemeColorsStore } from '../stores/colors';

export type { ThemeColorStoreColors, ThemeColorStore } from '../stores/colors';

export function useGuiderTheme() {
  const setColors = useThemeColorsStore((s) => s.setColor);
  const clearColors = useThemeColorsStore((s) => s.clearColors);
  const colors = useThemeColorsStore((s) => s.colors);

  return {
    setColors,
    clearColors,
    colors,
  };
}
