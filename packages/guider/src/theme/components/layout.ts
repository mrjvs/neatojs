import type { PartialDeep } from 'type-fest';
import type {
  LayoutSettings,
  PopulatedLayoutSettings,
  ToggleSetting,
} from './settings';

export type SiteLayoutOptions = {
  id: string;
  settings?: PartialDeep<LayoutSettings>;
};

export type SiteLayoutComponent = {
  id: string;
  settings: PopulatedLayoutSettings;
  settingsOverrides: PartialDeep<PopulatedLayoutSettings>;
};

const baseLayoutConfig: PopulatedLayoutSettings = {
  colors: {
    primary: '#50A0EA',
    primaryDarker: '#1B65A9',
    primaryLighter: '#89C6FF',
    text: '#668896',
    textLighter: '#9AB3BD',
    textHighlight: '#FFFFFF',
    background: '#050F13',
    backgroundLighter: '#07171C',
    backgroundLightest: '#081E24',
    backgroundDarker: '#040C0F',
    line: '#0F2B33',

    codeWarning: '#222D20',
    codeError: '#2B1B1F',
    codeGreen: '#0B2823',
    codeHighlight: '#0E2429',
    codeWordHighlight: '#365C68',

    semanticTip: '#39B864',
    semanticTipLighter: '#75F2B6',
    semanticNote: '#817EF3',
    semanticNoteLighter: '#B9B8FC',
    semanticImportant: '#A958E8',
    semanticImportantLighter: '#D3A2F9',
    semanticWarning: '#C0BC43',
    semanticWarningLighter: '#ECE873',
    semanticCaution: '#FC6359',
    semanticCautionLighter: '#FFA59F',
  },
  sidebarState: true,
  tocState: true,
  contentFooterState: true,
  pageFooterState: false,
  navigationState: true,
  backgroundPatternState: false,
  logoState: true,
  pageEndState: true,
};

function extractState<T>(
  val: T | ToggleSetting | undefined,
): ToggleSetting | undefined {
  if (typeof val === 'boolean') return val;
  if (val === undefined) return undefined;
  return true;
}

function extractSetting<T>(val: T | ToggleSetting | undefined): T | undefined {
  if (typeof val === 'boolean') return undefined;
  if (val === undefined) return undefined;
  return val;
}

export function makeLayoutSettings(
  val: PartialDeep<LayoutSettings>,
): PartialDeep<PopulatedLayoutSettings> {
  return {
    colors: val.colors,

    backgroundPatternState: extractState(val.backgroundPattern),
    tocState: extractState(val.toc),
    sidebarState: extractState(val.sidebar),
    navigationState: extractState(val.navigation),
    contentFooterState: extractState(val.contentFooter),
    pageFooterState: extractState(val.pageFooter),
    logoState: extractState(val.logo),

    pageLayoutComponent: val.pageLayout,
    backgroundPatternSetting: extractSetting(val.backgroundPattern),
    tocComponent: extractSetting(val.toc),
    sidebarComponent: extractSetting(val.sidebar),
    navigationComponent: extractSetting(val.navigation),
    contentFooterComponent: extractSetting(val.contentFooter),
    pageFooterComponent: extractSetting(val.pageFooter),
    logoComponent: extractSetting(val.logo),
  };
}

export function mergeLayoutSettings(
  root: PopulatedLayoutSettings,
  target: PartialDeep<PopulatedLayoutSettings>,
): PopulatedLayoutSettings {
  return {
    ...root,
    ...target,
    colors: {
      ...root.colors,
      ...target.colors,
    },

    tocState: target.tocState ?? root.tocState,
    sidebarState: target.sidebarState ?? root.sidebarState,
    navigationState: target.navigationState ?? root.navigationState,
    contentFooterState: target.contentFooterState ?? root.contentFooterState,
    pageFooterState: target.pageFooterState ?? root.pageFooterState,
    logoState: target.logoState ?? root.logoState,
    backgroundPatternState:
      target.backgroundPatternState ?? root.backgroundPatternState,

    pageLayoutComponent: target.pageLayoutComponent ?? root.pageLayoutComponent,
    backgroundPatternSetting:
      target.backgroundPatternSetting ?? root.backgroundPatternSetting,
    tocComponent: target.tocComponent ?? root.tocComponent,
    sidebarComponent: target.sidebarComponent ?? root.sidebarComponent,
    navigationComponent: target.navigationComponent ?? root.navigationComponent,
    contentFooterComponent:
      target.contentFooterComponent ?? root.contentFooterComponent,
    logoComponent: target.logoComponent ?? root.logoComponent,
  };
}

export function mergeWithRoot(
  settings: PartialDeep<PopulatedLayoutSettings>,
): PopulatedLayoutSettings {
  return mergeLayoutSettings(baseLayoutConfig, settings);
}

export function populateLayout(
  rootSettings: PopulatedLayoutSettings,
  layout: SiteLayoutOptions,
): SiteLayoutComponent {
  const layoutSettings = makeLayoutSettings(layout.settings ?? {});
  return {
    id: layout.id,
    settings: mergeLayoutSettings(rootSettings, layoutSettings),
    settingsOverrides: layoutSettings,
  };
}
