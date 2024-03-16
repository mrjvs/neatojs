import path from 'node:path';

export function themeFileResolver(themePath: string) {
  const url = path.resolve(themePath);
  return url;
}
