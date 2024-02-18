declare module '@neato/guider' {
  type VirtualCache = {
    items: string[];
    themeFile: string;
  };

  export function getGuiderPluginCache(): VirtualCache;
}
