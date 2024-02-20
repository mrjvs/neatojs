import {
  sites as untypedSites,
  pageMap as untypedPageMap,
} from '@neato/guider/loader!?virtual';
import type { PageMapItem, PopulatedSiteConf } from './types';

export const sites = untypedSites as PopulatedSiteConf[];
export const pageMap = untypedPageMap as PageMapItem[];
