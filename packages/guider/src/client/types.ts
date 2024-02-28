import type {
  DirectoryComponent,
  DropdownChildren,
  TabsChildren,
  TopNavChildren,
} from './theme/components';

export type GuiderConfig = SiteConf | SiteConf[];

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

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
  toc: boolean;
  sidebar: boolean;
};

export type SiteLayout = {
  id: string;
  settings?: DeepPartial<LayoutSettings>;
};

export type SiteConf = {
  id: string;
  navigation?: TopNavChildren[];
  tabs?: TabsChildren[];
  dropdown?: DropdownChildren[];
  github?: string;
  layout?: string;
  layoutSettings?: DeepPartial<LayoutSettings>;
  directories: DirectoryComponent[];
  layouts?: SiteLayout[];
};

export type MetaConf = {
  site?: string;
  directory?: string;
  layout?: string;
};

export type PopulatedSiteLayout = {
  id: string;
  settings: LayoutSettings;
};

export type PopulatedSiteConf = {
  id: string;
  navigation: TopNavChildren[];
  tabs: TabsChildren[];
  dropdown: DropdownChildren[];
  github?: string;
  layout: string;
  layoutSettings: LayoutSettings;
  directories: DirectoryComponent[];
  layouts: PopulatedSiteLayout[];
};

export type PageMapItem = {
  sitePath: string;
  fileContents: Record<string, any>;
  config: MetaConf;
};
