import type { ThemeColorStoreColors } from '@neato/guider/client';
import { useGuiderTheme } from '@neato/guider/client';
import { useCallback, useEffect, useState } from 'react';
import Color from 'color';
import type { HsbColor } from './color-select';
import { hsbToColorToString } from './color-select';

function addConstrast(c: Color, ratio: number): Color {
  if (c.isDark()) return c.lighten(ratio);
  return c.darken(ratio);
}

function addReverseContrast(c: Color, ratio: number): Color {
  if (c.isDark()) return c.darken(ratio);
  return c.lighten(ratio);
}

export function makeColors(c: [HsbColor, HsbColor]): ThemeColorStoreColors {
  const primary = Color(hsbToColorToString(c[0]));
  const bg = Color(hsbToColorToString(c[1]));
  return {
    primary: primary.hex(),
    primaryLighter: addReverseContrast(primary, 0.3).hex(),
    primaryDarker: addConstrast(primary, 0.3).hex(),
    background: bg.hex(),
    backgroundLighter: addConstrast(bg, 0.2).hex(),
    backgroundLightest: addConstrast(bg, 0.4).hex(),
    backgroundDarker: addReverseContrast(bg, 0.2).hex(),
    line: addConstrast(bg, 0.6).hex(),
    text: addConstrast(bg, 0.85).hex(),
    textLighter: addConstrast(bg, 0.9).hex(),
    textHighlight: bg.isDark() ? '#fff' : '#000',
  };
}

export function useGuideThemePicker() {
  const theme = useGuiderTheme();
  const [colors, setColors] = useState<[HsbColor, HsbColor]>([
    [259, 0.5, 1],
    [197, 0.74, 0.07],
  ]);
  const colorSetReal = useCallback((c: [HsbColor, HsbColor]) => {
    theme.setColors(makeColors(c));
    setColors(c);
  }, []);

  // clear after unload
  useEffect(() => {
    return () => {
      theme.clearColors();
    };
  }, []);

  return [colors, colorSetReal] as const;
}
