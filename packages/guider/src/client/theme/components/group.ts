import type { GroupBuilder } from './types';

export const group: GroupBuilder = (titleOrOptions, items) => {
  if (typeof titleOrOptions !== 'string') {
    return {
      ...titleOrOptions,
      type: 'group',
    };
  }
  return {
    title: titleOrOptions,
    type: 'group',
    items,
  };
};
