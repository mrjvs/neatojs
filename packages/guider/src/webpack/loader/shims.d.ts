declare module '@neato/guider' {
  type CollectorItem = {
    sitePath: string;
    fileContents: Record<string, any>;
    config: Record<string, any>;
  };

  type PageMapItem = {
    sitePath: string;
    filePath: string;
  };

  type VirtualCache = {
    items: CollectorItem[];
    themeFile: string;
    pageMap: PageMapItem[];
  };

  export function getGuiderPluginCache(): VirtualCache;
}
