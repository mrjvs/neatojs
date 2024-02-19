declare module '@neato/guider/loader!?virtual' {
  export type GuiderThemeNavItem =
    | string
    | {
        title: string;
        to?: string;
        icon?: string;
        newTab?: boolean;
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
