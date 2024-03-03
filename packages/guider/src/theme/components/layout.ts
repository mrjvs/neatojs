import type { PartialDeep } from 'type-fest';
import type { LayoutSettings } from './settings';

export type SiteLayoutOptions = {
  id: string;
  settings?: PartialDeep<LayoutSettings>;
};

export type SiteLayoutComponent = {
  id: string;
  settings: LayoutSettings;
};

const baseLayoutConfig: LayoutSettings = {
  colors: {
    primary: '#50A0EA',
    primaryDarker: '#1B65A9',
    primaryLighter: '#89C6FF',
    text: '#4A7181',
    textLighter: '#789CAB',
    textHighlight: '#FFFFFF',
    background: '#050F13',
    backgroundLighter: '#07171C',
    backgroundLightest: '#081E24',
  },
  sidebar: true,
  toc: true,
  contentFooter: true,
  pageFooter: true,
  navigation: true,
  backgroundPattern: false,
};

export function mergeLayoutSettings(
  root: LayoutSettings,
  target: PartialDeep<LayoutSettings>,
): LayoutSettings {
  return {
    ...root,
    ...target,
    colors: {
      ...root.colors,
      ...target.colors,
    },
    backgroundPattern: target.backgroundPattern ?? root.backgroundPattern,
    contentFooter: target.contentFooter ?? root.contentFooter,
    navigation: target.navigation ?? root.navigation,
    sidebar: target.sidebar ?? root.sidebar,
    pageFooter: target.pageFooter ?? root.pageFooter,
    toc: target.toc ?? root.toc,
  };
}

export function mergeWithRoot(
  settings: PartialDeep<LayoutSettings>,
): LayoutSettings {
  return mergeLayoutSettings(baseLayoutConfig, settings);
}

export function populateLayout(
  rootSettings: LayoutSettings,
  layout: SiteLayoutOptions,
): SiteLayoutComponent {
  return {
    id: layout.id,
    settings: mergeLayoutSettings(rootSettings, layout.settings ?? {}),
  };
}
