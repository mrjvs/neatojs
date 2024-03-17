import {
  sites as untypedSites,
  metaMap as untypedMetaMap,
  pageMap as untypedPageMap,
} from '@neato/guider/shim.guider.virtual.js';
import type { PageMapItem, SiteComponent, MetaMapItem } from '../theme';

export const sites = untypedSites as SiteComponent[];
export const metaMap = untypedMetaMap as MetaMapItem[];
export const pageMap = untypedPageMap as PageMapItem[];
