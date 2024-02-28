declare module '@neato/guider' {
  type CollectorItem = {
    sitePath: string;
    fileContents: Record<string, any>;
    config: Record<string, any>;
  };

  type VirtualCache = {
    items: CollectorItem[];
    themeFile: string;
  };

  export function getGuiderPluginCache(): VirtualCache;
}
