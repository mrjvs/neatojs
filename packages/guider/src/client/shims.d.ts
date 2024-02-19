declare module '@neato/guider/loader!?virtual' {
  export type GuiderThemeNavItem =
    | string
    | {
        title: string;
        to?: string;
        icon?: string;
        newTab?: boolean;
        items?: Record<string, GuiderThemeNavItem>;
      };

  export type GuiderThemeLayout = {
    id: string;
    sidebar: Record<string, GuiderThemeNavItem>;
  };

  export type GuiderThemeConfig = {
    defaultLayout: string;
    layout: GuiderThemeLayout[] | GuiderThemeLayout;
  };

  export const theme: GuiderThemeConfig;
}

type Conf = SiteConf | SiteConf[];

type LayoutSettings = {
  colours: any[];
  urls: any;
  sidebarConf?: SideBarConf;
  sidebarEnabled?: boolean;
  topNavEnabled?: boolean;
  footerEnabled?: boolean;
};

type SiteConf = {
  navItems?: Record<string, GuiderThemeNavItem>;
  layout?: string;
  layoutSettings?: PartialDeep<LayoutSettings>;

  directories: {
    title: string;
    sidebarItems: Record<string, GuiderThemeNavItem>;
    layout?: string;
    layoutSetings?: PartialDeep<LayoutSettings>;
  }[];

  layouts?: {
    id: string;
    settings?: PartialDeep<LayoutSettings>;
  }[];
};

type MetaConf = {
  site?: string;
  directory?: string;
  layout?: string;
};

const _a: Conf = {
  directories: [
    {
      sidebarItems: {
        '/a': 'Page A',
        '/b': 'Page B',
      },
    },
  ],
};
