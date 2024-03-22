import type { ThemeColorStoreColors } from '@neato/guider/client';
import { useGuiderTheme } from '@neato/guider/client';
import { useCallback, useEffect, useState } from 'react';
import Color from 'color';
import type { HsbColor } from './color-select';
import { hsbToColorToString } from './color-select';

const clamp = (max: number, min: number, n: number) =>
  Math.max(min, Math.min(max, n));

function getContrastPoint(color: Color): [number, number] {
  if (color.isDark()) return [100, 0];
  return [0, 100];
}

function getDistanceToContrastPoint(bgColor: Color, color: Color): number {
  const contrastPoint = getContrastPoint(bgColor);
  return Math.sqrt(
    Math.pow(contrastPoint[0] - color.value(), 2) +
      Math.pow(contrastPoint[1] - color.saturationl(), 2),
  );
}

function moveColorToContrastPoint(
  bgColor: Color,
  color: Color,
  amount: number,
): Color {
  const contrastPoint = getContrastPoint(bgColor);
  const length = getDistanceToContrastPoint(bgColor, color);
  const ratio = amount / length;
  const currentPoint = [color.value(), color.saturationl()];
  const newX = currentPoint[0] + (contrastPoint[0] - currentPoint[0]) * ratio;
  const newY = currentPoint[1] + (contrastPoint[1] - currentPoint[1]) * ratio;
  return color.value(clamp(100, 0, newX)).saturationl(clamp(100, 0, newY));
}

function moveRatioColorToContrastPoint(
  bgColor: Color,
  color: Color,
  ratio: number,
): Color {
  const distance = getDistanceToContrastPoint(bgColor, color);
  return moveColorToContrastPoint(bgColor, color, distance * ratio);
}

export function makeColors(c: [HsbColor, HsbColor]): ThemeColorStoreColors {
  const primary = Color(hsbToColorToString(c[0]));
  const bg = Color(hsbToColorToString(c[1]));
  const text = moveRatioColorToContrastPoint(bg, bg, 0.7);

  return {
    primary: primary.hex(),
    primaryLighter: moveColorToContrastPoint(primary, primary, -30).hex(),
    primaryDarker: moveColorToContrastPoint(primary, primary, 30).hex(),

    background: bg.hex(),
    backgroundLighter: moveColorToContrastPoint(bg, bg, 8).hex(),
    backgroundLightest: moveColorToContrastPoint(bg, bg, 16).hex(),
    backgroundDarker: moveColorToContrastPoint(bg, bg, -8).hex(),
    line: moveColorToContrastPoint(bg, bg, 25).hex(),

    text: text.hex(),
    textLighter: moveColorToContrastPoint(bg, text, 10).hex(),
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
