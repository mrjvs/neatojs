import { createContext } from 'react';
import type { MetaConf } from '../types';

export const GuiderLayoutContext = createContext<MetaConf | undefined>(
  undefined,
);
