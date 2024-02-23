import type { DirectoryBuilder } from './types';

export const directory: DirectoryBuilder = function (ops) {
  return {
    layoutSettings: {},
    layout: 'default',
    ...ops,
  };
};
