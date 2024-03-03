import type { ReactNode } from 'react';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]> | undefined;
    }
  : T;

export type BackgroundPatterns = 'flare' | 'grid' | 'sparkles';
export type ToggleSetting = false | true | null;
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
  toc?: ToggleablePartial;
  sidebar?: ToggleablePartial;
  navigation?: ToggleablePartial;
  contentFooter?: ToggleablePartial;
  pageFooter?: ToggleablePartial;
  backgroundPattern?: ToggleSetting | BackgroundPatterns;
};
