import { createContext } from 'react';
import type { PageMeta } from './types';

export type MdxHeadings = {
  depth: number;
  value: string;
  data: {
    id: string;
  };
};

export const GuiderLayoutContext = createContext<
  | {
      meta: PageMeta;
      headings: MdxHeadings[];
      excerpt?: string;
    }
  | undefined
>(undefined);
