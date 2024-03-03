import type { SiteComponent } from './components/site';
import type { GuiderConfig } from './types';

export function defineTheme(obj: GuiderConfig): SiteComponent[] {
  let sites = obj;
  if (!Array.isArray(sites)) sites = [sites];

  if (sites.length === 0) throw new Error('Site list may not be empty');
  sites.forEach((site) => {
    if (site.directories.length === 0)
      throw new Error('Site may not have an empty directory list');
  });

  return sites;
}
