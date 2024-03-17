import { site, type SiteComponent } from './components/site';
import type { GuiderConfig } from './types';

export { type SiteComponent } from './components/site';

export function defineTheme(obj: GuiderConfig): SiteComponent[] {
  let sites: SiteComponent[] = [];
  if (!Array.isArray(obj)) sites = [site('main', obj)];
  else sites = obj;

  if (sites.length === 0) throw new Error('Site list may not be empty');
  sites.forEach((siteItem) => {
    if (siteItem.directories.length === 0)
      throw new Error('Site may not have an empty directory list');
  });

  return sites;
}
