import type { ReactNode } from 'react';

export type BackgroundPatterns = 'flare' | 'grid' | 'sparkles';
export type ToggleSetting = false | true;
export type ToggleablePartial = ToggleSetting | (() => ReactNode);

export type LayoutSettings = {
  colors: {
    primary: string;
    primaryLighter: string;
    primaryDarker: string;
    background: string;
    backgroundLighter: string;
    backgroundLightest: string;
    text: string;
    textLighter: string;
    textHighlight: string;
  };
  toc: ToggleablePartial;
  sidebar: ToggleablePartial;
  navigation: ToggleablePartial;
  contentFooter: ToggleablePartial;
  pageFooter: ToggleablePartial;
  backgroundPattern: ToggleSetting | BackgroundPatterns;
};
