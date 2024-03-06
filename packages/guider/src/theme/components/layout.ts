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
};

const baseLayoutConfig: PopulatedLayoutSettings = {
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
  sidebarState: true,
  tocState: true,
  contentFooterState: true,
  pageFooterState: true,
  navigationState: true,
  backgroundPatternState: false,
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

    pageLayoutComponent: val.pageLayout,
    backgroundPatternSetting: extractSetting(val.backgroundPattern),
    tocComponent: extractSetting(val.toc),
    sidebarComponent: extractSetting(val.sidebar),
    navigationComponent: extractSetting(val.navigation),
    contentFooterComponent: extractSetting(val.contentFooter),
    pageFooterComponent: extractSetting(val.pageFooter),
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

    pageLayoutComponent: target.pageLayoutComponent ?? root.pageLayoutComponent,
    backgroundPatternSetting:
      target.backgroundPatternSetting ?? root.backgroundPatternSetting,
    tocComponent: target.tocComponent ?? root.tocComponent,
    sidebarComponent: target.sidebarComponent ?? root.sidebarComponent,
    navigationComponent: target.navigationComponent ?? root.navigationComponent,
    contentFooterComponent:
      target.contentFooterComponent ?? root.contentFooterComponent,
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
  return {
    id: layout.id,
    settings: mergeLayoutSettings(
      rootSettings,
      makeLayoutSettings(layout.settings ?? {}),
    ),
  };
}
