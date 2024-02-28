import type {
  GroupBuilder,
  GroupComponentChildren,
  GroupOptions,
} from './types';

export const group: GroupBuilder = (titleOrOptions: any, maybeItems?: any) => {
  if (typeof titleOrOptions !== 'string') {
    const options: GroupOptions = titleOrOptions;
    return {
      ...options,
      type: 'group',
    };
  }

  const items: GroupComponentChildren[] = maybeItems;
  return {
    title: titleOrOptions,
    type: 'group',
    items,
  };
};
