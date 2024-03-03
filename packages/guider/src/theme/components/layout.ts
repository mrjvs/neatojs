import { defu } from 'defu';
import type { DeepPartial, LayoutSettings } from './settings';

export type SiteLayoutOptions = {
  id: string;
  settings?: DeepPartial<LayoutSettings>;
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
  backgroundPattern: undefined,
};

export function mergeLayoutSettings(
  root: LayoutSettings,
  target: DeepPartial<LayoutSettings>,
): LayoutSettings {
  return defu(root, target);
}

export function mergeWithRoot(
  settings: DeepPartial<LayoutSettings>,
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
