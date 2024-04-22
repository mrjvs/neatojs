import type { ReactNode } from 'react';

export type BackgroundPatterns = 'flare';
export type ToggleSetting = false | true;
export type Partial = () => ReactNode;
export type ToggleablePartial = ToggleSetting | Partial;

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
    backgroundDarker: string;
    line: string;

    codeWarning: string;
    codeError: string;
    codeGreen: string;
    codeHighlight: string;
    codeWordHighlight: string;

    semanticTip: string;
    semanticTipLighter: string;
    semanticNote: string;
    semanticNoteLighter: string;
    semanticImportant: string;
    semanticImportantLighter: string;
    semanticWarning: string;
    semanticWarningLighter: string;
    semanticCaution: string;
    semanticCautionLighter: string;
  };
  toc: ToggleablePartial;
  sidebar: ToggleablePartial;
  navigation: ToggleablePartial;
  contentFooter: ToggleablePartial;
  pageFooter: ToggleablePartial;
  pageEnd: ToggleablePartial;
  logo: ToggleablePartial;
  pageLayout?: Partial;
  backgroundPattern: ToggleSetting | BackgroundPatterns;
};

export type PopulatedLayoutSettings = {
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
    backgroundDarker: string;
    line: string;

    codeWarning: string;
    codeError: string;
    codeGreen: string;
    codeHighlight: string;
    codeWordHighlight: string;

    semanticTip: string;
    semanticTipLighter: string;
    semanticNote: string;
    semanticNoteLighter: string;
    semanticImportant: string;
    semanticImportantLighter: string;
    semanticWarning: string;
    semanticWarningLighter: string;
    semanticCaution: string;
    semanticCautionLighter: string;
  };
  backgroundPatternState: ToggleSetting;
  tocState: ToggleSetting;
  sidebarState: ToggleSetting;
  navigationState: ToggleSetting;
  contentFooterState: ToggleSetting;
  pageFooterState: ToggleSetting;
  pageEndState: ToggleSetting;
  logoState: ToggleSetting;

  pageLayoutComponent?: Partial;
  backgroundPatternSetting?: BackgroundPatterns;
  tocComponent?: Partial;
  sidebarComponent?: Partial;
  navigationComponent?: Partial;
  contentFooterComponent?: Partial;
  pageFooterComponent?: Partial;
  logoComponent?: Partial;
  pageEndComponent?: Partial;
};
