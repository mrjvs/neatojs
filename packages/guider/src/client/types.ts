export type GuiderConfig = SiteConf | SiteConf[];

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type NavItemDescriptor = {
  title: string;
  to: string;
  items: NavItemDescriptor[];
  newTab: boolean;
  icon?: string;
};

export type NavItem =
  | string
  | {
      title: string;
      to?: string;
      icon?: string;
      newTab?: boolean;
      items?: Record<string, NavItem>;
    };

export type LayoutSettings = {
  colors: {
    primary: string;
  };
};

export type SiteLayout = {
  id: string;
  settings?: DeepPartial<LayoutSettings>;
};

export type SiteDirectory = {
  id: string;
  title: string;
  sidebarItems: Record<string, NavItem>;
  layout?: string;
  layoutSetings?: DeepPartial<LayoutSettings>;
};

export type SiteConf = {
  id: string;
  navItems?: Record<string, NavItem>;
  layout?: string;
  layoutSettings?: DeepPartial<LayoutSettings>;
  directories: SiteDirectory[];
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

export type PopulatedSiteDirectory = {
  id: string;
  title: string;
  sidebarItems: NavItemDescriptor[];
  layout: string;
  layoutSetings: DeepPartial<LayoutSettings>;
};

export type PopulatedSiteConf = {
  id: string;
  navItems: NavItemDescriptor[];
  layout: string;
  layoutSettings: LayoutSettings;
  directories: PopulatedSiteDirectory[];
  layouts: PopulatedSiteLayout[];
};

export type PageMapItem = {
  sitePath: string;
  fileContents: Record<string, any>;
  config: MetaConf;
};
