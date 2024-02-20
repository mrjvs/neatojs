import { sites as untypedSites } from '@neato/guider/loader!?virtual';
import type { PopulatedSiteConf } from './types';

export const sites = untypedSites as PopulatedSiteConf[];
