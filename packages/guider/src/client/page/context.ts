import { createContext } from 'react';
import type { MetaConf } from '../types';

export type MdxHeadings = {
  depth: number;
  value: string;
  data: {
    id: string;
  };
};

export const GuiderLayoutContext = createContext<
  | {
      meta: MetaConf;
      headings: MdxHeadings[];
    }
  | undefined
>(undefined);
