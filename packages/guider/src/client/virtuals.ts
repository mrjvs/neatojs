import {
  sites as untypedSites,
  pageMap as untypedPageMap,
} from '@neato/guider/shim.guider.virtual';
import type { PageMapItem, SiteComponent } from '../theme';

export const sites = untypedSites as SiteComponent[];
export const pageMap = untypedPageMap as PageMapItem[];
