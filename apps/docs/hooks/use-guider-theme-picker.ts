import type { ThemeColorStoreColors } from '@neato/guider/client';
import { useGuiderTheme } from '@neato/guider/client';
import { useCallback, useEffect, useState } from 'react';
import type { HsbColor } from './color-select';
import { hsbToColorToString } from './color-select';

function makeColors(c: [HsbColor, HsbColor]): ThemeColorStoreColors {
  return {
    primary: hsbToColorToString(c[0]),
    background: hsbToColorToString(c[1]),
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
